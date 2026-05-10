import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::selectPaymentMethod
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
export const selectPaymentMethod = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectPaymentMethod.url(args, options),
    method: 'get',
})

selectPaymentMethod.definition = {
    methods: ["get","head"],
    url: '/document-requests/{documentRequest}/payment/method',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::selectPaymentMethod
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
selectPaymentMethod.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
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

    return selectPaymentMethod.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::selectPaymentMethod
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
selectPaymentMethod.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selectPaymentMethod.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::selectPaymentMethod
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:31
 * @route '/document-requests/{documentRequest}/payment/method'
 */
selectPaymentMethod.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: selectPaymentMethod.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::generateCashPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:49
 * @route '/document-requests/{documentRequest}/payment/cash'
 */
export const generateCashPayment = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateCashPayment.url(args, options),
    method: 'post',
})

generateCashPayment.definition = {
    methods: ["post"],
    url: '/document-requests/{documentRequest}/payment/cash',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::generateCashPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:49
 * @route '/document-requests/{documentRequest}/payment/cash'
 */
generateCashPayment.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
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

    return generateCashPayment.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::generateCashPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:49
 * @route '/document-requests/{documentRequest}/payment/cash'
 */
generateCashPayment.post = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: generateCashPayment.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::showCashPaymentReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
export const showCashPaymentReference = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showCashPaymentReference.url(args, options),
    method: 'get',
})

showCashPaymentReference.definition = {
    methods: ["get","head"],
    url: '/payments/{payment}/cash-reference',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::showCashPaymentReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
showCashPaymentReference.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showCashPaymentReference.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::showCashPaymentReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
showCashPaymentReference.get = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showCashPaymentReference.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::showCashPaymentReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:106
 * @route '/payments/{payment}/cash-reference'
 */
showCashPaymentReference.head = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showCashPaymentReference.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::paymentSuccess
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
export const paymentSuccess = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentSuccess.url(args, options),
    method: 'get',
})

paymentSuccess.definition = {
    methods: ["get","head"],
    url: '/document-requests/{documentRequest}/payment/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::paymentSuccess
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
paymentSuccess.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
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

    return paymentSuccess.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::paymentSuccess
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
paymentSuccess.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentSuccess.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::paymentSuccess
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:179
 * @route '/document-requests/{documentRequest}/payment/success'
 */
paymentSuccess.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: paymentSuccess.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::showPaymentStatus
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
export const showPaymentStatus = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPaymentStatus.url(args, options),
    method: 'get',
})

showPaymentStatus.definition = {
    methods: ["get","head"],
    url: '/document-requests/{documentRequest}/payment/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::showPaymentStatus
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
showPaymentStatus.url = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions) => {
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

    return showPaymentStatus.definition.url
            .replace('{documentRequest}', parsedArgs.documentRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::showPaymentStatus
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
showPaymentStatus.get = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showPaymentStatus.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::showPaymentStatus
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:128
 * @route '/document-requests/{documentRequest}/payment/status'
 */
showPaymentStatus.head = (args: { documentRequest: string | { request_number: string } } | [documentRequest: string | { request_number: string } ] | string | { request_number: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showPaymentStatus.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashierDashboard
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:138
 * @route '/cashier'
 */
export const cashierDashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cashierDashboard.url(options),
    method: 'get',
})

cashierDashboard.definition = {
    methods: ["get","head"],
    url: '/cashier',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashierDashboard
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:138
 * @route '/cashier'
 */
cashierDashboard.url = (options?: RouteQueryOptions) => {
    return cashierDashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashierDashboard
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:138
 * @route '/cashier'
 */
cashierDashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cashierDashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::cashierDashboard
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:138
 * @route '/cashier'
 */
cashierDashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cashierDashboard.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::verifyPaymentReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:146
 * @route '/cashier/verify-payment'
 */
export const verifyPaymentReference = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyPaymentReference.url(options),
    method: 'post',
})

verifyPaymentReference.definition = {
    methods: ["post"],
    url: '/cashier/verify-payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::verifyPaymentReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:146
 * @route '/cashier/verify-payment'
 */
verifyPaymentReference.url = (options?: RouteQueryOptions) => {
    return verifyPaymentReference.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::verifyPaymentReference
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:146
 * @route '/cashier/verify-payment'
 */
verifyPaymentReference.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyPaymentReference.url(options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::confirmCashPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:200
 * @route '/cashier/confirm-payment'
 */
export const confirmCashPayment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmCashPayment.url(options),
    method: 'post',
})

confirmCashPayment.definition = {
    methods: ["post"],
    url: '/cashier/confirm-payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::confirmCashPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:200
 * @route '/cashier/confirm-payment'
 */
confirmCashPayment.url = (options?: RouteQueryOptions) => {
    return confirmCashPayment.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::confirmCashPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:200
 * @route '/cashier/confirm-payment'
 */
confirmCashPayment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmCashPayment.url(options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::printOfficialReceipt
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:270
 * @route '/cashier/receipt/{payment}'
 */
export const printOfficialReceipt = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: printOfficialReceipt.url(args, options),
    method: 'get',
})

printOfficialReceipt.definition = {
    methods: ["get","head"],
    url: '/cashier/receipt/{payment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::printOfficialReceipt
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:270
 * @route '/cashier/receipt/{payment}'
 */
printOfficialReceipt.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return printOfficialReceipt.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::printOfficialReceipt
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:270
 * @route '/cashier/receipt/{payment}'
 */
printOfficialReceipt.get = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: printOfficialReceipt.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::printOfficialReceipt
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:270
 * @route '/cashier/receipt/{payment}'
 */
printOfficialReceipt.head = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: printOfficialReceipt.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::getReceiptData
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
export const getReceiptData = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReceiptData.url(args, options),
    method: 'get',
})

getReceiptData.definition = {
    methods: ["get","head"],
    url: '/cashier/receipt/{payment}/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::getReceiptData
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
getReceiptData.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getReceiptData.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::getReceiptData
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
getReceiptData.get = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getReceiptData.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::getReceiptData
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
getReceiptData.head = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getReceiptData.url(args, options),
    method: 'head',
})
const PaymentController = { selectPaymentMethod, generateCashPayment, showCashPaymentReference, paymentSuccess, showPaymentStatus, cashierDashboard, verifyPaymentReference, confirmCashPayment, printOfficialReceipt, getReceiptData }

export default PaymentController