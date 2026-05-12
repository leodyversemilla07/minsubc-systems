import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import books from './books'
import categories from './categories'
import student from './student'
import admin from './admin'
import api from './api'
/**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:17
 * @route '/library'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:17
 * @route '/library'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:17
 * @route '/library'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:17
 * @route '/library'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:17
 * @route '/library'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:17
 * @route '/library'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:17
 * @route '/library'
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
const library = {
    index: Object.assign(index, index),
books: Object.assign(books, books),
categories: Object.assign(categories, categories),
student: Object.assign(student, student),
admin: Object.assign(admin, admin),
api: Object.assign(api, api),
}

export default library