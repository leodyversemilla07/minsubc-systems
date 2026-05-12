import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import students4fe9ea from './students'
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/guidance/counselor/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::dashboard
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
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
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: '/guidance/counselor/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
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
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
export const students = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(options),
    method: 'get',
})

students.definition = {
    methods: ["get","head"],
    url: '/guidance/counselor/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
students.url = (options?: RouteQueryOptions) => {
    return students.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
students.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
students.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: students.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
    const studentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: students.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
        studentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
        studentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    students.form = studentsForm
const counselor = {
    dashboard: Object.assign(dashboard, dashboard),
appointments: Object.assign(appointments, appointments),
students: Object.assign(students, students4fe9ea),
}

export default counselor