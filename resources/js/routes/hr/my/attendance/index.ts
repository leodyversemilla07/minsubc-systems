import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::timeIn
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:42
 * @route '/hr/my/attendance/time-in'
 */
export const timeIn = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: timeIn.url(options),
    method: 'post',
})

timeIn.definition = {
    methods: ["post"],
    url: '/hr/my/attendance/time-in',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::timeIn
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:42
 * @route '/hr/my/attendance/time-in'
 */
timeIn.url = (options?: RouteQueryOptions) => {
    return timeIn.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::timeIn
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:42
 * @route '/hr/my/attendance/time-in'
 */
timeIn.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: timeIn.url(options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::timeIn
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:42
 * @route '/hr/my/attendance/time-in'
 */
    const timeInForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: timeIn.url(options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::timeIn
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:42
 * @route '/hr/my/attendance/time-in'
 */
        timeInForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: timeIn.url(options),
            method: 'post',
        })
    
    timeIn.form = timeInForm
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::timeOut
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:61
 * @route '/hr/my/attendance/time-out'
 */
export const timeOut = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: timeOut.url(options),
    method: 'post',
})

timeOut.definition = {
    methods: ["post"],
    url: '/hr/my/attendance/time-out',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::timeOut
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:61
 * @route '/hr/my/attendance/time-out'
 */
timeOut.url = (options?: RouteQueryOptions) => {
    return timeOut.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::timeOut
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:61
 * @route '/hr/my/attendance/time-out'
 */
timeOut.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: timeOut.url(options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::timeOut
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:61
 * @route '/hr/my/attendance/time-out'
 */
    const timeOutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: timeOut.url(options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::timeOut
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:61
 * @route '/hr/my/attendance/time-out'
 */
        timeOutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: timeOut.url(options),
            method: 'post',
        })
    
    timeOut.form = timeOutForm
const attendance = {
    timeIn: Object.assign(timeIn, timeIn),
timeOut: Object.assign(timeOut, timeOut),
}

export default attendance