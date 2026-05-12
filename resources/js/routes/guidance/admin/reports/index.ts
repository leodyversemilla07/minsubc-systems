import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/reports/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:456
 * @route '/guidance/admin/reports/appointments'
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
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessions
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
export const sessions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sessions.url(options),
    method: 'get',
})

sessions.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/reports/sessions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessions
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
sessions.url = (options?: RouteQueryOptions) => {
    return sessions.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessions
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
sessions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sessions.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessions
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
sessions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sessions.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessions
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
    const sessionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sessions.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessions
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
        sessionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sessions.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::sessions
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:462
 * @route '/guidance/admin/reports/sessions'
 */
        sessionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sessions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sessions.form = sessionsForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
export const incidents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: incidents.url(options),
    method: 'get',
})

incidents.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/reports/incidents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
incidents.url = (options?: RouteQueryOptions) => {
    return incidents.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
incidents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: incidents.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
incidents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: incidents.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
    const incidentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: incidents.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
        incidentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: incidents.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReportController::incidents
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:468
 * @route '/guidance/admin/reports/incidents'
 */
        incidentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: incidents.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    incidents.form = incidentsForm
const reports = {
    index: Object.assign(index, index),
appointments: Object.assign(appointments, appointments),
sessions: Object.assign(sessions, sessions),
incidents: Object.assign(incidents, incidents),
}

export default reports