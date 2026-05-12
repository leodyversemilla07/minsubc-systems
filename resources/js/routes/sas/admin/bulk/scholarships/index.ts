import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:17
 * @route '/sas/admin/bulk/scholarships/approve'
 */
export const approve = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/sas/admin/bulk/scholarships/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:17
 * @route '/sas/admin/bulk/scholarships/approve'
 */
approve.url = (options?: RouteQueryOptions) => {
    return approve.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:17
 * @route '/sas/admin/bulk/scholarships/approve'
 */
approve.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:17
 * @route '/sas/admin/bulk/scholarships/approve'
 */
    const approveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:17
 * @route '/sas/admin/bulk/scholarships/approve'
 */
        approveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:36
 * @route '/sas/admin/bulk/scholarships/reject'
 */
export const reject = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/sas/admin/bulk/scholarships/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:36
 * @route '/sas/admin/bulk/scholarships/reject'
 */
reject.url = (options?: RouteQueryOptions) => {
    return reject.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:36
 * @route '/sas/admin/bulk/scholarships/reject'
 */
reject.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:36
 * @route '/sas/admin/bulk/scholarships/reject'
 */
    const rejectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:36
 * @route '/sas/admin/bulk/scholarships/reject'
 */
        rejectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(options),
            method: 'post',
        })
    
    reject.form = rejectForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::updateStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:125
 * @route '/sas/admin/bulk/scholarships/update-status'
 */
export const updateStatus = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(options),
    method: 'post',
})

updateStatus.definition = {
    methods: ["post"],
    url: '/sas/admin/bulk/scholarships/update-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::updateStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:125
 * @route '/sas/admin/bulk/scholarships/update-status'
 */
updateStatus.url = (options?: RouteQueryOptions) => {
    return updateStatus.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::updateStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:125
 * @route '/sas/admin/bulk/scholarships/update-status'
 */
updateStatus.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::updateStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:125
 * @route '/sas/admin/bulk/scholarships/update-status'
 */
    const updateStatusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::updateStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:125
 * @route '/sas/admin/bulk/scholarships/update-status'
 */
        updateStatusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(options),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::deleteMethod
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:93
 * @route '/sas/admin/bulk/scholarships/delete'
 */
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/sas/admin/bulk/scholarships/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::deleteMethod
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:93
 * @route '/sas/admin/bulk/scholarships/delete'
 */
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::deleteMethod
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:93
 * @route '/sas/admin/bulk/scholarships/delete'
 */
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::deleteMethod
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:93
 * @route '/sas/admin/bulk/scholarships/delete'
 */
    const deleteMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::deleteMethod
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:93
 * @route '/sas/admin/bulk/scholarships/delete'
 */
        deleteMethodForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
const scholarships = {
    approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
updateStatus: Object.assign(updateStatus, updateStatus),
delete: Object.assign(deleteMethod, deleteMethod),
}

export default scholarships