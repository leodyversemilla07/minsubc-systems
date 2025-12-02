import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

/**
 * Hook to check user permissions
 * @returns Object with permission checking functions
 */
export function usePermissions() {
    const { auth } = usePage<SharedData>().props;
    const permissions = auth.permissions || [];

    /**
     * Check if user has a specific permission
     */
    const can = (permission: string): boolean => {
        return permissions.includes(permission);
    };

    /**
     * Check if user has any of the specified permissions
     */
    const canAny = (permissionList: string[]): boolean => {
        return permissionList.some((permission) => permissions.includes(permission));
    };

    /**
     * Check if user has all of the specified permissions
     */
    const canAll = (permissionList: string[]): boolean => {
        return permissionList.every((permission) => permissions.includes(permission));
    };

    return {
        can,
        canAny,
        canAll,
        permissions,
    };
}
