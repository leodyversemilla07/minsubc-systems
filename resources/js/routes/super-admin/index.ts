import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import users48860f from './users'
import systemSettings2a45d2 from './system-settings'
import auditLogs5bd45d from './audit-logs'
/**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/super-admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdminController::dashboard
 * @see app/Http/Controllers/SuperAdminController.php:24
 * @route '/super-admin/dashboard'
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
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/super-admin/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
    const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
        analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdminController::analytics
 * @see app/Http/Controllers/SuperAdminController.php:517
 * @route '/super-admin/analytics'
 */
        analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    analytics.form = analyticsForm
/**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: '/super-admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
    const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
        usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdminController::users
 * @see app/Http/Controllers/SuperAdminController.php:62
 * @route '/super-admin/users'
 */
        usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users.form = usersForm
/**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
export const systemSettings = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemSettings.url(options),
    method: 'get',
})

systemSettings.definition = {
    methods: ["get","head"],
    url: '/super-admin/system-settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
systemSettings.url = (options?: RouteQueryOptions) => {
    return systemSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
systemSettings.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemSettings.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
systemSettings.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: systemSettings.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
    const systemSettingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: systemSettings.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
        systemSettingsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: systemSettings.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdminController::systemSettings
 * @see app/Http/Controllers/SuperAdminController.php:260
 * @route '/super-admin/system-settings'
 */
        systemSettingsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: systemSettings.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    systemSettings.form = systemSettingsForm
/**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
export const auditLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})

auditLogs.definition = {
    methods: ["get","head"],
    url: '/super-admin/audit-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
auditLogs.url = (options?: RouteQueryOptions) => {
    return auditLogs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
auditLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
auditLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: auditLogs.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
    const auditLogsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: auditLogs.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
        auditLogsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: auditLogs.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdminController::auditLogs
 * @see app/Http/Controllers/SuperAdminController.php:324
 * @route '/super-admin/audit-logs'
 */
        auditLogsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: auditLogs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    auditLogs.form = auditLogsForm
/**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/super-admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdminController::reports
 * @see app/Http/Controllers/SuperAdminController.php:401
 * @route '/super-admin/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
/**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
export const systemConfig = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemConfig.url(options),
    method: 'get',
})

systemConfig.definition = {
    methods: ["get","head"],
    url: '/super-admin/system-config',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
systemConfig.url = (options?: RouteQueryOptions) => {
    return systemConfig.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
systemConfig.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systemConfig.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
systemConfig.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: systemConfig.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
    const systemConfigForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: systemConfig.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
        systemConfigForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: systemConfig.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SuperAdminController::systemConfig
 * @see app/Http/Controllers/SuperAdminController.php:451
 * @route '/super-admin/system-config'
 */
        systemConfigForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: systemConfig.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    systemConfig.form = systemConfigForm
const superAdmin = {
    dashboard: Object.assign(dashboard, dashboard),
analytics: Object.assign(analytics, analytics),
users: Object.assign(users, users48860f),
systemSettings: Object.assign(systemSettings, systemSettings2a45d2),
auditLogs: Object.assign(auditLogs, auditLogs5bd45d),
reports: Object.assign(reports, reports),
systemConfig: Object.assign(systemConfig, systemConfig),
}

export default superAdmin