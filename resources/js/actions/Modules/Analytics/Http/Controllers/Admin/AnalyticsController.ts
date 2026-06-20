import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/analytics/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Analytics\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/Analytics/app/Http/Controllers/Admin/AnalyticsController.php:11
 * @route '/admin/analytics/dashboard'
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
const AnalyticsController = { index }

export default AnalyticsController