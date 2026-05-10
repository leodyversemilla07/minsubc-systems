import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:32
 * @route '/sas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:32
 * @route '/sas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:32
 * @route '/sas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:32
 * @route '/sas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::organizations
 * @see Modules/SAS/app/Http/Controllers/PageController.php:76
 * @route '/sas/organizations'
 */
export const organizations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organizations.url(options),
    method: 'get',
})

organizations.definition = {
    methods: ["get","head"],
    url: '/sas/organizations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::organizations
 * @see Modules/SAS/app/Http/Controllers/PageController.php:76
 * @route '/sas/organizations'
 */
organizations.url = (options?: RouteQueryOptions) => {
    return organizations.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::organizations
 * @see Modules/SAS/app/Http/Controllers/PageController.php:76
 * @route '/sas/organizations'
 */
organizations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organizations.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::organizations
 * @see Modules/SAS/app/Http/Controllers/PageController.php:76
 * @route '/sas/organizations'
 */
organizations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: organizations.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::organizationShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:116
 * @route '/sas/organizations/{code}'
 */
export const organizationShow = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organizationShow.url(args, options),
    method: 'get',
})

organizationShow.definition = {
    methods: ["get","head"],
    url: '/sas/organizations/{code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::organizationShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:116
 * @route '/sas/organizations/{code}'
 */
organizationShow.url = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        code: args.code,
                }

    return organizationShow.definition.url
            .replace('{code}', parsedArgs.code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::organizationShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:116
 * @route '/sas/organizations/{code}'
 */
organizationShow.get = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: organizationShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::organizationShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:116
 * @route '/sas/organizations/{code}'
 */
organizationShow.head = (args: { code: string | number } | [code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: organizationShow.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::activities
 * @see Modules/SAS/app/Http/Controllers/PageController.php:156
 * @route '/sas/activities'
 */
export const activities = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activities.url(options),
    method: 'get',
})

activities.definition = {
    methods: ["get","head"],
    url: '/sas/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::activities
 * @see Modules/SAS/app/Http/Controllers/PageController.php:156
 * @route '/sas/activities'
 */
activities.url = (options?: RouteQueryOptions) => {
    return activities.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::activities
 * @see Modules/SAS/app/Http/Controllers/PageController.php:156
 * @route '/sas/activities'
 */
activities.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activities.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::activities
 * @see Modules/SAS/app/Http/Controllers/PageController.php:156
 * @route '/sas/activities'
 */
activities.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activities.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::activitiesCalendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:193
 * @route '/sas/activities/calendar'
 */
export const activitiesCalendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activitiesCalendar.url(options),
    method: 'get',
})

activitiesCalendar.definition = {
    methods: ["get","head"],
    url: '/sas/activities/calendar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::activitiesCalendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:193
 * @route '/sas/activities/calendar'
 */
activitiesCalendar.url = (options?: RouteQueryOptions) => {
    return activitiesCalendar.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::activitiesCalendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:193
 * @route '/sas/activities/calendar'
 */
activitiesCalendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activitiesCalendar.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::activitiesCalendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:193
 * @route '/sas/activities/calendar'
 */
activitiesCalendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activitiesCalendar.url(options),
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
* @see \Modules\SAS\Http\Controllers\PageController::exportCalendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:320
 * @route '/sas/activities/export'
 */
export const exportCalendar = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCalendar.url(options),
    method: 'get',
})

exportCalendar.definition = {
    methods: ["get","head"],
    url: '/sas/activities/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportCalendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:320
 * @route '/sas/activities/export'
 */
exportCalendar.url = (options?: RouteQueryOptions) => {
    return exportCalendar.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportCalendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:320
 * @route '/sas/activities/export'
 */
exportCalendar.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportCalendar.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::exportCalendar
 * @see Modules/SAS/app/Http/Controllers/PageController.php:320
 * @route '/sas/activities/export'
 */
exportCalendar.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportCalendar.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::activityShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:277
 * @route '/sas/activities/{slug}'
 */
export const activityShow = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activityShow.url(args, options),
    method: 'get',
})

activityShow.definition = {
    methods: ["get","head"],
    url: '/sas/activities/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::activityShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:277
 * @route '/sas/activities/{slug}'
 */
activityShow.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return activityShow.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::activityShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:277
 * @route '/sas/activities/{slug}'
 */
activityShow.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: activityShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::activityShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:277
 * @route '/sas/activities/{slug}'
 */
activityShow.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: activityShow.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportActivity
 * @see Modules/SAS/app/Http/Controllers/PageController.php:307
 * @route '/sas/activities/{slug}/export'
 */
export const exportActivity = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportActivity.url(args, options),
    method: 'get',
})

exportActivity.definition = {
    methods: ["get","head"],
    url: '/sas/activities/{slug}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportActivity
 * @see Modules/SAS/app/Http/Controllers/PageController.php:307
 * @route '/sas/activities/{slug}/export'
 */
exportActivity.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return exportActivity.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::exportActivity
 * @see Modules/SAS/app/Http/Controllers/PageController.php:307
 * @route '/sas/activities/{slug}/export'
 */
exportActivity.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportActivity.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::exportActivity
 * @see Modules/SAS/app/Http/Controllers/PageController.php:307
 * @route '/sas/activities/{slug}/export'
 */
exportActivity.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportActivity.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::scholarships
 * @see Modules/SAS/app/Http/Controllers/PageController.php:372
 * @route '/sas/scholarships'
 */
export const scholarships = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scholarships.url(options),
    method: 'get',
})

scholarships.definition = {
    methods: ["get","head"],
    url: '/sas/scholarships',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::scholarships
 * @see Modules/SAS/app/Http/Controllers/PageController.php:372
 * @route '/sas/scholarships'
 */
scholarships.url = (options?: RouteQueryOptions) => {
    return scholarships.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::scholarships
 * @see Modules/SAS/app/Http/Controllers/PageController.php:372
 * @route '/sas/scholarships'
 */
scholarships.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scholarships.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::scholarships
 * @see Modules/SAS/app/Http/Controllers/PageController.php:372
 * @route '/sas/scholarships'
 */
scholarships.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: scholarships.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\PageController::scholarshipShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:410
 * @route '/sas/scholarships/{id}'
 */
export const scholarshipShow = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scholarshipShow.url(args, options),
    method: 'get',
})

scholarshipShow.definition = {
    methods: ["get","head"],
    url: '/sas/scholarships/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::scholarshipShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:410
 * @route '/sas/scholarships/{id}'
 */
scholarshipShow.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return scholarshipShow.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::scholarshipShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:410
 * @route '/sas/scholarships/{id}'
 */
scholarshipShow.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scholarshipShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::scholarshipShow
 * @see Modules/SAS/app/Http/Controllers/PageController.php:410
 * @route '/sas/scholarships/{id}'
 */
scholarshipShow.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: scholarshipShow.url(args, options),
    method: 'head',
})
const PageController = { index, organizations, organizationShow, activities, activitiesCalendar, yearlyTimeline, exportCalendar, activityShow, exportActivity, scholarships, scholarshipShow }

export default PageController