import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
import exportMethod from './export'
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::data
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:40
 * @route '/admin/analytics/data'
 */
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/admin/analytics/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::data
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:40
 * @route '/admin/analytics/data'
 */
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::data
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:40
 * @route '/admin/analytics/data'
 */
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::data
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:40
 * @route '/admin/analytics/data'
 */
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::dailyCollection
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:53
 * @route '/admin/analytics/daily-collection'
 */
export const dailyCollection = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dailyCollection.url(options),
    method: 'get',
})

dailyCollection.definition = {
    methods: ["get","head"],
    url: '/admin/analytics/daily-collection',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::dailyCollection
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:53
 * @route '/admin/analytics/daily-collection'
 */
dailyCollection.url = (options?: RouteQueryOptions) => {
    return dailyCollection.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::dailyCollection
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:53
 * @route '/admin/analytics/daily-collection'
 */
dailyCollection.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dailyCollection.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::dailyCollection
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:53
 * @route '/admin/analytics/daily-collection'
 */
dailyCollection.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dailyCollection.url(options),
    method: 'head',
})
const analytics = {
    data: Object.assign(data, data),
dailyCollection: Object.assign(dailyCollection, dailyCollection),
export: Object.assign(exportMethod, exportMethod),
}

export default analytics