import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import calendarFa95d0 from './calendar'
/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
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
* @see \Modules\USG\Http\Controllers\PageController::calendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
export const calendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})

calendar.definition = {
    methods: ["get","head"],
    url: '/usg/events/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::calendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
calendar.url = (options?: RouteQueryOptions) => {
    return calendar.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::calendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
calendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::calendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
calendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendar.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\PageController::calendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
    const calendarForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: calendar.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\PageController::calendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
        calendarForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendar.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\PageController::calendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
        calendarForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: calendar.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    calendar.form = calendarForm
/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
export const show = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/usg/events/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
show.url = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { event: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.slug
                : args.event,
                }

    return show.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
show.get = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
show.head = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
    const showForm = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
        showForm.get = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
        showForm.head = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \Modules\USG\Http\Controllers\PageController::exportMethod
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
export const exportMethod = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/usg/events/{event}/export.ics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::exportMethod
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
exportMethod.url = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { event: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: typeof args.event === 'object'
                ? args.event.slug
                : args.event,
                }

    return exportMethod.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::exportMethod
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
exportMethod.get = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::exportMethod
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
exportMethod.head = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\PageController::exportMethod
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
    const exportMethodForm = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportMethod.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\PageController::exportMethod
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
        exportMethodForm.get = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\PageController::exportMethod
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
        exportMethodForm.head = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportMethod.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportMethod.form = exportMethodForm
const events = {
    index: Object.assign(index, index),
calendar: Object.assign(calendar, calendarFa95d0),
export: Object.assign(exportMethod, exportMethod),
show: Object.assign(show, show),
}

export default events