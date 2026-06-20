import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/facilities/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/facilities/dashboard'
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