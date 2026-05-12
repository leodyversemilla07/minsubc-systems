import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
export const suggestions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suggestions.url(options),
    method: 'get',
})

suggestions.definition = {
    methods: ["get","head"],
    url: '/usg/search/suggestions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
suggestions.url = (options?: RouteQueryOptions) => {
    return suggestions.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
suggestions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: suggestions.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
suggestions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: suggestions.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
    const suggestionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: suggestions.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
        suggestionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: suggestions.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\SearchController::suggestions
 * @see Modules/USG/app/Http/Controllers/SearchController.php:49
 * @route '/usg/search/suggestions'
 */
        suggestionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: suggestions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    suggestions.form = suggestionsForm
/**
* @see \Modules\USG\Http\Controllers\SearchController::quick
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
export const quick = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: quick.url(options),
    method: 'get',
})

quick.definition = {
    methods: ["get","head"],
    url: '/usg/search/quick',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\SearchController::quick
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
quick.url = (options?: RouteQueryOptions) => {
    return quick.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\SearchController::quick
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
quick.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: quick.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\SearchController::quick
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
quick.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: quick.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\SearchController::quick
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
    const quickForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: quick.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\SearchController::quick
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
        quickForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: quick.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\SearchController::quick
 * @see Modules/USG/app/Http/Controllers/SearchController.php:65
 * @route '/usg/search/quick'
 */
        quickForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: quick.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    quick.form = quickForm
const search = {
    suggestions: Object.assign(suggestions, suggestions),
quick: Object.assign(quick, quick),
}

export default search