import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library/books',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
export const show = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/library/books/{book}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
show.url = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { book: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { book: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    book: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        book: typeof args.book === 'object'
                ? args.book.id
                : args.book,
                }

    return show.definition.url
            .replace('{book}', parsedArgs.book.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
show.get = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
show.head = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const books = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default books