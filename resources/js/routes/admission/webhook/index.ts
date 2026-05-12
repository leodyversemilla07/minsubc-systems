import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\PayMongoWebhookController::paymongo
 * @see Modules/Admission/app/Http/Controllers/PayMongoWebhookController.php:20
 * @route '/admission/webhook/paymongo'
 */
export const paymongo = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: paymongo.url(options),
    method: 'post',
})

paymongo.definition = {
    methods: ["post"],
    url: '/admission/webhook/paymongo',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\PayMongoWebhookController::paymongo
 * @see Modules/Admission/app/Http/Controllers/PayMongoWebhookController.php:20
 * @route '/admission/webhook/paymongo'
 */
paymongo.url = (options?: RouteQueryOptions) => {
    return paymongo.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\PayMongoWebhookController::paymongo
 * @see Modules/Admission/app/Http/Controllers/PayMongoWebhookController.php:20
 * @route '/admission/webhook/paymongo'
 */
paymongo.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: paymongo.url(options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\PayMongoWebhookController::paymongo
 * @see Modules/Admission/app/Http/Controllers/PayMongoWebhookController.php:20
 * @route '/admission/webhook/paymongo'
 */
    const paymongoForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: paymongo.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\PayMongoWebhookController::paymongo
 * @see Modules/Admission/app/Http/Controllers/PayMongoWebhookController.php:20
 * @route '/admission/webhook/paymongo'
 */
        paymongoForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: paymongo.url(options),
            method: 'post',
        })
    
    paymongo.form = paymongoForm
const webhook = {
    paymongo: Object.assign(paymongo, paymongo),
}

export default webhook