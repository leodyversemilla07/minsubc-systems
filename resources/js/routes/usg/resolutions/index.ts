import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:298
 * @route '/usg/resolutions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/resolutions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:298
 * @route '/usg/resolutions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:298
 * @route '/usg/resolutions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:298
 * @route '/usg/resolutions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:341
 * @route '/usg/resolutions/{resolution}'
 */
export const show = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/usg/resolutions/{resolution}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:341
 * @route '/usg/resolutions/{resolution}'
 */
show.url = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{resolution}', parsedArgs.resolution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:341
 * @route '/usg/resolutions/{resolution}'
 */
show.get = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:341
 * @route '/usg/resolutions/{resolution}'
 */
show.head = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:357
 * @route '/usg/resolutions/{resolution}/download'
 */
export const download = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/usg/resolutions/{resolution}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:357
 * @route '/usg/resolutions/{resolution}/download'
 */
download.url = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{resolution}', parsedArgs.resolution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:357
 * @route '/usg/resolutions/{resolution}/download'
 */
download.get = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::download
 * @see Modules/USG/app/Http/Controllers/PageController.php:357
 * @route '/usg/resolutions/{resolution}/download'
 */
download.head = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\PageController::category
 * @see Modules/USG/app/Http/Controllers/PageController.php:375
 * @route '/usg/resolutions/category/{category}'
 */
export const category = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: category.url(args, options),
    method: 'get',
})

category.definition = {
    methods: ["get","head"],
    url: '/usg/resolutions/category/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::category
 * @see Modules/USG/app/Http/Controllers/PageController.php:375
 * @route '/usg/resolutions/category/{category}'
 */
category.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return category.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::category
 * @see Modules/USG/app/Http/Controllers/PageController.php:375
 * @route '/usg/resolutions/category/{category}'
 */
category.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: category.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::category
 * @see Modules/USG/app/Http/Controllers/PageController.php:375
 * @route '/usg/resolutions/category/{category}'
 */
category.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: category.url(args, options),
    method: 'head',
})
const resolutions = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
download: Object.assign(download, download),
category: Object.assign(category, category),
}

export default resolutions