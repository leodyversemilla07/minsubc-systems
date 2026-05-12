import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::search
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:118
 * @route '/api/library/books/search'
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

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
    const popularForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: popular.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
        popularForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: popular.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookController::popular
 * @see Modules/Library/app/Http/Controllers/Admin/BookController.php:132
 * @route '/api/library/books/popular'
 */
        popularForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: popular.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    popular.form = popularForm
const books = {
    search: Object.assign(search, search),
popular: Object.assign(popular, popular),
}

export default books