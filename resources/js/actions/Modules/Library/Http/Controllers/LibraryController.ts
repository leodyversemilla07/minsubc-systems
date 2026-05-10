import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \Modules\Library\Http\Controllers\LibraryController::books
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
export const books = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: books.url(options),
    method: 'get',
})

books.definition = {
    methods: ["get","head"],
    url: '/library/books',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\LibraryController::books
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
books.url = (options?: RouteQueryOptions) => {
    return books.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\LibraryController::books
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
books.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: books.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\LibraryController::books
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
books.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: books.url(options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\LibraryController::bookShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
export const bookShow = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bookShow.url(args, options),
    method: 'get',
})

bookShow.definition = {
    methods: ["get","head"],
    url: '/library/books/{book}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\LibraryController::bookShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
bookShow.url = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return bookShow.definition.url
            .replace('{book}', parsedArgs.book.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\LibraryController::bookShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
bookShow.get = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bookShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\LibraryController::bookShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
bookShow.head = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bookShow.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Library\Http\Controllers\LibraryController::categoryShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
export const categoryShow = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categoryShow.url(args, options),
    method: 'get',
})

categoryShow.definition = {
    methods: ["get","head"],
    url: '/library/categories/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\LibraryController::categoryShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
categoryShow.url = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return categoryShow.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\LibraryController::categoryShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
categoryShow.get = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categoryShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\LibraryController::categoryShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
categoryShow.head = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categoryShow.url(args, options),
    method: 'head',
})
const LibraryController = { index, books, bookShow, categoryShow }

export default LibraryController