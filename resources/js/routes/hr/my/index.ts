import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import attendanceC12b95 from './attendance'
import leave from './leave'
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/hr/my/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::dashboard
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
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
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::attendance
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:33
 * @route '/hr/my/attendance'
 */
export const attendance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})

attendance.definition = {
    methods: ["get","head"],
    url: '/hr/my/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::attendance
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:33
 * @route '/hr/my/attendance'
 */
attendance.url = (options?: RouteQueryOptions) => {
    return attendance.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::attendance
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:33
 * @route '/hr/my/attendance'
 */
attendance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::attendance
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:33
 * @route '/hr/my/attendance'
 */
attendance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendance.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::attendance
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:33
 * @route '/hr/my/attendance'
 */
    const attendanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendance.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::attendance
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:33
 * @route '/hr/my/attendance'
 */
        attendanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::attendance
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:33
 * @route '/hr/my/attendance'
 */
        attendanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendance.form = attendanceForm
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::evaluations
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:108
 * @route '/hr/my/evaluations'
 */
export const evaluations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: evaluations.url(options),
    method: 'get',
})

evaluations.definition = {
    methods: ["get","head"],
    url: '/hr/my/evaluations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::evaluations
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:108
 * @route '/hr/my/evaluations'
 */
evaluations.url = (options?: RouteQueryOptions) => {
    return evaluations.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::evaluations
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:108
 * @route '/hr/my/evaluations'
 */
evaluations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: evaluations.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::evaluations
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:108
 * @route '/hr/my/evaluations'
 */
evaluations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: evaluations.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::evaluations
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:108
 * @route '/hr/my/evaluations'
 */
    const evaluationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: evaluations.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::evaluations
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:108
 * @route '/hr/my/evaluations'
 */
        evaluationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: evaluations.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::evaluations
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:108
 * @route '/hr/my/evaluations'
 */
        evaluationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: evaluations.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    evaluations.form = evaluationsForm
const my = {
    dashboard: Object.assign(dashboard, dashboard),
attendance: Object.assign(attendance, attendanceC12b95),
leave: Object.assign(leave, leave),
evaluations: Object.assign(evaluations, evaluations),
}

export default my