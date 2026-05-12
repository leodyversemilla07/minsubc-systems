import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import students from './students'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::feeItems
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
export const feeItems = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: feeItems.url(options),
    method: 'get',
})

feeItems.definition = {
    methods: ["get","head"],
    url: '/api/accounting/fee-items',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::feeItems
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
feeItems.url = (options?: RouteQueryOptions) => {
    return feeItems.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::feeItems
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
feeItems.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: feeItems.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::feeItems
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
feeItems.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: feeItems.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::feeItems
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
    const feeItemsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: feeItems.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::feeItems
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
        feeItemsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: feeItems.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\FeeItemController::feeItems
 * @see Modules/Accounting/app/Http/Controllers/Admin/FeeItemController.php:69
 * @route '/api/accounting/fee-items'
 */
        feeItemsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: feeItems.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    feeItems.form = feeItemsForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::chartAccounts
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
export const chartAccounts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: chartAccounts.url(options),
    method: 'get',
})

chartAccounts.definition = {
    methods: ["get","head"],
    url: '/api/accounting/chart-accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::chartAccounts
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
chartAccounts.url = (options?: RouteQueryOptions) => {
    return chartAccounts.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::chartAccounts
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
chartAccounts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: chartAccounts.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::chartAccounts
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
chartAccounts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: chartAccounts.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::chartAccounts
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
    const chartAccountsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: chartAccounts.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::chartAccounts
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
        chartAccountsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: chartAccounts.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::chartAccounts
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
        chartAccountsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: chartAccounts.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    chartAccounts.form = chartAccountsForm
const api = {
    students: Object.assign(students, students),
feeItems: Object.assign(feeItems, feeItems),
chartAccounts: Object.assign(chartAccounts, chartAccounts),
}

export default api