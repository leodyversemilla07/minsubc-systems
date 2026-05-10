import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:156
 * @route '/sas/activities'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:156
 * @route '/sas/activities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:156
 * @route '/sas/activities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:156
 * @route '/sas/activities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::calendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:193
 * @route '/sas/activities/calendar'
 */
export const calendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})

calendar.definition = {
    methods: ["get","head"],
    url: '/sas/activities/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::calendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:193
 * @route '/sas/activities/calendar'
 */
calendar.url = (options?: RouteQueryOptions) => {
    return calendar.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::calendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:193
 * @route '/sas/activities/calendar'
 */
calendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calendar.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::calendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:193
 * @route '/sas/activities/calendar'
 */
calendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calendar.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::yearlyTimeline
 * @see Modules/SAS/app/Http/Controllers/PageController.php:222
 * @route '/sas/activities/yearly-timeline'
 */
export const yearlyTimeline = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: yearlyTimeline.url(options),
    method: 'get',
})

yearlyTimeline.definition = {
    methods: ["get","head"],
    url: '/sas/activities/yearly-timeline',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::yearlyTimeline
 * @see Modules/SAS/app/Http/Controllers/PageController.php:222
 * @route '/sas/activities/yearly-timeline'
 */
yearlyTimeline.url = (options?: RouteQueryOptions) => {
    return yearlyTimeline.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::yearlyTimeline
 * @see Modules/SAS/app/Http/Controllers/PageController.php:222
 * @route '/sas/activities/yearly-timeline'
 */
yearlyTimeline.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: yearlyTimeline.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::yearlyTimeline
 * @see Modules/SAS/app/Http/Controllers/PageController.php:222
 * @route '/sas/activities/yearly-timeline'
 */
yearlyTimeline.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: yearlyTimeline.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportMethod
 * @see Modules/SAS/app/Http/Controllers/PageController.php:320
 * @route '/sas/activities/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/sas/activities/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportMethod
 * @see Modules/SAS/app/Http/Controllers/PageController.php:320
 * @route '/sas/activities/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportMethod
 * @see Modules/SAS/app/Http/Controllers/PageController.php:320
 * @route '/sas/activities/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::exportMethod
 * @see Modules/SAS/app/Http/Controllers/PageController.php:320
 * @route '/sas/activities/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::show
 * @see Modules/SAS/app/Http/Controllers/PageController.php:277
 * @route '/sas/activities/{slug}'
 */
export const show = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/activities/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::show
 * @see Modules/SAS/app/Http/Controllers/PageController.php:277
 * @route '/sas/activities/{slug}'
 */
show.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                }

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::show
 * @see Modules/SAS/app/Http/Controllers/PageController.php:277
 * @route '/sas/activities/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::show
 * @see Modules/SAS/app/Http/Controllers/PageController.php:277
 * @route '/sas/activities/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportSingle
 * @see Modules/SAS/app/Http/Controllers/PageController.php:307
 * @route '/sas/activities/{slug}/export'
 */
export const exportSingle = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportSingle.url(args, options),
    method: 'get',
})

exportSingle.definition = {
    methods: ["get","head"],
    url: '/sas/activities/{slug}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportSingle
 * @see Modules/SAS/app/Http/Controllers/PageController.php:307
 * @route '/sas/activities/{slug}/export'
 */
exportSingle.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                }

    return exportSingle.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportSingle
 * @see Modules/SAS/app/Http/Controllers/PageController.php:307
 * @route '/sas/activities/{slug}/export'
 */
exportSingle.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportSingle.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::exportSingle
 * @see Modules/SAS/app/Http/Controllers/PageController.php:307
 * @route '/sas/activities/{slug}/export'
 */
exportSingle.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportSingle.url(args, options),
    method: 'head',
})
const activities = {
    index: Object.assign(index, index),
calendar: Object.assign(calendar, calendar),
yearlyTimeline: Object.assign(yearlyTimeline, yearlyTimeline),
export: Object.assign(exportMethod, exportMethod),
show: Object.assign(show, show),
exportSingle: Object.assign(exportSingle, exportSingle),
}

export default activities