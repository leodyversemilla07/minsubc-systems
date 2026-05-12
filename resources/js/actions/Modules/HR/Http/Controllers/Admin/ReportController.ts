import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
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
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendanceReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
export const attendanceReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendanceReport.url(options),
    method: 'get',
})

attendanceReport.definition = {
    methods: ["get","head"],
    url: '/hr/admin/reports/attendance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendanceReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
attendanceReport.url = (options?: RouteQueryOptions) => {
    return attendanceReport.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendanceReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
attendanceReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: attendanceReport.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendanceReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
attendanceReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: attendanceReport.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendanceReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
    const attendanceReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: attendanceReport.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendanceReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
        attendanceReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendanceReport.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::attendanceReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:24
 * @route '/hr/admin/reports/attendance'
 */
        attendanceReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: attendanceReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    attendanceReport.form = attendanceReportForm
/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leaveReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
export const leaveReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveReport.url(options),
    method: 'get',
})

leaveReport.definition = {
    methods: ["get","head"],
    url: '/hr/admin/reports/leave',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leaveReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
leaveReport.url = (options?: RouteQueryOptions) => {
    return leaveReport.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leaveReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
leaveReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leaveReport.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leaveReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
leaveReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leaveReport.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leaveReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
    const leaveReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: leaveReport.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leaveReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
        leaveReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveReport.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\ReportController::leaveReport
 * @see Modules/HR/app/Http/Controllers/Admin/ReportController.php:30
 * @route '/hr/admin/reports/leave'
 */
        leaveReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leaveReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    leaveReport.form = leaveReportForm
const ReportController = { index, attendanceReport, leaveReport }

export default ReportController