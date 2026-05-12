import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::method
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
export const method = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: method.url(args, options),
    method: 'get',
})

method.definition = {
    methods: ["get","head"],
    url: '/document-requests/{documentRequest}/payment/method',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::method
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
method.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return method.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::method
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
method.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: method.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::method
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
method.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: method.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::method
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
    const methodForm = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: method.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::method
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
        methodForm.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: method.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::method
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
        methodForm.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: method.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    method.form = methodForm
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cash
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:49
 * @route '/document-requests/{documentRequest}/payment/cash'
 */
export const cash = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cash.url(args, options),
    method: 'post',
})

cash.definition = {
    methods: ["post"],
    url: '/document-requests/{documentRequest}/payment/cash',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cash
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:49
 * @route '/document-requests/{documentRequest}/payment/cash'
 */
cash.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return cash.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cash
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:49
 * @route '/document-requests/{documentRequest}/payment/cash'
 */
cash.post = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cash.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cash
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:49
 * @route '/document-requests/{documentRequest}/payment/cash'
 */
    const cashForm = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cash.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cash
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:49
 * @route '/document-requests/{documentRequest}/payment/cash'
 */
        cashForm.post = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cash.url(args, options),
            method: 'post',
        })
    
    cash.form = cashForm
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
export const cashReference = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cashReference.url(args, options),
    method: 'get',
})

cashReference.definition = {
    methods: ["get","head"],
    url: '/payments/{payment}/cash-reference',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
cashReference.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return cashReference.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
cashReference.get = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cashReference.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
cashReference.head = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cashReference.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
    const cashReferenceForm = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cashReference.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
        cashReferenceForm.get = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cashReference.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
        cashReferenceForm.head = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cashReference.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cashReference.form = cashReferenceForm
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::success
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
export const success = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(args, options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/document-requests/{documentRequest}/payment/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::success
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
success.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return success.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::success
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
success.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::success
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
success.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::success
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
    const successForm = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: success.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::success
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
        successForm.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::success
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
        successForm.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    success.form = successForm
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::status
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
export const status = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/document-requests/{documentRequest}/payment/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::status
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
status.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { documentRequest: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'request_number' in args) {
            args = { documentRequest: args.request_number }
        }
    
    if (Array.isArray(args)) {
        args = {
                    documentRequest: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        documentRequest: typeof args.documentRequest === 'object'
                ? args.documentRequest.request_number
                : args.documentRequest,
                }

    return status.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::status
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
status.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::status
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
status.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::status
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
    const statusForm = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: status.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::status
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
        statusForm.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::status
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
        statusForm.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    status.form = statusForm
const payments = {
    method: Object.assign(method, method),
cash: Object.assign(cash, cash),
cashReference: Object.assign(cashReference, cashReference),
success: Object.assign(success, success),
status: Object.assign(status, status),
}

export default payments