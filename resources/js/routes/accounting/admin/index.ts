import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import feeCategories from './fee-categories'
import feeItems from './fee-items'
import assessments from './assessments'
import payments from './payments'
import invoices from './invoices'
import chartAccounts from './chart-accounts'
import discounts from './discounts'
import reports from './reports'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
feeCategories: Object.assign(feeCategories, feeCategories),
feeItems: Object.assign(feeItems, feeItems),
assessments: Object.assign(assessments, assessments),
payments: Object.assign(payments, payments),
invoices: Object.assign(invoices, invoices),
chartAccounts: Object.assign(chartAccounts, chartAccounts),
discounts: Object.assign(discounts, discounts),
reports: Object.assign(reports, reports),
}

export default admin