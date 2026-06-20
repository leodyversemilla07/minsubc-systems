import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alumni/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/alumni/admin'
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