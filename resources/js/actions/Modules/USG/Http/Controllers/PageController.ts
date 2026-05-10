import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:35
 * @route '/usg'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:35
 * @route '/usg'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:35
 * @route '/usg'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:35
 * @route '/usg'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::vmgo
 * @see Modules/USG/app/Http/Controllers/PageController.php:70
 * @route '/usg/vmgo'
 */
export const vmgo = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vmgo.url(options),
    method: 'get',
})

vmgo.definition = {
    methods: ["get","head"],
    url: '/usg/vmgo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::vmgo
 * @see Modules/USG/app/Http/Controllers/PageController.php:70
 * @route '/usg/vmgo'
 */
vmgo.url = (options?: RouteQueryOptions) => {
    return vmgo.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::vmgo
 * @see Modules/USG/app/Http/Controllers/PageController.php:70
 * @route '/usg/vmgo'
 */
vmgo.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vmgo.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::vmgo
 * @see Modules/USG/app/Http/Controllers/PageController.php:70
 * @route '/usg/vmgo'
 */
vmgo.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: vmgo.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::officers
 * @see Modules/USG/app/Http/Controllers/PageController.php:83
 * @route '/usg/officers'
 */
export const officers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: officers.url(options),
    method: 'get',
})

officers.definition = {
    methods: ["get","head"],
    url: '/usg/officers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::officers
 * @see Modules/USG/app/Http/Controllers/PageController.php:83
 * @route '/usg/officers'
 */
officers.url = (options?: RouteQueryOptions) => {
    return officers.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::officers
 * @see Modules/USG/app/Http/Controllers/PageController.php:83
 * @route '/usg/officers'
 */
officers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: officers.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::officers
 * @see Modules/USG/app/Http/Controllers/PageController.php:83
 * @route '/usg/officers'
 */
officers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: officers.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::officerShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:107
 * @route '/usg/officers/{id}'
 */
export const officerShow = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: officerShow.url(args, options),
    method: 'get',
})

officerShow.definition = {
    methods: ["get","head"],
    url: '/usg/officers/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::officerShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:107
 * @route '/usg/officers/{id}'
 */
officerShow.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return officerShow.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::officerShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:107
 * @route '/usg/officers/{id}'
 */
officerShow.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: officerShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::officerShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:107
 * @route '/usg/officers/{id}'
 */
officerShow.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: officerShow.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::announcements
 * @see Modules/USG/app/Http/Controllers/PageController.php:126
 * @route '/usg/announcements'
 */
export const announcements = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcements.url(options),
    method: 'get',
})

announcements.definition = {
    methods: ["get","head"],
    url: '/usg/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::announcements
 * @see Modules/USG/app/Http/Controllers/PageController.php:126
 * @route '/usg/announcements'
 */
announcements.url = (options?: RouteQueryOptions) => {
    return announcements.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::announcements
 * @see Modules/USG/app/Http/Controllers/PageController.php:126
 * @route '/usg/announcements'
 */
announcements.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcements.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::announcements
 * @see Modules/USG/app/Http/Controllers/PageController.php:126
 * @route '/usg/announcements'
 */
announcements.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: announcements.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::announcementShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:153
 * @route '/usg/announcements/{announcement}'
 */
export const announcementShow = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcementShow.url(args, options),
    method: 'get',
})

announcementShow.definition = {
    methods: ["get","head"],
    url: '/usg/announcements/{announcement}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::announcementShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:153
 * @route '/usg/announcements/{announcement}'
 */
announcementShow.url = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { announcement: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.slug
                : args.announcement,
                }

    return announcementShow.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::announcementShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:153
 * @route '/usg/announcements/{announcement}'
 */
announcementShow.get = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcementShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::announcementShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:153
 * @route '/usg/announcements/{announcement}'
 */
announcementShow.head = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: announcementShow.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::announcementCategory
 * @see Modules/USG/app/Http/Controllers/PageController.php:172
 * @route '/usg/announcements/category/{category}'
 */
export const announcementCategory = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcementCategory.url(args, options),
    method: 'get',
})

announcementCategory.definition = {
    methods: ["get","head"],
    url: '/usg/announcements/category/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::announcementCategory
 * @see Modules/USG/app/Http/Controllers/PageController.php:172
 * @route '/usg/announcements/category/{category}'
 */
announcementCategory.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: args.category,
                }

    return announcementCategory.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::announcementCategory
 * @see Modules/USG/app/Http/Controllers/PageController.php:172
 * @route '/usg/announcements/category/{category}'
 */
