import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:389
 * @route '/super-admin/audit-logs/{auditLog}'
 */
export const show = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/super-admin/audit-logs/{auditLog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:389
 * @route '/super-admin/audit-logs/{auditLog}'
 */
show.url = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{auditLog}', parsedArgs.auditLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:389
 * @route '/super-admin/audit-logs/{auditLog}'
 */
show.get = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SuperAdminController::show
 * @see app/Http/Controllers/SuperAdminController.php:389
 * @route '/super-admin/audit-logs/{auditLog}'
 */
show.head = (args: { auditLog: number | { id: number } } | [auditLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const auditLogs = {
    show: Object.assign(show, show),
}

export default auditLogs