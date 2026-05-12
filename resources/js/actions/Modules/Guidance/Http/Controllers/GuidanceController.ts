import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\GuidanceController::index
 * @see Modules/Guidance/app/Http/Controllers/GuidanceController.php:13
 * @route '/guidance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\GuidanceController::index
 * @see Modules/Guidance/app/Http/Controllers/GuidanceController.php:13
 * @route '/guidance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\GuidanceController::index
 * @see Modules/Guidance/app/Http/Controllers/GuidanceController.php:13
 * @route '/guidance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\GuidanceController::index
 * @see Modules/Guidance/app/Http/Controllers/GuidanceController.php:13
 * @route '/guidance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\GuidanceController::index
 * @see Modules/Guidance/app/Http/Controllers/GuidanceController.php:13
 * @route '/guidance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\GuidanceController::index
 * @see Modules/Guidance/app/Http/Controllers/GuidanceController.php:13
 * @route '/guidance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\GuidanceController::index
 * @see Modules/Guidance/app/Http/Controllers/GuidanceController.php:13
 * @route '/guidance'
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
const GuidanceController = { index }

export default GuidanceController