import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \Modules\Library\Http\Controllers\LibraryController::books
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
    const booksForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: books.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\LibraryController::books
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
        booksForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: books.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\LibraryController::books
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
        booksForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: books.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    books.form = booksForm
/**
* @see \Modules\Library\Http\Controllers\LibraryController::bookShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
export const bookShow = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
bookShow.url = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
bookShow.get = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bookShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\LibraryController::bookShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
bookShow.head = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bookShow.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\LibraryController::bookShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
    const bookShowForm = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bookShow.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\LibraryController::bookShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
        bookShowForm.get = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bookShow.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\LibraryController::bookShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
        bookShowForm.head = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bookShow.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bookShow.form = bookShowForm
/**
* @see \Modules\Library\Http\Controllers\LibraryController::categoryShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
export const categoryShow = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
categoryShow.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
categoryShow.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: categoryShow.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\LibraryController::categoryShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
categoryShow.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: categoryShow.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\LibraryController::categoryShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
    const categoryShowForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: categoryShow.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\LibraryController::categoryShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
        categoryShowForm.get = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categoryShow.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\LibraryController::categoryShow
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
        categoryShowForm.head = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: categoryShow.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    categoryShow.form = categoryShowForm
const LibraryController = { index, books, bookShow, categoryShow }

export default LibraryController