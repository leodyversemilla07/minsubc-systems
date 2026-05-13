import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import researchTypes from './research-types'
import proposals from './proposals'
import panels from './panels'
import defenses from './defenses'
import gradeReports from './grade-reports'
import publications from './publications'
import journals from './journals'
import issues from './issues'
import reports from './reports'
/**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/research/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
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
researchTypes: Object.assign(researchTypes, researchTypes),
proposals: Object.assign(proposals, proposals),
panels: Object.assign(panels, panels),
defenses: Object.assign(defenses, defenses),
gradeReports: Object.assign(gradeReports, gradeReports),
publications: Object.assign(publications, publications),
journals: Object.assign(journals, journals),
issues: Object.assign(issues, issues),
reports: Object.assign(reports, reports),
}

export default admin