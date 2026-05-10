import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkApproveScholarships
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:17
 * @route '/sas/admin/bulk/scholarships/approve'
 */
export const bulkApproveScholarships = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkApproveScholarships.url(options),
    method: 'post',
})

bulkApproveScholarships.definition = {
    methods: ["post"],
    url: '/sas/admin/bulk/scholarships/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkApproveScholarships
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:17
 * @route '/sas/admin/bulk/scholarships/approve'
 */
bulkApproveScholarships.url = (options?: RouteQueryOptions) => {
    return bulkApproveScholarships.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkApproveScholarships
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:17
 * @route '/sas/admin/bulk/scholarships/approve'
 */
bulkApproveScholarships.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkApproveScholarships.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkRejectScholarships
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:36
 * @route '/sas/admin/bulk/scholarships/reject'
 */
export const bulkRejectScholarships = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkRejectScholarships.url(options),
    method: 'post',
})

bulkRejectScholarships.definition = {
    methods: ["post"],
    url: '/sas/admin/bulk/scholarships/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkRejectScholarships
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:36
 * @route '/sas/admin/bulk/scholarships/reject'
 */
bulkRejectScholarships.url = (options?: RouteQueryOptions) => {
    return bulkRejectScholarships.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkRejectScholarships
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:36
 * @route '/sas/admin/bulk/scholarships/reject'
 */
bulkRejectScholarships.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkRejectScholarships.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkUpdateScholarshipStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:125
 * @route '/sas/admin/bulk/scholarships/update-status'
 */
export const bulkUpdateScholarshipStatus = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpdateScholarshipStatus.url(options),
    method: 'post',
})

bulkUpdateScholarshipStatus.definition = {
    methods: ["post"],
    url: '/sas/admin/bulk/scholarships/update-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkUpdateScholarshipStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:125
 * @route '/sas/admin/bulk/scholarships/update-status'
 */
bulkUpdateScholarshipStatus.url = (options?: RouteQueryOptions) => {
    return bulkUpdateScholarshipStatus.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkUpdateScholarshipStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:125
 * @route '/sas/admin/bulk/scholarships/update-status'
 */
bulkUpdateScholarshipStatus.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpdateScholarshipStatus.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkDeleteScholarships
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:93
 * @route '/sas/admin/bulk/scholarships/delete'
 */
export const bulkDeleteScholarships = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDeleteScholarships.url(options),
    method: 'delete',
})

bulkDeleteScholarships.definition = {
    methods: ["delete"],
    url: '/sas/admin/bulk/scholarships/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkDeleteScholarships
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:93
 * @route '/sas/admin/bulk/scholarships/delete'
 */
bulkDeleteScholarships.url = (options?: RouteQueryOptions) => {
    return bulkDeleteScholarships.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkDeleteScholarships
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:93
 * @route '/sas/admin/bulk/scholarships/delete'
 */
bulkDeleteScholarships.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDeleteScholarships.url(options),
    method: 'delete',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkApproveInsurance
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:56
 * @route '/sas/admin/bulk/insurance/approve'
 */
export const bulkApproveInsurance = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkApproveInsurance.url(options),
    method: 'post',
})

bulkApproveInsurance.definition = {
    methods: ["post"],
    url: '/sas/admin/bulk/insurance/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkApproveInsurance
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:56
 * @route '/sas/admin/bulk/insurance/approve'
 */
bulkApproveInsurance.url = (options?: RouteQueryOptions) => {
    return bulkApproveInsurance.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkApproveInsurance
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:56
 * @route '/sas/admin/bulk/insurance/approve'
 */
bulkApproveInsurance.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkApproveInsurance.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkRejectInsurance
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:75
 * @route '/sas/admin/bulk/insurance/reject'
 */
export const bulkRejectInsurance = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkRejectInsurance.url(options),
    method: 'post',
})

bulkRejectInsurance.definition = {
    methods: ["post"],
    url: '/sas/admin/bulk/insurance/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkRejectInsurance
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:75
 * @route '/sas/admin/bulk/insurance/reject'
 */
bulkRejectInsurance.url = (options?: RouteQueryOptions) => {
    return bulkRejectInsurance.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkRejectInsurance
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:75
 * @route '/sas/admin/bulk/insurance/reject'
 */
bulkRejectInsurance.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkRejectInsurance.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkDeleteInsurance
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:109
 * @route '/sas/admin/bulk/insurance/delete'
 */
export const bulkDeleteInsurance = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDeleteInsurance.url(options),
    method: 'delete',
})

bulkDeleteInsurance.definition = {
    methods: ["delete"],
    url: '/sas/admin/bulk/insurance/delete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkDeleteInsurance
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:109
 * @route '/sas/admin/bulk/insurance/delete'
 */
bulkDeleteInsurance.url = (options?: RouteQueryOptions) => {
    return bulkDeleteInsurance.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\BulkOperationsController::bulkDeleteInsurance
 * @see Modules/SAS/app/Http/Controllers/Admin/BulkOperationsController.php:109
 * @route '/sas/admin/bulk/insurance/delete'
 */
bulkDeleteInsurance.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: bulkDeleteInsurance.url(options),
    method: 'delete',
})
const BulkOperationsController = { bulkApproveScholarships, bulkRejectScholarships, bulkUpdateScholarshipStatus, bulkDeleteScholarships, bulkApproveInsurance, bulkRejectInsurance, bulkDeleteInsurance }

export default BulkOperationsController