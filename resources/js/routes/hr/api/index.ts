import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import employees from './employees'
/**
* @see \Modules\HR\Http\Controllers\Admin\DepartmentController::departments
 * @see Modules/HR/app/Http/Controllers/Admin/DepartmentController.php:73
 * @route '/api/hr/departments'
 */
export const departments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: departments.url(options),
    method: 'get',
})

departments.definition = {
    methods: ["get","head"],
    url: '/api/hr/departments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\DepartmentController::departments
 * @see Modules/HR/app/Http/Controllers/Admin/DepartmentController.php:73
 * @route '/api/hr/departments'
 */
departments.url = (options?: RouteQueryOptions) => {
    return departments.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\DepartmentController::departments
 * @see Modules/HR/app/Http/Controllers/Admin/DepartmentController.php:73
 * @route '/api/hr/departments'
 */
departments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: departments.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\DepartmentController::departments
 * @see Modules/HR/app/Http/Controllers/Admin/DepartmentController.php:73
 * @route '/api/hr/departments'
 */
departments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: departments.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\DepartmentController::departments
 * @see Modules/HR/app/Http/Controllers/Admin/DepartmentController.php:73
 * @route '/api/hr/departments'
 */
    const departmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: departments.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\DepartmentController::departments
 * @see Modules/HR/app/Http/Controllers/Admin/DepartmentController.php:73
 * @route '/api/hr/departments'
 */
        departmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: departments.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\DepartmentController::departments
 * @see Modules/HR/app/Http/Controllers/Admin/DepartmentController.php:73
 * @route '/api/hr/departments'
 */
        departmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: departments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    departments.form = departmentsForm
const api = {
    employees: Object.assign(employees, employees),
departments: Object.assign(departments, departments),
}

export default api