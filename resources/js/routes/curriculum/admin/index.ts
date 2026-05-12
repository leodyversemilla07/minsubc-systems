import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import programs from './programs'
import programOutcomes from './program-outcomes'
import curricula from './curricula'
import courses from './courses'
import syllabi from './syllabi'
import textbooks from './textbooks'
import reports from './reports'
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
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
programs: Object.assign(programs, programs),
programOutcomes: Object.assign(programOutcomes, programOutcomes),
curricula: Object.assign(curricula, curricula),
courses: Object.assign(courses, courses),
syllabi: Object.assign(syllabi, syllabi),
textbooks: Object.assign(textbooks, textbooks),
reports: Object.assign(reports, reports),
}

export default admin