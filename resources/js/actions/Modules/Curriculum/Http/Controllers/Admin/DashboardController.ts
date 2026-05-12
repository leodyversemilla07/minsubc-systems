import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/curriculum/admin/dashboard'
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