import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:138
 * @route '/api/guidance/slots/available'
 */
export const available = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: available.url(options),
    method: 'get',
})

available.definition = {
    methods: ["get","head"],
    url: '/api/guidance/slots/available',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:138
 * @route '/api/guidance/slots/available'
 */
available.url = (options?: RouteQueryOptions) => {
    return available.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:138
 * @route '/api/guidance/slots/available'
 */
available.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: available.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:138
 * @route '/api/guidance/slots/available'
 */
available.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: available.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:138
 * @route '/api/guidance/slots/available'
 */
    const availableForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: available.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:138
 * @route '/api/guidance/slots/available'
 */
        availableForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: available.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentSlotController::available
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:138
 * @route '/api/guidance/slots/available'
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
const slots = {
    available: Object.assign(available, available),
}

export default slots