import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:451
 * @route '/guidance/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:451
 * @route '/guidance/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:451
 * @route '/guidance/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:451
 * @route '/guidance/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:451
 * @route '/guidance/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:451
 * @route '/guidance/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:451
 * @route '/guidance/admin/reports'
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
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointmentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
export const appointmentsReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointmentsReport.url(options),
    method: 'get',
})

appointmentsReport.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/reports/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointmentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
appointmentsReport.url = (options?: RouteQueryOptions) => {
    return appointmentsReport.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointmentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
appointmentsReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointmentsReport.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointmentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
appointmentsReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointmentsReport.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointmentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
    const appointmentsReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointmentsReport.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointmentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
        appointmentsReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointmentsReport.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointmentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
        appointmentsReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointmentsReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    appointmentsReport.form = appointmentsReportForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessionsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
export const sessionsReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sessionsReport.url(options),
    method: 'get',
})

sessionsReport.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/reports/sessions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessionsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
sessionsReport.url = (options?: RouteQueryOptions) => {
    return sessionsReport.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessionsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
sessionsReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sessionsReport.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessionsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
sessionsReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sessionsReport.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessionsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
    const sessionsReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sessionsReport.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessionsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
        sessionsReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sessionsReport.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessionsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
        sessionsReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sessionsReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sessionsReport.form = sessionsReportForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
export const incidentsReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: incidentsReport.url(options),
    method: 'get',
})

incidentsReport.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/reports/incidents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
incidentsReport.url = (options?: RouteQueryOptions) => {
    return incidentsReport.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
incidentsReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: incidentsReport.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
incidentsReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: incidentsReport.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
    const incidentsReportForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: incidentsReport.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
        incidentsReportForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: incidentsReport.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidentsReport
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
        incidentsReportForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: incidentsReport.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    incidentsReport.form = incidentsReportForm
const ReportController = { index, appointmentsReport, sessionsReport, incidentsReport }

export default ReportController