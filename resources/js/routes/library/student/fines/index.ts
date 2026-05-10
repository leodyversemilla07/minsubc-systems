import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library/student/fines',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const fines = {
    index: Object.assign(index, index),
}

export default fines