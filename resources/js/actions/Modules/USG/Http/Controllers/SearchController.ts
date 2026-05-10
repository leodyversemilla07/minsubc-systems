import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\SearchController::index
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\SearchController::index
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\SearchController::index
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\SearchController::index
 * @see Modules/USG/app/Http/Controllers/SearchController.php:21
 * @route '/usg/search'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
export const suggestions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suggestions.url(options),
    method: 'get',
})

suggestions.definition = {
    methods: ["get","head"],
    url: '/usg/search/suggestions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
suggestions.url = (options?: RouteQueryOptions) => {
    return suggestions.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
suggestions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suggestions.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
suggestions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: suggestions.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\SearchController::quickSearch
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
export const quickSearch = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: quickSearch.url(options),
    method: 'get',
})

quickSearch.definition = {
    methods: ["get","head"],
    url: '/usg/search/quick',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\SearchController::quickSearch
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
quickSearch.url = (options?: RouteQueryOptions) => {
    return quickSearch.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\SearchController::quickSearch
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
quickSearch.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: quickSearch.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\SearchController::quickSearch
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
quickSearch.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: quickSearch.url(options),
    method: 'head',
})
const SearchController = { index, suggestions, quickSearch }

export default SearchController