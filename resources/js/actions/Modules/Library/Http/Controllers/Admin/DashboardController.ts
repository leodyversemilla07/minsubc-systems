import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/library/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/library/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/library/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/library/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/library/admin/statistics'
 */
export const statistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/library/admin/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/library/admin/statistics'
 */
statistics.url = (options?: RouteQueryOptions) => {
    return statistics.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/library/admin/statistics'
 */
statistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/library/admin/statistics'
 */
statistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(options),
    method: 'head',
})
const DashboardController = { index, statistics }

export default DashboardController