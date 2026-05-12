import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library/student/borrowings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
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
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
export const show = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/library/student/borrowings/{borrowing}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
show.url = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { borrowing: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { borrowing: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    borrowing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        borrowing: typeof args.borrowing === 'object'
                ? args.borrowing.id
                : args.borrowing,
                }

    return show.definition.url
            .replace('{borrowing}', parsedArgs.borrowing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
show.get = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
show.head = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
    const showForm = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
        showForm.get = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
        showForm.head = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const borrowings = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
}

export default borrowings