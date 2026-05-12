import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:17
 * @route '/voting/admin/activity-logs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting/admin/activity-logs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:17
 * @route '/voting/admin/activity-logs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:17
 * @route '/voting/admin/activity-logs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:17
 * @route '/voting/admin/activity-logs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:17
 * @route '/voting/admin/activity-logs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:17
 * @route '/voting/admin/activity-logs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:17
 * @route '/voting/admin/activity-logs'
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:66
 * @route '/voting/admin/activity-logs/{activityLog}'
 */
export const show = (args: { activityLog: number | { id: number } } | [activityLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/voting/admin/activity-logs/{activityLog}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:66
 * @route '/voting/admin/activity-logs/{activityLog}'
 */
show.url = (args: { activityLog: number | { id: number } } | [activityLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activityLog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { activityLog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    activityLog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        activityLog: typeof args.activityLog === 'object'
                ? args.activityLog.id
                : args.activityLog,
                }

    return show.definition.url
            .replace('{activityLog}', parsedArgs.activityLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:66
 * @route '/voting/admin/activity-logs/{activityLog}'
 */
show.get = (args: { activityLog: number | { id: number } } | [activityLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:66
 * @route '/voting/admin/activity-logs/{activityLog}'
 */
show.head = (args: { activityLog: number | { id: number } } | [activityLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:66
 * @route '/voting/admin/activity-logs/{activityLog}'
 */
    const showForm = (args: { activityLog: number | { id: number } } | [activityLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:66
 * @route '/voting/admin/activity-logs/{activityLog}'
 */
        showForm.get = (args: { activityLog: number | { id: number } } | [activityLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\ActivityLogController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/ActivityLogController.php:66
 * @route '/voting/admin/activity-logs/{activityLog}'
 */
        showForm.head = (args: { activityLog: number | { id: number } } | [activityLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const activityLogs = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default activityLogs