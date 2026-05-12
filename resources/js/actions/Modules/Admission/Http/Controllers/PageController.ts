import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
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

    /**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
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
const PageController = { index }

export default PageController