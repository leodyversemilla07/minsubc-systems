import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/facilities/facilities/facilities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
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
const facilities = {
    index: Object.assign(index, index),
}

export default facilities