import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/clinic/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
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
const ClinicDashboardController = { index }

export default ClinicDashboardController