import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\PageController::all
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
export const all = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})

all.definition = {
    methods: ["get","head"],
    url: '/usg/events/export/all.ics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\PageController::all
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
all.url = (options?: RouteQueryOptions) => {
    return all.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\PageController::all
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
all.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: all.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\PageController::all
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
all.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: all.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\PageController::all
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
    const allForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: all.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\PageController::all
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
        allForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: all.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\PageController::all
 * @see Modules/USG/app/Http/Controllers/PageController.php:282
 * @route '/usg/events/export/all.ics'
 */
        allForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: all.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    all.form = allForm