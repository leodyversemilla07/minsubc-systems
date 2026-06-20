import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Scheduling\Http\Controllers\Admin\EventController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/EventController.php:11
 * @route '/api/scheduling/scheduling/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/scheduling/scheduling/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\EventController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/EventController.php:11
 * @route '/api/scheduling/scheduling/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\EventController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/EventController.php:11
 * @route '/api/scheduling/scheduling/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Scheduling\Http\Controllers\Admin\EventController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/EventController.php:11
 * @route '/api/scheduling/scheduling/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Scheduling\Http\Controllers\Admin\EventController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/EventController.php:11
 * @route '/api/scheduling/scheduling/events'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Scheduling\Http\Controllers\Admin\EventController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/EventController.php:11
 * @route '/api/scheduling/scheduling/events'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Scheduling\Http\Controllers\Admin\EventController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/EventController.php:11
 * @route '/api/scheduling/scheduling/events'
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
const events = {
    index: Object.assign(index, index),
}

export default events