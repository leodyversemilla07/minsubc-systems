import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import vmgo from './vmgo'
import officers from './officers'
import announcements from './announcements'
import events from './events'
import resolutions from './resolutions'
import transparency from './transparency'
import searchD2f59a from './search'
import admin from './admin'
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
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:35
 * @route '/usg'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:35
 * @route '/usg'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\PageController::index
 * @see Modules/USG/app/Http/Controllers/PageController.php:35
 * @route '/usg'
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
* @see \Modules\USG\Http\Controllers\SearchController::search
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/usg/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\SearchController::search
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\SearchController::search
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\SearchController::search
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\SearchController::search
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\SearchController::search
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\SearchController::search
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
const usg = {
    index: Object.assign(index, index),
vmgo: Object.assign(vmgo, vmgo),
officers: Object.assign(officers, officers),
announcements: Object.assign(announcements, announcements),
events: Object.assign(events, events),
resolutions: Object.assign(resolutions, resolutions),
transparency: Object.assign(transparency, transparency),
search: Object.assign(search, searchD2f59a),
admin: Object.assign(admin, admin),
}

export default usg