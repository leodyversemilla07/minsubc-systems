import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/helpdesk/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\ReportController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/ReportController.php:11
 * @route '/admin/helpdesk/reports'
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