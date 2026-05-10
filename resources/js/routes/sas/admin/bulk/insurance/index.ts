import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:56
 * @route '/sas/admin/bulk/insurance/approve'
 */
export const approve = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/sas/admin/bulk/insurance/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:56
 * @route '/sas/admin/bulk/insurance/approve'
 */
approve.url = (options?: RouteQueryOptions) => {
    return approve.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:56
 * @route '/sas/admin/bulk/insurance/approve'
 */
approve.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:75
 * @route '/sas/admin/bulk/insurance/reject'
 */
export const reject = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/sas/admin/bulk/insurance/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:75
 * @route '/sas/admin/bulk/insurance/reject'
 */
reject.url = (options?: RouteQueryOptions) => {
    return reject.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:75
 * @route '/sas/admin/bulk/insurance/reject'
 */
reject.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::deleteMethod
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:109
 * @route '/sas/admin/bulk/insurance/delete'
 */
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/sas/admin/bulk/insurance/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::deleteMethod
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:109
 * @route '/sas/admin/bulk/insurance/delete'
 */
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::deleteMethod
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:109
 * @route '/sas/admin/bulk/insurance/delete'
 */
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})
const insurance = {
    approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
delete: Object.assign(deleteMethod, deleteMethod),
}

export default insurance