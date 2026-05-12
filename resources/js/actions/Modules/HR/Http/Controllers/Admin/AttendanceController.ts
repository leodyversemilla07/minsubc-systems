import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::index
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:16
 * @route '/hr/admin/attendance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/admin/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::index
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:16
 * @route '/hr/admin/attendance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::index
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:16
 * @route '/hr/admin/attendance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::index
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:16
 * @route '/hr/admin/attendance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::index
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:16
 * @route '/hr/admin/attendance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::index
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:16
 * @route '/hr/admin/attendance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::index
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:16
 * @route '/hr/admin/attendance'
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
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::report
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:99
 * @route '/hr/admin/attendance/report'
 */
export const report = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})

report.definition = {
    methods: ["get","head"],
    url: '/hr/admin/attendance/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::report
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:99
 * @route '/hr/admin/attendance/report'
 */
report.url = (options?: RouteQueryOptions) => {
    return report.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::report
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:99
 * @route '/hr/admin/attendance/report'
 */
report.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: report.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::report
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:99
 * @route '/hr/admin/attendance/report'
 */
report.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: report.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::report
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:99
 * @route '/hr/admin/attendance/report'
 */
    const reportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: report.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::report
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:99
 * @route '/hr/admin/attendance/report'
 */
        reportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: report.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::report
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:99
 * @route '/hr/admin/attendance/report'
 */
        reportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: report.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    report.form = reportForm
/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::bulkUpdate
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:71
 * @route '/hr/admin/attendance/bulk'
 */
export const bulkUpdate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpdate.url(options),
    method: 'post',
})

bulkUpdate.definition = {
    methods: ["post"],
    url: '/hr/admin/attendance/bulk',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::bulkUpdate
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:71
 * @route '/hr/admin/attendance/bulk'
 */
bulkUpdate.url = (options?: RouteQueryOptions) => {
    return bulkUpdate.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::bulkUpdate
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:71
 * @route '/hr/admin/attendance/bulk'
 */
bulkUpdate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpdate.url(options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::bulkUpdate
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:71
 * @route '/hr/admin/attendance/bulk'
 */
    const bulkUpdateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bulkUpdate.url(options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::bulkUpdate
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:71
 * @route '/hr/admin/attendance/bulk'
 */
        bulkUpdateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bulkUpdate.url(options),
            method: 'post',
        })
    
    bulkUpdate.form = bulkUpdateForm
/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::employeeAttendance
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:53
 * @route '/hr/admin/attendance/{employee}'
 */
export const employeeAttendance = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employeeAttendance.url(args, options),
    method: 'get',
})

employeeAttendance.definition = {
    methods: ["get","head"],
    url: '/hr/admin/attendance/{employee}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::employeeAttendance
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:53
 * @route '/hr/admin/attendance/{employee}'
 */
employeeAttendance.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employee: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employee: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employee: typeof args.employee === 'object'
                ? args.employee.id
                : args.employee,
                }

    return employeeAttendance.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::employeeAttendance
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:53
 * @route '/hr/admin/attendance/{employee}'
 */
employeeAttendance.get = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employeeAttendance.url(args, options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::employeeAttendance
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:53
 * @route '/hr/admin/attendance/{employee}'
 */
employeeAttendance.head = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: employeeAttendance.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::employeeAttendance
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:53
 * @route '/hr/admin/attendance/{employee}'
 */
    const employeeAttendanceForm = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: employeeAttendance.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::employeeAttendance
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:53
 * @route '/hr/admin/attendance/{employee}'
 */
        employeeAttendanceForm.get = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employeeAttendance.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\AttendanceController::employeeAttendance
 * @see Modules/HR/app/Http/Controllers/Admin/AttendanceController.php:53
 * @route '/hr/admin/attendance/{employee}'
 */
        employeeAttendanceForm.head = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employeeAttendance.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    employeeAttendance.form = employeeAttendanceForm
const AttendanceController = { index, report, bulkUpdate, employeeAttendance }

export default AttendanceController