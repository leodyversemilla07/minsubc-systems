import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:13
 * @route '/accounting/admin/chart-accounts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/chart-accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:13
 * @route '/accounting/admin/chart-accounts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:13
 * @route '/accounting/admin/chart-accounts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:13
 * @route '/accounting/admin/chart-accounts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:13
 * @route '/accounting/admin/chart-accounts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:13
 * @route '/accounting/admin/chart-accounts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:13
 * @route '/accounting/admin/chart-accounts'
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
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:19
 * @route '/accounting/admin/chart-accounts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/accounting/admin/chart-accounts',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:19
 * @route '/accounting/admin/chart-accounts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:19
 * @route '/accounting/admin/chart-accounts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:19
 * @route '/accounting/admin/chart-accounts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:19
 * @route '/accounting/admin/chart-accounts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:31
 * @route '/accounting/admin/chart-accounts/{chartAccount}'
 */
export const update = (args: { chartAccount: number | { id: number } } | [chartAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/accounting/admin/chart-accounts/{chartAccount}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:31
 * @route '/accounting/admin/chart-accounts/{chartAccount}'
 */
update.url = (args: { chartAccount: number | { id: number } } | [chartAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { chartAccount: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { chartAccount: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    chartAccount: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        chartAccount: typeof args.chartAccount === 'object'
                ? args.chartAccount.id
                : args.chartAccount,
                }

    return update.definition.url
            .replace('{chartAccount}', parsedArgs.chartAccount.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:31
 * @route '/accounting/admin/chart-accounts/{chartAccount}'
 */
update.put = (args: { chartAccount: number | { id: number } } | [chartAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:31
 * @route '/accounting/admin/chart-accounts/{chartAccount}'
 */
    const updateForm = (args: { chartAccount: number | { id: number } } | [chartAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:31
 * @route '/accounting/admin/chart-accounts/{chartAccount}'
 */
        updateForm.put = (args: { chartAccount: number | { id: number } } | [chartAccount: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/api/accounting/chart-accounts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ChartAccountController::list
 * @see Modules/Accounting/app/Http/Controllers/Admin/ChartAccountController.php:43
 * @route '/api/accounting/chart-accounts'
 */
        listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    list.form = listForm
const ChartAccountController = { index, store, update, list }

export default ChartAccountController