import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::search
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/accounting/students/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::search
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::search
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::search
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::search
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::search
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::search
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
const students = {
    search: Object.assign(search, search),
}

export default students