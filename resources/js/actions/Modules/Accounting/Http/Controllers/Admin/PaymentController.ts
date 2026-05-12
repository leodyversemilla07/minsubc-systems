import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:18
 * @route '/accounting/admin/payments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/payments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:18
 * @route '/accounting/admin/payments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:18
 * @route '/accounting/admin/payments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:18
 * @route '/accounting/admin/payments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:18
 * @route '/accounting/admin/payments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:18
 * @route '/accounting/admin/payments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:18
 * @route '/accounting/admin/payments'
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
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:32
 * @route '/accounting/admin/payments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/payments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:32
 * @route '/accounting/admin/payments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:32
 * @route '/accounting/admin/payments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:32
 * @route '/accounting/admin/payments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:32
 * @route '/accounting/admin/payments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:32
 * @route '/accounting/admin/payments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:32
 * @route '/accounting/admin/payments/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:37
 * @route '/accounting/admin/payments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/accounting/admin/payments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:37
 * @route '/accounting/admin/payments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:37
 * @route '/accounting/admin/payments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:37
 * @route '/accounting/admin/payments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:37
 * @route '/accounting/admin/payments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:53
 * @route '/accounting/admin/payments/{payment}'
 */
export const show = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/payments/{payment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:53
 * @route '/accounting/admin/payments/{payment}'
 */
show.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return show.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:53
 * @route '/accounting/admin/payments/{payment}'
 */
show.get = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:53
 * @route '/accounting/admin/payments/{payment}'
 */
show.head = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:53
 * @route '/accounting/admin/payments/{payment}'
 */
    const showForm = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:53
 * @route '/accounting/admin/payments/{payment}'
 */
        showForm.get = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:53
 * @route '/accounting/admin/payments/{payment}'
 */
        showForm.head = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::receipt
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/receipt'
 */
export const receipt = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})

receipt.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/payments/{payment}/receipt',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::receipt
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/receipt'
 */
receipt.url = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: args.payment,
                }

    return receipt.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::receipt
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/receipt'
 */
receipt.get = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::receipt
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/receipt'
 */
receipt.head = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: receipt.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::receipt
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/receipt'
 */
    const receiptForm = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: receipt.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::receipt
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/receipt'
 */
        receiptForm.get = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::receipt
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/receipt'
 */
        receiptForm.head = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    receipt.form = receiptForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::refund
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/refund'
 */
export const refund = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refund.url(args, options),
    method: 'post',
})

refund.definition = {
    methods: ["post"],
    url: '/accounting/admin/payments/{payment}/refund',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::refund
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/refund'
 */
refund.url = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: args.payment,
                }

    return refund.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::refund
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/refund'
 */
refund.post = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refund.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::refund
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/refund'
 */
    const refundForm = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: refund.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\PaymentController::refund
 * @see Modules/Accounting/app/Http/Controllers/Admin/PaymentController.php:0
 * @route '/accounting/admin/payments/{payment}/refund'
 */
        refundForm.post = (args: { payment: string | number } | [payment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: refund.url(args, options),
            method: 'post',
        })
    
    refund.form = refundForm
const PaymentController = { index, create, store, show, receipt, refund }

export default PaymentController