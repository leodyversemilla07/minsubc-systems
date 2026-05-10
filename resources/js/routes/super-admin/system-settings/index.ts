import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SuperAdminController::update
 * @see app/Http/Controllers/SuperAdminController.php:292
 * @route '/super-admin/system-settings/{systemSetting}'
 */
export const update = (args: { systemSetting: number | { id: number } } | [systemSetting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/super-admin/system-settings/{systemSetting}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\SuperAdminController::update
 * @see app/Http/Controllers/SuperAdminController.php:292
 * @route '/super-admin/system-settings/{systemSetting}'
 */
update.url = (args: { systemSetting: number | { id: number } } | [systemSetting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { systemSetting: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { systemSetting: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    systemSetting: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        systemSetting: typeof args.systemSetting === 'object'
                ? args.systemSetting.id
                : args.systemSetting,
                }

    return update.definition.url
            .replace('{systemSetting}', parsedArgs.systemSetting.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SuperAdminController::update
 * @see app/Http/Controllers/SuperAdminController.php:292
 * @route '/super-admin/system-settings/{systemSetting}'
 */
update.patch = (args: { systemSetting: number | { id: number } } | [systemSetting: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})
const systemSettings = {
    update: Object.assign(update, update),
}

export default systemSettings