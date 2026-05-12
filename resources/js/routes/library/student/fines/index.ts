import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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

    /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
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
const fines = {
    index: Object.assign(index, index),
}

export default fines