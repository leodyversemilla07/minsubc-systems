import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/dormitory/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Dormitory\Http\Controllers\Admin\ReportController::index
 * @see Modules/Dormitory/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/dormitory/reports'
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
const ReportController = { index }

export default ReportController