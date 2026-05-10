import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:70
 * @route '/usg/vmgo'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/usg/vmgo',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:70
 * @route '/usg/vmgo'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:70
 * @route '/usg/vmgo'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::show
 * @see Modules/USG/app/Http/Controllers/PageController.php:70
 * @route '/usg/vmgo'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})
const vmgo = {
    show: Object.assign(show, show),
}

export default vmgo