announcementCategory.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcementCategory.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::announcementCategory
 * @see Modules/USG/app/Http/Controllers/PageController.php:172
 * @route '/usg/announcements/category/{category}'
 */
announcementCategory.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: announcementCategory.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::events
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
 */
export const events = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})

events.definition = {
    methods: ["get","head"],
    url: '/usg/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::events
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
 */
events.url = (options?: RouteQueryOptions) => {
    return events.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::events
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
 */
events.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: events.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::events
 * @see Modules/USG/app/Http/Controllers/PageController.php:195
 * @route '/usg/events'
 */
events.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: events.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::eventsCalendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
export const eventsCalendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventsCalendar.url(options),
    method: 'get',
})

eventsCalendar.definition = {
    methods: ["get","head"],
    url: '/usg/events/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::eventsCalendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
eventsCalendar.url = (options?: RouteQueryOptions) => {
    return eventsCalendar.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::eventsCalendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
eventsCalendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventsCalendar.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::eventsCalendar
 * @see Modules/USG/app/Http/Controllers/PageController.php:218
 * @route '/usg/events/calendar'
 */
eventsCalendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventsCalendar.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::eventsExportAllICal
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
export const eventsExportAllICal = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventsExportAllICal.url(options),
    method: 'get',
})

eventsExportAllICal.definition = {
    methods: ["get","head"],
    url: '/usg/events/export/all.ics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::eventsExportAllICal
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
eventsExportAllICal.url = (options?: RouteQueryOptions) => {
    return eventsExportAllICal.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::eventsExportAllICal
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
eventsExportAllICal.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventsExportAllICal.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::eventsExportAllICal
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
eventsExportAllICal.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventsExportAllICal.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::eventShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
export const eventShow = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventShow.url(args, options),
    method: 'get',
})

eventShow.definition = {
    methods: ["get","head"],
    url: '/usg/events/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::eventShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
eventShow.url = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return eventShow.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::eventShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
eventShow.get = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::eventShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:234
 * @route '/usg/events/{event}'
 */
eventShow.head = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventShow.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::eventExportICal
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
export const eventExportICal = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventExportICal.url(args, options),
    method: 'get',
})

eventExportICal.definition = {
    methods: ["get","head"],
    url: '/usg/events/{event}/export.ics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::eventExportICal
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
eventExportICal.url = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
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

    return eventExportICal.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::eventExportICal
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
eventExportICal.get = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventExportICal.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::eventExportICal
 * @see Modules/USG/app/Http/Controllers/PageController.php:263
 * @route '/usg/events/{event}/export.ics'
 */
eventExportICal.head = (args: { event: string | number | { slug: string | number } } | [event: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventExportICal.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::eventsCalendarData
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
export const eventsCalendarData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventsCalendarData.url(options),
    method: 'get',
})

eventsCalendarData.definition = {
    methods: ["get","head"],
    url: '/usg/events/calendar/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::eventsCalendarData
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
eventsCalendarData.url = (options?: RouteQueryOptions) => {
    return eventsCalendarData.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::eventsCalendarData
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
eventsCalendarData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: eventsCalendarData.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::eventsCalendarData
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
eventsCalendarData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: eventsCalendarData.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutions
 * @see Modules/USG/app/Http/Controllers/PageController.php:298
 * @route '/usg/resolutions'
 */
export const resolutions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resolutions.url(options),
    method: 'get',
})

resolutions.definition = {
    methods: ["get","head"],
    url: '/usg/resolutions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutions
 * @see Modules/USG/app/Http/Controllers/PageController.php:298
 * @route '/usg/resolutions'
 */
resolutions.url = (options?: RouteQueryOptions) => {
    return resolutions.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutions
 * @see Modules/USG/app/Http/Controllers/PageController.php:298
 * @route '/usg/resolutions'
 */
resolutions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resolutions.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::resolutions
 * @see Modules/USG/app/Http/Controllers/PageController.php:298
 * @route '/usg/resolutions'
 */
resolutions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resolutions.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:341
 * @route '/usg/resolutions/{resolution}'
 */
export const resolutionShow = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resolutionShow.url(args, options),
    method: 'get',
})

resolutionShow.definition = {
    methods: ["get","head"],
    url: '/usg/resolutions/{resolution}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:341
 * @route '/usg/resolutions/{resolution}'
 */
resolutionShow.url = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resolution: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resolution: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resolution: args.resolution,
                }

    return resolutionShow.definition.url
            .replace('{resolution}', parsedArgs.resolution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:341
 * @route '/usg/resolutions/{resolution}'
 */
resolutionShow.get = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resolutionShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:341
 * @route '/usg/resolutions/{resolution}'
 */
resolutionShow.head = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resolutionShow.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionDownload
 * @see Modules/USG/app/Http/Controllers/PageController.php:357
 * @route '/usg/resolutions/{resolution}/download'
 */
export const resolutionDownload = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resolutionDownload.url(args, options),
    method: 'get',
})

