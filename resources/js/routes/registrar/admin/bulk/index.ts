import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::updateStatus
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:15
 * @route '/admin/bulk/update-status'
 */
export const updateStatus = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(options),
    method: 'post',
})

updateStatus.definition = {
    methods: ["post"],
    url: '/admin/bulk/update-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::updateStatus
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:15
 * @route '/admin/bulk/update-status'
 */
updateStatus.url = (options?: RouteQueryOptions) => {
    return updateStatus.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::updateStatus
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:15
 * @route '/admin/bulk/update-status'
 */
updateStatus.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::assign
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:34
 * @route '/admin/bulk/assign'
 */
export const assign = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(options),
    method: 'post',
})

assign.definition = {
    methods: ["post"],
    url: '/admin/bulk/assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::assign
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:34
 * @route '/admin/bulk/assign'
 */
assign.url = (options?: RouteQueryOptions) => {
    return assign.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::assign
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:34
 * @route '/admin/bulk/assign'
 */
assign.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assign.url(options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::release
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:53
 * @route '/admin/bulk/release'
 */
export const release = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: release.url(options),
    method: 'post',
})

release.definition = {
    methods: ["post"],
    url: '/admin/bulk/release',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::release
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:53
 * @route '/admin/bulk/release'
 */
release.url = (options?: RouteQueryOptions) => {
    return release.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::release
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:53
 * @route '/admin/bulk/release'
 */
release.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: release.url(options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::reject
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:78
 * @route '/admin/bulk/reject'
 */
export const reject = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admin/bulk/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::reject
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:78
 * @route '/admin/bulk/reject'
 */
reject.url = (options?: RouteQueryOptions) => {
    return reject.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::reject
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:78
 * @route '/admin/bulk/reject'
 */
reject.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::deleteMethod
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:98
 * @route '/admin/bulk/delete'
 */
export const deleteMethod = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/admin/bulk/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::deleteMethod
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:98
 * @route '/admin/bulk/delete'
 */
deleteMethod.url = (options?: RouteQueryOptions) => {
    return deleteMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\BulkOperationsController::deleteMethod
 * @see Modules/Registrar/app/Http/Controllers/BulkOperationsController.php:98
 * @route '/admin/bulk/delete'
 */
deleteMethod.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(options),
    method: 'delete',
})
const bulk = {
    updateStatus: Object.assign(updateStatus, updateStatus),
assign: Object.assign(assign, assign),
release: Object.assign(release, release),
reject: Object.assign(reject, reject),
delete: Object.assign(deleteMethod, deleteMethod),
}

export default bulk