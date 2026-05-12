import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import my from './my'
import admin from './admin'
import api from './api'
/**
* @see \Modules\Accounting\Http\Controllers\AccountingController::index
 * @see Modules/Accounting/app/Http/Controllers/AccountingController.php:13
 * @route '/accounting'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounting',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\AccountingController::index
 * @see Modules/Accounting/app/Http/Controllers/AccountingController.php:13
 * @route '/accounting'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\AccountingController::index
 * @see Modules/Accounting/app/Http/Controllers/AccountingController.php:13
 * @route '/accounting'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\AccountingController::index
 * @see Modules/Accounting/app/Http/Controllers/AccountingController.php:13
 * @route '/accounting'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\AccountingController::index
 * @see Modules/Accounting/app/Http/Controllers/AccountingController.php:13
 * @route '/accounting'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\AccountingController::index
 * @see Modules/Accounting/app/Http/Controllers/AccountingController.php:13
 * @route '/accounting'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\AccountingController::index
 * @see Modules/Accounting/app/Http/Controllers/AccountingController.php:13
 * @route '/accounting'
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
const accounting = {
    index: Object.assign(index, index),
my: Object.assign(my, my),
admin: Object.assign(admin, admin),
api: Object.assign(api, api),
}

export default accounting