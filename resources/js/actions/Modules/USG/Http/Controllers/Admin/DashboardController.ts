import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\DashboardController::index
 * @see Modules/USG/app/Http/Controllers/Admin/DashboardController.php:29
 * @route '/usg/admin'
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