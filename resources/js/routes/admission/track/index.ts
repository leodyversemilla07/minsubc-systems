import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::lookup
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:120
 * @route '/admission/track'
 */
export const lookup = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lookup.url(options),
    method: 'post',
})

lookup.definition = {
    methods: ["post"],
    url: '/admission/track',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::lookup
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:120
 * @route '/admission/track'
 */
lookup.url = (options?: RouteQueryOptions) => {
    return lookup.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::lookup
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:120
 * @route '/admission/track'
 */
lookup.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lookup.url(options),
    method: 'post',
})
const track = {
    lookup: Object.assign(lookup, lookup),
}

export default track