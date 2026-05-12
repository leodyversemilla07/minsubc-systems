import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::data
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
export const data = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(args, options),
    method: 'get',
})

data.definition = {
    methods: ["get","head"],
    url: '/cashier/receipt/{payment}/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::data
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
data.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return data.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::data
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
data.get = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: data.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\PaymentController::data
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
data.head = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: data.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::data
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
    const dataForm = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: data.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::data
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
        dataForm.get = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: data.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Registrar\Http\Controllers\PaymentController::data
 * @see Modules/Registrar/app/Http/Controllers/PaymentController.php:288
 * @route '/cashier/receipt/{payment}/data'
 */
        dataForm.head = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: data.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    data.form = dataForm
const receipt = {
    data: Object.assign(data, data),
}

export default receipt