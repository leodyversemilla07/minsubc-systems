import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import books from './books'
import categories from './categories'
import borrowings from './borrowings'
import fines from './fines'
import reports from './reports'
/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/library/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/library/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/library/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/library/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Library/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/library/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
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
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
statistics: Object.assign(statistics, statistics),
books: Object.assign(books, books),
categories: Object.assign(categories, categories),
borrowings: Object.assign(borrowings, borrowings),
fines: Object.assign(fines, fines),
reports: Object.assign(reports, reports),
}

export default admin