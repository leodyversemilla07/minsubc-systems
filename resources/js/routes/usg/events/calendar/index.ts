import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\PageController::data
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
export const data = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/usg/events/calendar/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::data
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
data.url = (options?: RouteQueryOptions) => {
    return data.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::data
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
data.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::data
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
data.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(options),
    method: 'head',
})
const calendar = {
    data: Object.assign(data, data),
}

export default calendar