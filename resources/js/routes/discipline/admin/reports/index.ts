import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Discipline\Http\Controllers\Admin\ReportController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/ReportController.php:12
 * @route '/admin/discipline/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\ReportController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/ReportController.php:12
 * @route '/admin/discipline/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\ReportController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/ReportController.php:12
 * @route '/admin/discipline/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\ReportController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/ReportController.php:12
 * @route '/admin/discipline/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\ReportController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/ReportController.php:12
 * @route '/admin/discipline/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\ReportController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/ReportController.php:12
 * @route '/admin/discipline/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\ReportController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/ReportController.php:12
 * @route '/admin/discipline/reports'
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
const reports = {
    index: Object.assign(index, index),
}

export default reports