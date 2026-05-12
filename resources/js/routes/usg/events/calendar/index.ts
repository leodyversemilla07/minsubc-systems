import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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

    /**
* @see \Modules\USG\Http\Controllers\PageController::data
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
    const dataForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: data.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\PageController::data
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
        dataForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: data.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\PageController::data
 * @see Modules/USG/app/Http/Controllers/PageController.php:250
 * @route '/usg/events/calendar/data'
 */
        dataForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: data.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    data.form = dataForm
const calendar = {
    data: Object.assign(data, data),
}

export default calendar