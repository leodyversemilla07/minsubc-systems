import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\PayMongoWebhookController::handle
 * @see Modules/Admission/app/Http/Controllers/PayMongoWebhookController.php:20
 * @route '/admission/webhook/paymongo'
 */
export const handle = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

handle.definition = {
    methods: ["post"],
    url: '/admission/webhook/paymongo',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\PayMongoWebhookController::handle
 * @see Modules/Admission/app/Http/Controllers/PayMongoWebhookController.php:20
 * @route '/admission/webhook/paymongo'
 */
handle.url = (options?: RouteQueryOptions) => {
    return handle.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\PayMongoWebhookController::handle
 * @see Modules/Admission/app/Http/Controllers/PayMongoWebhookController.php:20
 * @route '/admission/webhook/paymongo'
 */
handle.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})
const PayMongoWebhookController = { handle }

export default PayMongoWebhookController