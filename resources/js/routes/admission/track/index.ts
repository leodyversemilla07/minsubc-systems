import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
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

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::lookup
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:120
 * @route '/admission/track'
 */
    const lookupForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lookup.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::lookup
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:120
 * @route '/admission/track'
 */
        lookupForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lookup.url(options),
            method: 'post',
        })
    
    lookup.form = lookupForm
const track = {
    lookup: Object.assign(lookup, lookup),
}

export default track