resolutionDownload.definition = {
    methods: ["get","head"],
    url: '/usg/resolutions/{resolution}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionDownload
 * @see Modules/USG/app/Http/Controllers/PageController.php:357
 * @route '/usg/resolutions/{resolution}/download'
 */
resolutionDownload.url = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resolution: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resolution: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resolution: args.resolution,
                }

    return resolutionDownload.definition.url
            .replace('{resolution}', parsedArgs.resolution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionDownload
 * @see Modules/USG/app/Http/Controllers/PageController.php:357
 * @route '/usg/resolutions/{resolution}/download'
 */
resolutionDownload.get = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resolutionDownload.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionDownload
 * @see Modules/USG/app/Http/Controllers/PageController.php:357
 * @route '/usg/resolutions/{resolution}/download'
 */
resolutionDownload.head = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resolutionDownload.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionCategory
 * @see Modules/USG/app/Http/Controllers/PageController.php:375
 * @route '/usg/resolutions/category/{category}'
 */
export const resolutionCategory = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resolutionCategory.url(args, options),
    method: 'get',
})

resolutionCategory.definition = {
    methods: ["get","head"],
    url: '/usg/resolutions/category/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionCategory
 * @see Modules/USG/app/Http/Controllers/PageController.php:375
 * @route '/usg/resolutions/category/{category}'
 */
resolutionCategory.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: args.category,
                }

    return resolutionCategory.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionCategory
 * @see Modules/USG/app/Http/Controllers/PageController.php:375
 * @route '/usg/resolutions/category/{category}'
 */
resolutionCategory.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: resolutionCategory.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::resolutionCategory
 * @see Modules/USG/app/Http/Controllers/PageController.php:375
 * @route '/usg/resolutions/category/{category}'
 */
resolutionCategory.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: resolutionCategory.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::transparency
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
 */
export const transparency = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transparency.url(options),
    method: 'get',
})

transparency.definition = {
    methods: ["get","head"],
    url: '/usg/transparency',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::transparency
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
 */
transparency.url = (options?: RouteQueryOptions) => {
    return transparency.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::transparency
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
 */
transparency.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transparency.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::transparency
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
 */
transparency.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transparency.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::transparencyShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
export const transparencyShow = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transparencyShow.url(args, options),
    method: 'get',
})

transparencyShow.definition = {
    methods: ["get","head"],
    url: '/usg/transparency/{transparencyReport}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::transparencyShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
transparencyShow.url = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transparencyReport: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { transparencyReport: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transparencyReport: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transparencyReport: typeof args.transparencyReport === 'object'
                ? args.transparencyReport.slug
                : args.transparencyReport,
                }

    return transparencyShow.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::transparencyShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
transparencyShow.get = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transparencyShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::transparencyShow
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
transparencyShow.head = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transparencyShow.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::transparencyDownload
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
export const transparencyDownload = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transparencyDownload.url(args, options),
    method: 'get',
})

transparencyDownload.definition = {
    methods: ["get","head"],
    url: '/usg/transparency/{transparencyReport}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::transparencyDownload
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
transparencyDownload.url = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { transparencyReport: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { transparencyReport: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    transparencyReport: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        transparencyReport: typeof args.transparencyReport === 'object'
                ? args.transparencyReport.slug
                : args.transparencyReport,
                }

    return transparencyDownload.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::transparencyDownload
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
transparencyDownload.get = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transparencyDownload.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::transparencyDownload
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
transparencyDownload.head = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transparencyDownload.url(args, options),
    method: 'head',
})
const PageController = { index, vmgo, officers, officerShow, announcements, announcementShow, announcementCategory, events, eventsCalendar, eventsExportAllICal, eventShow, eventExportICal, eventsCalendarData, resolutions, resolutionShow, resolutionDownload, resolutionCategory, transparency, transparencyShow, transparencyDownload }

export default PageController