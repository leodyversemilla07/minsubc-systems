<?php

namespace App\Modules\USG\Services;

use App\Models\Modules\USG\Models\VMGO;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class VMGOService
{
    /**
     * Get the current active VMGO
     */
    public function getCurrent(): ?VMGO
    {
        return VMGO::where('effective_date', '<=', now())
            ->latest('effective_date')
            ->first();
    }

    /**
     * Update or create VMGO content
     */
    public function updateOrCreate(array $data, int $updatedBy): VMGO
    {
        $current = $this->getCurrent();

        // If updating the same effective date, update existing record
        if (
            $current && isset($data['effective_date']) &&
            Carbon::parse($data['effective_date'])->isSameDay($current->effective_date)
        ) {
            return $this->update($current, $data, $updatedBy);
        }

        // Otherwise create new version
        return $this->create($data, $updatedBy);
    }

    /**
     * Create new VMGO version
     */
    public function create(array $data, int $updatedBy): VMGO
    {
        return VMGO::create([
            'vision' => $data['vision'],
            'mission' => $data['mission'],
            'goals' => $data['goals'],
            'objectives' => $data['objectives'],
            'effective_date' => $data['effective_date'] ?? now(),
            'updated_by' => $updatedBy,
        ]);
    }

    /**
     * Update existing VMGO
     */
    public function update(VMGO $vmgo, array $data, int $updatedBy): VMGO
    {
        $vmgo->update([
            'vision' => $data['vision'] ?? $vmgo->vision,
            'mission' => $data['mission'] ?? $vmgo->mission,
            'goals' => $data['goals'] ?? $vmgo->goals,
            'objectives' => $data['objectives'] ?? $vmgo->objectives,
            'effective_date' => $data['effective_date'] ?? $vmgo->effective_date,
            'updated_by' => $updatedBy,
        ]);

        return $vmgo->fresh();
    }

    /**
     * Get VMGO history with pagination
     */
    public function getHistory(int $perPage = 10): \Illuminate\Pagination\LengthAwarePaginator
    {
        return VMGO::with('updatedBy')
            ->orderBy('effective_date', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get all VMGO versions
     */
    public function getAllVersions(): Collection
    {
        return VMGO::with('updatedBy')
            ->orderBy('effective_date', 'desc')
            ->get();
    }

    /**
     * Delete VMGO version
     */
    public function delete(VMGO $vmgo): bool
    {
        // Don't allow deletion of current active VMGO
        if ($this->getCurrent()?->id === $vmgo->id) {
            throw new \Exception('Cannot delete the current active VMGO');
        }

        return $vmgo->delete();
    }

    /**
     * Check if VMGO content is complete
     */
    public function isComplete(array $data): bool
    {
        $required = ['vision', 'mission', 'goals', 'objectives'];

        foreach ($required as $field) {
            if (empty($data[$field])) {
                return false;
            }
        }

        return true;
    }
}
