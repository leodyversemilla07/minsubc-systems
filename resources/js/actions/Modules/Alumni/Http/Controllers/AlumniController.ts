import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alumni',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
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
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
export const directory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: directory.url(options),
    method: 'get',
})

directory.definition = {
    methods: ["get","head"],
    url: '/alumni/directory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
directory.url = (options?: RouteQueryOptions) => {
    return directory.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
directory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: directory.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
directory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: directory.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
    const directoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: directory.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
        directoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: directory.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
        directoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: directory.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    directory.form = directoryForm
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::events
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
export const events = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})

events.definition = {
    methods: ["get","head"],
    url: '/alumni/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::events
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
events.url = (options?: RouteQueryOptions) => {
    return events.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::events
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
events.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::events
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
events.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: events.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::events
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
    const eventsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: events.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::events
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
        eventsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: events.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::events
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:26
 * @route '/alumni/events'
 */
        eventsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: events.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    events.form = eventsForm
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::eventShow
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
export const eventShow = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventShow.url(args, options),
    method: 'get',
})

eventShow.definition = {
    methods: ["get","head"],
    url: '/alumni/events/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::eventShow
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
eventShow.url = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return eventShow.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::eventShow
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
eventShow.get = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::eventShow
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
eventShow.head = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventShow.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::eventShow
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
    const eventShowForm = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: eventShow.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::eventShow
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
        eventShowForm.get = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: eventShow.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::eventShow
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:35
 * @route '/alumni/events/{event}'
 */
        eventShowForm.head = (args: { event: number | { id: number } } | [event: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: eventShow.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    eventShow.form = eventShowForm
const AlumniController = { index, directory, events, eventShow }

export default AlumniController