import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/transparency',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:398
 * @route '/usg/transparency'
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
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
export const show = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/usg/transparency/{transparencyReport}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
show.url = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
show.get = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
show.head = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
    const showForm = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
        showForm.get = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:464
 * @route '/usg/transparency/{transparencyReport}'
 */
        showForm.head = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
export const download = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/usg/transparency/{transparencyReport}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
download.url = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{transparencyReport}', parsedArgs.transparencyReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
download.get = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
download.head = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
    const downloadForm = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
        downloadForm.get = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:484
 * @route '/usg/transparency/{transparencyReport}/download'
 */
        downloadForm.head = (args: { transparencyReport: string | { slug: string } } | [transparencyReport: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const transparency = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
download: Object.assign(download, download),
}

export default transparency