import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const PageController = { index }

export default PageController