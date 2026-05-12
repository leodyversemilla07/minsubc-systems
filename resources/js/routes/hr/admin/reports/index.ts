import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::index
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/hr/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::index
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/hr/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::index
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/hr/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::index
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/hr/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::index
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/hr/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::index
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/hr/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::index
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/hr/admin/reports'
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
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendance
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
export const attendance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})

attendance.definition = {
    methods: ["get","head"],
    url: '/hr/admin/reports/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendance
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
attendance.url = (options?: RouteQueryOptions) => {
    return attendance.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendance
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
attendance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendance.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendance
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
attendance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendance.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendance
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
    const attendanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendance.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendance
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
        attendanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendance.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendance
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
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
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leave
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
export const leave = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leave.url(options),
    method: 'get',
})

leave.definition = {
    methods: ["get","head"],
    url: '/hr/admin/reports/leave',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leave
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
leave.url = (options?: RouteQueryOptions) => {
    return leave.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leave
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
leave.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leave.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leave
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
leave.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leave.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leave
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
    const leaveForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: leave.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leave
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
        leaveForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leave.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leave
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
        leaveForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leave.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    leave.form = leaveForm
const reports = {
    index: Object.assign(index, index),
attendance: Object.assign(attendance, attendance),
leave: Object.assign(leave, leave),
}

export default reports