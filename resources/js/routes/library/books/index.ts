import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\LibraryController::index
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:26
 * @route '/library/books'
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
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
export const show = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
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
show.url = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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
show.get = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
show.head = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
    const showForm = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
        showForm.get = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:46
 * @route '/library/books/{book}'
 */
        showForm.head = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const books = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default books