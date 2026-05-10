import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
import scholarships from './scholarships'
import scholarshipRecipients from './scholarship-recipients'
import renewals from './renewals'
import insurance from './insurance'
import organizations from './organizations'
import activities from './activities'
import documents from './documents'
import reports from './reports'
import bulk from './bulk'
/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/sas/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
export const statistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/sas/admin/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
statistics.url = (options?: RouteQueryOptions) => {
    return statistics.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
statistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
statistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(options),
    method: 'head',
})
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
statistics: Object.assign(statistics, statistics),
scholarships: Object.assign(scholarships, scholarships),
scholarshipRecipients: Object.assign(scholarshipRecipients, scholarshipRecipients),
renewals: Object.assign(renewals, renewals),
insurance: Object.assign(insurance, insurance),
organizations: Object.assign(organizations, organizations),
activities: Object.assign(activities, activities),
documents: Object.assign(documents, documents),
reports: Object.assign(reports, reports),
bulk: Object.assign(bulk, bulk),
}

export default admin