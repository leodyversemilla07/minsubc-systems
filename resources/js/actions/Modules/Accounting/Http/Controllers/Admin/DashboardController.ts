import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/accounting/admin/dashboard'
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