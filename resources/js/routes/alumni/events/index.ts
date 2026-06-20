import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alumni/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
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
* @see \Modules\Alumni\Http\Controllers\AlumniController::show
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
export const show = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/alumni/events/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::show
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
show.url = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { event: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.id
                : args.event,
                }

    return show.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::show
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
show.get = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::show
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
show.head = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::show
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
    const showForm = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::show
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
        showForm.get = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::show
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
        showForm.head = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const events = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default events