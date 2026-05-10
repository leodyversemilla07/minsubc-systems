import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\AdminController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:23
 * @route '/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:23
 * @route '/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:23
 * @route '/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AdminController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:23
 * @route '/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::show
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:67
 * @route '/admin/requests/{documentRequest}'
 */
export const show = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/requests/{documentRequest}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::show
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:67
 * @route '/admin/requests/{documentRequest}'
 */
show.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return show.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::show
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:67
 * @route '/admin/requests/{documentRequest}'
 */
show.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AdminController::show
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:67
 * @route '/admin/requests/{documentRequest}'
 */
show.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::updateStatus
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:85
 * @route '/admin/requests/{documentRequest}/status'
 */
export const updateStatus = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admin/requests/{documentRequest}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::updateStatus
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:85
 * @route '/admin/requests/{documentRequest}/status'
 */
updateStatus.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return updateStatus.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::updateStatus
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:85
 * @route '/admin/requests/{documentRequest}/status'
 */
updateStatus.patch = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::markReady
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:124
 * @route '/admin/requests/{documentRequest}/ready'
 */
export const markReady = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markReady.url(args, options),
    method: 'post',
})

markReady.definition = {
    methods: ["post"],
    url: '/admin/requests/{documentRequest}/ready',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::markReady
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:124
 * @route '/admin/requests/{documentRequest}/ready'
 */
markReady.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return markReady.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::markReady
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:124
 * @route '/admin/requests/{documentRequest}/ready'
 */
markReady.post = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markReady.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::releaseDocument
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:167
 * @route '/admin/requests/{documentRequest}/release'
 */
export const releaseDocument = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: releaseDocument.url(args, options),
    method: 'post',
})

releaseDocument.definition = {
    methods: ["post"],
    url: '/admin/requests/{documentRequest}/release',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::releaseDocument
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:167
 * @route '/admin/requests/{documentRequest}/release'
 */
releaseDocument.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return releaseDocument.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::releaseDocument
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:167
 * @route '/admin/requests/{documentRequest}/release'
 */
releaseDocument.post = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: releaseDocument.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::auditLogs
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:215
 * @route '/admin/audit-logs'
 */
export const auditLogs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})

auditLogs.definition = {
    methods: ["get","head"],
    url: '/admin/audit-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::auditLogs
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:215
 * @route '/admin/audit-logs'
 */
auditLogs.url = (options?: RouteQueryOptions) => {
    return auditLogs.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::auditLogs
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:215
 * @route '/admin/audit-logs'
 */
auditLogs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auditLogs.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AdminController::auditLogs
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:215
 * @route '/admin/audit-logs'
 */
auditLogs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: auditLogs.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::showAuditLog
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:276
 * @route '/admin/audit-logs/{auditLog}'
 */
export const showAuditLog = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showAuditLog.url(args, options),
    method: 'get',
})

showAuditLog.definition = {
    methods: ["get","head"],
    url: '/admin/audit-logs/{auditLog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::showAuditLog
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:276
 * @route '/admin/audit-logs/{auditLog}'
 */
showAuditLog.url = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { auditLog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { auditLog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    auditLog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        auditLog: typeof args.auditLog === 'object'
                ? args.auditLog.id
                : args.auditLog,
                }

    return showAuditLog.definition.url
            .replace('{auditLog}', parsedArgs.auditLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AdminController::showAuditLog
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:276
 * @route '/admin/audit-logs/{auditLog}'
 */
showAuditLog.get = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showAuditLog.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AdminController::showAuditLog
 * @see Modules/Registrar/app/Http/Controllers/AdminController.php:276
 * @route '/admin/audit-logs/{auditLog}'
 */
showAuditLog.head = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showAuditLog.url(args, options),
    method: 'head',
})
const AdminController = { dashboard, show, updateStatus, markReady, releaseDocument, auditLogs, showAuditLog }

export default AdminController