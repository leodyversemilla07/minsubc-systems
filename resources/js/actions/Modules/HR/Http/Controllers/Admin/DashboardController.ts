import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::index
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::index
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::index
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::index
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::index
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::index
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Admin\DashboardController::index
 * @see Modules/HR/app/Http/Controllers/Admin/DashboardController.php:14
 * @route '/hr/admin/dashboard'
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
const DashboardController = { index }

export default DashboardController