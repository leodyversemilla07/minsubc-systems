import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkUpdateStatus
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:15
 * @route '/admin/bulk/update-status'
 */
export const bulkUpdateStatus = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpdateStatus.url(options),
    method: 'post',
})

bulkUpdateStatus.definition = {
    methods: ["post"],
    url: '/admin/bulk/update-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkUpdateStatus
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:15
 * @route '/admin/bulk/update-status'
 */
bulkUpdateStatus.url = (options?: RouteQueryOptions) => {
    return bulkUpdateStatus.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkUpdateStatus
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:15
 * @route '/admin/bulk/update-status'
 */
bulkUpdateStatus.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpdateStatus.url(options),
    method: 'post',
})

    /**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkUpdateStatus
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:15
 * @route '/admin/bulk/update-status'
 */
    const bulkUpdateStatusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkUpdateStatus.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkUpdateStatus
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:15
 * @route '/admin/bulk/update-status'
 */
        bulkUpdateStatusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkUpdateStatus.url(options),
            method: 'post',
        })
    
    bulkUpdateStatus.form = bulkUpdateStatusForm
/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkAssign
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:34
 * @route '/admin/bulk/assign'
 */
export const bulkAssign = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkAssign.url(options),
    method: 'post',
})

bulkAssign.definition = {
    methods: ["post"],
    url: '/admin/bulk/assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkAssign
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:34
 * @route '/admin/bulk/assign'
 */
bulkAssign.url = (options?: RouteQueryOptions) => {
    return bulkAssign.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkAssign
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:34
 * @route '/admin/bulk/assign'
 */
bulkAssign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkAssign.url(options),
    method: 'post',
})

    /**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkAssign
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:34
 * @route '/admin/bulk/assign'
 */
    const bulkAssignForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkAssign.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkAssign
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:34
 * @route '/admin/bulk/assign'
 */
        bulkAssignForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkAssign.url(options),
            method: 'post',
        })
    
    bulkAssign.form = bulkAssignForm
/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkRelease
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:53
 * @route '/admin/bulk/release'
 */
export const bulkRelease = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkRelease.url(options),
    method: 'post',
})

bulkRelease.definition = {
    methods: ["post"],
    url: '/admin/bulk/release',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkRelease
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:53
 * @route '/admin/bulk/release'
 */
bulkRelease.url = (options?: RouteQueryOptions) => {
    return bulkRelease.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkRelease
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:53
 * @route '/admin/bulk/release'
 */
bulkRelease.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkRelease.url(options),
    method: 'post',
})

    /**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkRelease
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:53
 * @route '/admin/bulk/release'
 */
    const bulkReleaseForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkRelease.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkRelease
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:53
 * @route '/admin/bulk/release'
 */
        bulkReleaseForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkRelease.url(options),
            method: 'post',
        })
    
    bulkRelease.form = bulkReleaseForm
/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkReject
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:78
 * @route '/admin/bulk/reject'
 */
export const bulkReject = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkReject.url(options),
    method: 'post',
})

bulkReject.definition = {
    methods: ["post"],
    url: '/admin/bulk/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkReject
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:78
 * @route '/admin/bulk/reject'
 */
bulkReject.url = (options?: RouteQueryOptions) => {
    return bulkReject.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkReject
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:78
 * @route '/admin/bulk/reject'
 */
bulkReject.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkReject.url(options),
    method: 'post',
})

    /**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkReject
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:78
 * @route '/admin/bulk/reject'
 */
    const bulkRejectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkReject.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkReject
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:78
 * @route '/admin/bulk/reject'
 */
        bulkRejectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkReject.url(options),
            method: 'post',
        })
    
    bulkReject.form = bulkRejectForm
/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkDelete
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:98
 * @route '/admin/bulk/delete'
 */
export const bulkDelete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDelete.url(options),
    method: 'delete',
})

bulkDelete.definition = {
    methods: ["delete"],
    url: '/admin/bulk/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkDelete
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:98
 * @route '/admin/bulk/delete'
 */
bulkDelete.url = (options?: RouteQueryOptions) => {
    return bulkDelete.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkDelete
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:98
 * @route '/admin/bulk/delete'
 */
bulkDelete.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDelete.url(options),
    method: 'delete',
})

    /**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkDelete
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:98
 * @route '/admin/bulk/delete'
 */
    const bulkDeleteForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkDelete.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::bulkDelete
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:98
 * @route '/admin/bulk/delete'
 */
        bulkDeleteForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkDelete.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    bulkDelete.form = bulkDeleteForm
const BulkOperationsController = { bulkUpdateStatus, bulkAssign, bulkRelease, bulkReject, bulkDelete }

export default BulkOperationsController