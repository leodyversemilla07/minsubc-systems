import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/api/discipline/discipline/offenses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/discipline/discipline/offenses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/api/discipline/discipline/offenses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/api/discipline/discipline/offenses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/api/discipline/discipline/offenses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/api/discipline/discipline/offenses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/api/discipline/discipline/offenses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\OffenseController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/OffenseController.php:11
 * @route '/api/discipline/discipline/offenses'
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
const offenses = {
    index: Object.assign(index, index),
}

export default offenses