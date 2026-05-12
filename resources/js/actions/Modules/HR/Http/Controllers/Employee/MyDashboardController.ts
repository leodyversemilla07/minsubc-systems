import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::index
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/my/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::index
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::index
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::index
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::index
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::index
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::index
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:17
 * @route '/hr/my/dashboard'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
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
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::leaveRequests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
export const leaveRequests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveRequests.url(options),
    method: 'get',
})

leaveRequests.definition = {
    methods: ["get","head"],
    url: '/hr/my/leave',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::leaveRequests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
leaveRequests.url = (options?: RouteQueryOptions) => {
    return leaveRequests.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::leaveRequests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
leaveRequests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveRequests.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::leaveRequests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
leaveRequests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leaveRequests.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::leaveRequests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
    const leaveRequestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: leaveRequests.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::leaveRequests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
        leaveRequestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveRequests.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::leaveRequests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
        leaveRequestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveRequests.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    leaveRequests.form = leaveRequestsForm
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::submitLeave
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:87
 * @route '/hr/my/leave'
 */
export const submitLeave = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitLeave.url(options),
    method: 'post',
})

submitLeave.definition = {
    methods: ["post"],
    url: '/hr/my/leave',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::submitLeave
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:87
 * @route '/hr/my/leave'
 */
submitLeave.url = (options?: RouteQueryOptions) => {
    return submitLeave.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::submitLeave
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:87
 * @route '/hr/my/leave'
 */
submitLeave.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitLeave.url(options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::submitLeave
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:87
 * @route '/hr/my/leave'
 */
    const submitLeaveForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitLeave.url(options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::submitLeave
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:87
 * @route '/hr/my/leave'
 */
        submitLeaveForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitLeave.url(options),
            method: 'post',
        })
    
    submitLeave.form = submitLeaveForm
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
const MyDashboardController = { index, attendance, timeIn, timeOut, leaveRequests, submitLeave, evaluations }

export default MyDashboardController