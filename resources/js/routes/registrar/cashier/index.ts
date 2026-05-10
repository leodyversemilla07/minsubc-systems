import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import receipt24fea0 from './receipt'
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:138
 * @route '/cashier'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/cashier',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:138
 * @route '/cashier'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:138
 * @route '/cashier'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::dashboard
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:138
 * @route '/cashier'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::verifyPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:146
 * @route '/cashier/verify-payment'
 */
export const verifyPayment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyPayment.url(options),
    method: 'post',
})

verifyPayment.definition = {
    methods: ["post"],
    url: '/cashier/verify-payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::verifyPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:146
 * @route '/cashier/verify-payment'
 */
verifyPayment.url = (options?: RouteQueryOptions) => {
    return verifyPayment.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::verifyPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:146
 * @route '/cashier/verify-payment'
 */
verifyPayment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyPayment.url(options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::confirmPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:200
 * @route '/cashier/confirm-payment'
 */
export const confirmPayment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmPayment.url(options),
    method: 'post',
})

confirmPayment.definition = {
    methods: ["post"],
    url: '/cashier/confirm-payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::confirmPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:200
 * @route '/cashier/confirm-payment'
 */
confirmPayment.url = (options?: RouteQueryOptions) => {
    return confirmPayment.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::confirmPayment
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:200
 * @route '/cashier/confirm-payment'
 */
confirmPayment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmPayment.url(options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::receipt
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:270
 * @route '/cashier/receipt/{payment}'
 */
export const receipt = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})

receipt.definition = {
    methods: ["get","head"],
    url: '/cashier/receipt/{payment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::receipt
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:270
 * @route '/cashier/receipt/{payment}'
 */
receipt.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return receipt.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::receipt
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:270
 * @route '/cashier/receipt/{payment}'
 */
receipt.get = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::receipt
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:270
 * @route '/cashier/receipt/{payment}'
 */
receipt.head = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: receipt.url(args, options),
    method: 'head',
})
const cashier = {
    dashboard: Object.assign(dashboard, dashboard),
verifyPayment: Object.assign(verifyPayment, verifyPayment),
confirmPayment: Object.assign(confirmPayment, confirmPayment),
receipt: Object.assign(receipt, receipt24fea0),
}

export default cashier