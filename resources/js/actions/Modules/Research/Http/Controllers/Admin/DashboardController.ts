import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Research/app/Http/Controllers/Admin/DashboardController.php:12
 * @route '/research/admin/dashboard'
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