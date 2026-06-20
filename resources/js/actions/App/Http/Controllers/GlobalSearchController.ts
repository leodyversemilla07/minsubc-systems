import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\GlobalSearchController::search
 * @see app/Http/Controllers/GlobalSearchController.php:12
 * @route '/api/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GlobalSearchController::search
 * @see app/Http/Controllers/GlobalSearchController.php:12
 * @route '/api/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GlobalSearchController::search
 * @see app/Http/Controllers/GlobalSearchController.php:12
 * @route '/api/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GlobalSearchController::search
 * @see app/Http/Controllers/GlobalSearchController.php:12
 * @route '/api/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GlobalSearchController::search
 * @see app/Http/Controllers/GlobalSearchController.php:12
 * @route '/api/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GlobalSearchController::search
 * @see app/Http/Controllers/GlobalSearchController.php:12
 * @route '/api/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GlobalSearchController::search
 * @see app/Http/Controllers/GlobalSearchController.php:12
 * @route '/api/search'
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
const GlobalSearchController = { search }

export default GlobalSearchController