import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import applicants from './applicants'
import evaluations from './evaluations'
import enrollments from './enrollments'
import programs from './programs'
import terms from './terms'
import subjects from './subjects'
import sections from './sections'
import schedules from './schedules'
import grades from './grades'
import transcripts from './transcripts'
/**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admission/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
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
applicants: Object.assign(applicants, applicants),
evaluations: Object.assign(evaluations, evaluations),
enrollments: Object.assign(enrollments, enrollments),
programs: Object.assign(programs, programs),
terms: Object.assign(terms, terms),
subjects: Object.assign(subjects, subjects),
sections: Object.assign(sections, sections),
schedules: Object.assign(schedules, schedules),
grades: Object.assign(grades, grades),
transcripts: Object.assign(transcripts, transcripts),
}

export default admin