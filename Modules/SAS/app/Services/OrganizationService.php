<?php

namespace Modules\SAS\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Modules\SAS\Models\Organization;
use Modules\SAS\Models\OrganizationOfficer;

class OrganizationService
{
    /**
     * Get all organizations with optional filters and pagination.
     */
    public function getOrganizations(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Organization::with(['adviser'])
            ->withCount(['officers', 'members', 'activities']);

        if (isset($filters['organization_type'])) {
            $query->where('organization_type', $filters['organization_type']);
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        if (isset($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('organization_name', 'like', "%{$filters['search']}%")
                    ->orWhere('organization_code', 'like', "%{$filters['search']}%")
                    ->orWhere('category', 'like', "%{$filters['search']}%");
            });
        }

        return $query->orderBy('organization_name')->paginate($perPage);
    }

    /**
     * Get a single organization by ID.
     */
    public function getOrganizationById(int $id): Organization
    {
        return Organization::with(['adviser', 'currentOfficers.student', 'allOfficers'])->findOrFail($id);
    }

    /**
     * Create a new organization with optional logo upload.
     */
    public function createOrganization(array $data): Organization
    {
        if (isset($data['logo'])) {
            $data['logo_path'] = $data['logo']->store('organizations/logos', 'public');
        }

        return Organization::create($data);
    }

    /**
     * Update an existing organization.
     */
    public function updateOrganization(Organization $organization, array $data): Organization
    {
        if (isset($data['logo'])) {
            // Delete old logo if exists
            if ($organization->logo_path) {
                Storage::disk('public')->delete($organization->logo_path);
            }

            $data['logo_path'] = $data['logo']->store('organizations/logos', 'public');
        }

        $organization->update($data);

        return $organization->fresh();
    }

    /**
     * Delete an organization and its associated files.
     */
    public function deleteOrganization(Organization $organization): bool
    {
        if ($organization->logo_path) {
            Storage::disk('public')->delete($organization->logo_path);
        }

        return $organization->delete();
    }

    /**
     * Get all officers for a specific organization.
     */
    public function getOrganizationOfficers(int $organizationId, bool $currentOnly = false): Collection
    {
        $query = OrganizationOfficer::where('organization_id', $organizationId)
            ->with(['student', 'organization']);

        if ($currentOnly) {
            $query->where('is_current', true);
        }

        return $query->orderByRaw("FIELD(position, 'President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor')")
            ->orderBy('term_start', 'desc')
            ->get();
    }

    /**
     * Create an organization officer record.
     */
    public function createOfficer(array $data): OrganizationOfficer
    {
        if (isset($data['photo'])) {
            $data['photo_path'] = $data['photo']->store('organizations/officers', 'public');
        }

        return OrganizationOfficer::create($data);
    }

    /**
     * Update an organization officer record.
     */
    public function updateOfficer(OrganizationOfficer $officer, array $data): OrganizationOfficer
    {
        if (isset($data['photo'])) {
            // Delete old photo if exists
            if ($officer->photo_path) {
                Storage::disk('public')->delete($officer->photo_path);
            }

            $data['photo_path'] = $data['photo']->store('organizations/officers', 'public');
        }

        $officer->update($data);

        return $officer->fresh();
    }

    /**
     * Delete an organization officer record.
     */
    public function deleteOfficer(OrganizationOfficer $officer): bool
    {
        if ($officer->photo_path) {
            Storage::disk('public')->delete($officer->photo_path);
        }

        return $officer->delete();
    }

    /**
     * Get organization statistics.
     */
    public function getOrganizationStatistics(): array
    {
        return [
            'total_organizations' => Organization::count(),
            'active_organizations' => Organization::where('status', 'Active')->count(),
            'major_organizations' => Organization::where('organization_type', 'Major')->count(),
            'minor_organizations' => Organization::where('organization_type', 'Minor')->count(),
            'total_officers' => OrganizationOfficer::count(),
            'current_officers' => OrganizationOfficer::where('is_current', true)->count(),
        ];
    }
}
