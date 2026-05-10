import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/library/books/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
export const popular = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: popular.url(options),
    method: 'get',
})

popular.definition = {
    methods: ["get","head"],
    url: '/api/library/books/popular',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
popular.url = (options?: RouteQueryOptions) => {
    return popular.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
popular.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: popular.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
popular.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: popular.url(options),
    method: 'head',
})
const books = {
    search: Object.assign(search, search),
popular: Object.assign(popular, popular),
}

export default books