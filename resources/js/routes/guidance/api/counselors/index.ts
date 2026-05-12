import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
export const available = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: available.url(options),
    method: 'get',
})

available.definition = {
    methods: ["get","head"],
    url: '/api/guidance/counselors/available',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
available.url = (options?: RouteQueryOptions) => {
    return available.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
available.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: available.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
available.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: available.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
    const availableForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: available.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
        availableForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: available.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselorController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:90
 * @route '/api/guidance/counselors/available'
 */
        availableForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: available.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    available.form = availableForm
const counselors = {
    available: Object.assign(available, available),
}

export default counselors