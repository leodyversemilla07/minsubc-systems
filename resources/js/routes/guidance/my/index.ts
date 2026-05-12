import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import appointments40eafc from './appointments'
import assessments287135 from './assessments'
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/guidance/my/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
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
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: '/guidance/my/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
        appointmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    appointments.form = appointmentsForm
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
export const assessments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assessments.url(options),
    method: 'get',
})

assessments.definition = {
    methods: ["get","head"],
    url: '/guidance/my/assessments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
assessments.url = (options?: RouteQueryOptions) => {
    return assessments.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
assessments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assessments.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
assessments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assessments.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
    const assessmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assessments.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
        assessmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assessments.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
        assessmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assessments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assessments.form = assessmentsForm
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
export const counselors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: counselors.url(options),
    method: 'get',
})

counselors.definition = {
    methods: ["get","head"],
    url: '/guidance/my/counselors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
counselors.url = (options?: RouteQueryOptions) => {
    return counselors.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
counselors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: counselors.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
counselors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: counselors.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
    const counselorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: counselors.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
        counselorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: counselors.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
        counselorsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: counselors.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    counselors.form = counselorsForm
const my = {
    dashboard: Object.assign(dashboard, dashboard),
appointments: Object.assign(appointments, appointments40eafc),
assessments: Object.assign(assessments, assessments287135),
counselors: Object.assign(counselors, counselors),
}

export default my