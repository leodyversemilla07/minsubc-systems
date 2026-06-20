import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/DashboardController.php:13
 * @route '/admin/discipline/dashboard'
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