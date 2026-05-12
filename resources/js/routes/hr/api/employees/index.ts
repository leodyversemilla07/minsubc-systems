import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/hr/employees/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\EmployeeController::search
 * @see Modules/HR/app/Http/Controllers/Admin/EmployeeController.php:127
 * @route '/api/hr/employees/search'
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
const employees = {
    search: Object.assign(search, search),
}

export default employees