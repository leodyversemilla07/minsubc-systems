<?php

namespace Modules\USG\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\USG\Models\Officer;

class OfficerService
{
    public function __construct(
        private FileUploadService $fileUploadService
    ) {}

    /**
     * Get all active officers ordered by position order
     */
    public function getActiveOfficers(): Collection
    {
        return Officer::active()
            ->with('user')
            ->orderBy('order')
            ->orderBy('position')
            ->get();
    }

    /**
     * Get officers with pagination for admin
     */
    public function getPaginatedOfficers(int $perPage = 15): LengthAwarePaginator
    {
        return Officer::with('user')
            ->orderBy('is_active', 'desc')
            ->orderBy('order')
            ->orderBy('position')
            ->paginate($perPage);
    }

    /**
     * Get officers grouped by department
     */
    public function getOfficersByDepartment(): array
    {
        return Officer::active()
            ->with('user')
            ->orderBy('order')
            ->get()
            ->groupBy('department')
            ->toArray();
    }

    /**
     * Create new officer
     */
    public function create(array $data): Officer
    {
        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            $fileData = $this->fileUploadService->uploadImage($data['photo'], 'usg/officers');
            $data['photo'] = $fileData['path'];
        }

        // Set default order if not provided
        if (! isset($data['order'])) {
            $data['order'] = $this->getNextOrder();
        }

        return Officer::create($data);
    }

    /**
     * Update existing officer
     */
    public function update(Officer $officer, array $data): Officer
    {
        if (isset($data['photo']) && $data['photo'] instanceof UploadedFile) {
            // Delete old photo if exists
            if ($officer->photo) {
                $this->fileUploadService->deleteFile($officer->photo);
            }
            $fileData = $this->fileUploadService->uploadImage($data['photo'], 'usg/officers');
            $data['photo'] = $fileData['path'];
        }

        $officer->update($data);

        return $officer;
    }

    /**
     * Delete officer and associated photo
     */
    public function delete(Officer $officer): bool
    {
        if ($officer->photo) {
            $this->fileUploadService->deleteFile($officer->photo);
        }

        return $officer->delete();
    }

    /**
     * Reorder officers
     */
    public function reorderOfficers(array $orderData): void
    {
        foreach ($orderData as $item) {
            if (isset($item['id']) && isset($item['order'])) {
                Officer::where('id', $item['id'])
                    ->update(['order' => $item['order']]);
            }
        }
    }

    /**
     * Toggle officer active status
     */
    public function toggleActive(Officer $officer): Officer
    {
        $officer->update(['is_active' => ! $officer->is_active]);

        return $officer;
    }

    /**
     * Get officers by term
     */
    public function getOfficersByTerm(string $termStart, string $termEnd): Collection
    {
        return Officer::whereBetween('term_start', [$termStart, $termEnd])
            ->orWhereBetween('term_end', [$termStart, $termEnd])
            ->with('user')
            ->orderBy('order')
            ->get();
    }

    /**
     * Get current term officers
     */
    public function getCurrentTermOfficers(): Collection
    {
        $today = now();

        return Officer::where('term_start', '<=', $today)
            ->where('term_end', '>=', $today)
            ->active()
            ->with('user')
            ->orderBy('order')
            ->get();
    }

    /**
     * Get next order number
     */
    private function getNextOrder(): int
    {
        $maxOrder = Officer::max('order');

        return ($maxOrder ?? 0) + 1;
    }

    /**
     * Search officers
     */
    public function searchOfficers(string $query): Collection
    {
        return Officer::where(function ($q) use ($query) {
            $q->where('name', 'like', "%{$query}%")
                ->orWhere('position', 'like', "%{$query}%")
                ->orWhere('department', 'like', "%{$query}%")
                ->orWhere('email', 'like', "%{$query}%");
        })
            ->with('user')
            ->orderBy('order')
            ->get();
    }

    /**
     * Get unique departments
     */
    public function getDepartments(): array
    {
        return Officer::distinct('department')
            ->whereNotNull('department')
            ->pluck('department')
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Get unique positions
     */
    public function getPositions(): array
    {
        return Officer::distinct('position')
            ->whereNotNull('position')
            ->pluck('position')
            ->sort()
            ->values()
            ->toArray();
    }

    /**
     * Get officer by ID
     */
    public function getById(int $id): ?Officer
    {
        return Officer::with('user')->find($id);
    }

    /**
     * Reorder officers (alias for reorderOfficers)
     */
    public function reorder(array $orderData): void
    {
        $this->reorderOfficers($orderData);
    }
}
