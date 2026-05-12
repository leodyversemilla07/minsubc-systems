import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::confirmation
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:223
 * @route '/voting/confirmation'
 */
export const confirmation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})

confirmation.definition = {
    methods: ["get","head"],
    url: '/voting/confirmation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::confirmation
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:223
 * @route '/voting/confirmation'
 */
confirmation.url = (options?: RouteQueryOptions) => {
    return confirmation.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::confirmation
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:223
 * @route '/voting/confirmation'
 */
confirmation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::confirmation
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:223
 * @route '/voting/confirmation'
 */
confirmation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmation.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::confirmation
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:223
 * @route '/voting/confirmation'
 */
    const confirmationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: confirmation.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::confirmation
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:223
 * @route '/voting/confirmation'
 */
        confirmationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirmation.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::confirmation
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:223
 * @route '/voting/confirmation'
 */
        confirmationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: confirmation.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    confirmation.form = confirmationForm
/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::receipt
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:250
 * @route '/voting/receipt'
 */
export const receipt = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(options),
    method: 'get',
})

receipt.definition = {
    methods: ["get","head"],
    url: '/voting/receipt',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::receipt
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:250
 * @route '/voting/receipt'
 */
receipt.url = (options?: RouteQueryOptions) => {
    return receipt.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::receipt
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:250
 * @route '/voting/receipt'
 */
receipt.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: receipt.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::receipt
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:250
 * @route '/voting/receipt'
 */
receipt.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: receipt.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::receipt
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:250
 * @route '/voting/receipt'
 */
    const receiptForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: receipt.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::receipt
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:250
 * @route '/voting/receipt'
 */
        receiptForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::receipt
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:250
 * @route '/voting/receipt'
 */
        receiptForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: receipt.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    receipt.form = receiptForm
/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::show
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/voting/ballot',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::show
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::show
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::show
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::show
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::show
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::show
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::preview
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:50
 * @route '/voting/preview'
 */
export const preview = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

preview.definition = {
    methods: ["post"],
    url: '/voting/preview',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::preview
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:50
 * @route '/voting/preview'
 */
preview.url = (options?: RouteQueryOptions) => {
    return preview.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::preview
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:50
 * @route '/voting/preview'
 */
preview.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: preview.url(options),
    method: 'post',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::preview
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:50
 * @route '/voting/preview'
 */
    const previewForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: preview.url(options),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::preview
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:50
 * @route '/voting/preview'
 */
        previewForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: preview.url(options),
            method: 'post',
        })
    
    preview.form = previewForm
/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::submit
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:105
 * @route '/voting/vote'
 */
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/voting/vote',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::submit
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:105
 * @route '/voting/vote'
 */
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::submit
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:105
 * @route '/voting/vote'
 */
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::submit
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:105
 * @route '/voting/vote'
 */
    const submitForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(options),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::submit
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:105
 * @route '/voting/vote'
 */
        submitForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(options),
            method: 'post',
        })
    
    submit.form = submitForm
const BallotController = { confirmation, receipt, show, preview, submit }

export default BallotController