import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import books from './books'
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::categories
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
export const categories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})

categories.definition = {
    methods: ["get","head"],
    url: '/api/library/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::categories
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
categories.url = (options?: RouteQueryOptions) => {
    return categories.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::categories
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
categories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categories.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::categories
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
categories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categories.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::categories
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
    const categoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categories.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::categories
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
        categoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\BookCategoryController::categories
 * @see Modules/Library/app/Http/Controllers/Admin/BookCategoryController.php:68
 * @route '/api/library/categories'
 */
        categoriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categories.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    categories.form = categoriesForm
const api = {
    books: Object.assign(books, books),
categories: Object.assign(categories, categories),
}

export default api