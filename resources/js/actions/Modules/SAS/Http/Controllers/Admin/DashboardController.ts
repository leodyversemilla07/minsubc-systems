import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/sas/admin/dashboard'
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
/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
export const statistics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/sas/admin/statistics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
statistics.url = (options?: RouteQueryOptions) => {
    return statistics.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
statistics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
statistics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
    const statisticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: statistics.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
        statisticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statistics.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\DashboardController::statistics
 * @see Modules/SAS/app/Http/Controllers/Admin/DashboardController.php:120
 * @route '/sas/admin/statistics'
 */
        statisticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: statistics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    statistics.form = statisticsForm
const DashboardController = { index, statistics }

export default DashboardController