import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reserve
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:56
 * @route '/library/student/books/{book}/reserve'
 */
export const reserve = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserve.url(args, options),
    method: 'post',
})

reserve.definition = {
    methods: ["post"],
    url: '/library/student/books/{book}/reserve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reserve
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:56
 * @route '/library/student/books/{book}/reserve'
 */
reserve.url = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return reserve.definition.url
            .replace('{book}', parsedArgs.book.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reserve
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:56
 * @route '/library/student/books/{book}/reserve'
 */
reserve.post = (args: { book: string | number | { id: string | number } } | [book: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserve.url(args, options),
    method: 'post',
})
const books = {
    reserve: Object.assign(reserve, reserve),
}

export default books