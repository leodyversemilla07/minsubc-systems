import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import feedback from './feedback'
import admin from './admin'
/**
 * @see Modules/VotingSystem/routes/web.php:32
 * @route '/voting'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see Modules/VotingSystem/routes/web.php:32
 * @route '/voting'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see Modules/VotingSystem/routes/web.php:32
 * @route '/voting'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
 * @see Modules/VotingSystem/routes/web.php:32
 * @route '/voting'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
 * @see Modules/VotingSystem/routes/web.php:32
 * @route '/voting'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
 * @see Modules/VotingSystem/routes/web.php:32
 * @route '/voting'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
 * @see Modules/VotingSystem/routes/web.php:32
 * @route '/voting'
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
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/voting/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::authenticate
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:83
 * @route '/voting/authenticate'
 */
export const authenticate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(options),
    method: 'post',
})

authenticate.definition = {
    methods: ["post"],
    url: '/voting/authenticate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::authenticate
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:83
 * @route '/voting/authenticate'
 */
authenticate.url = (options?: RouteQueryOptions) => {
    return authenticate.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::authenticate
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:83
 * @route '/voting/authenticate'
 */
authenticate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: authenticate.url(options),
    method: 'post',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::authenticate
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:83
 * @route '/voting/authenticate'
 */
    const authenticateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: authenticate.url(options),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::authenticate
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:83
 * @route '/voting/authenticate'
 */
        authenticateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: authenticate.url(options),
            method: 'post',
        })
    
    authenticate.form = authenticateForm
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
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::results
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
export const results = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: results.url(args, options),
    method: 'get',
})

results.definition = {
    methods: ["get","head"],
    url: '/voting/results/{election}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::results
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
results.url = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { election: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    election: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        election: args.election,
                }

    return results.definition.url
            .replace('{election}', parsedArgs.election.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::results
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
results.get = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: results.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::results
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
results.head = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: results.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::results
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
    const resultsForm = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: results.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::results
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
        resultsForm.get = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: results.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::results
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
        resultsForm.head = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: results.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    results.form = resultsForm
/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::ballot
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
export const ballot = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ballot.url(options),
    method: 'get',
})

ballot.definition = {
    methods: ["get","head"],
    url: '/voting/ballot',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::ballot
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
ballot.url = (options?: RouteQueryOptions) => {
    return ballot.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::ballot
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
ballot.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ballot.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::ballot
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
ballot.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ballot.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::ballot
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
    const ballotForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ballot.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::ballot
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
        ballotForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ballot.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\BallotController::ballot
 * @see Modules/VotingSystem/app/Http/Controllers/BallotController.php:21
 * @route '/voting/ballot'
 */
        ballotForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ballot.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ballot.form = ballotForm
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
/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::logout
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:266
 * @route '/voting/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/voting/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::logout
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:266
 * @route '/voting/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::logout
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:266
 * @route '/voting/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::logout
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:266
 * @route '/voting/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::logout
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:266
 * @route '/voting/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
const voting = {
    index: Object.assign(index, index),
login: Object.assign(login, login),
authenticate: Object.assign(authenticate, authenticate),
confirmation: Object.assign(confirmation, confirmation),
receipt: Object.assign(receipt, receipt),
feedback: Object.assign(feedback, feedback),
results: Object.assign(results, results),
ballot: Object.assign(ballot, ballot),
preview: Object.assign(preview, preview),
submit: Object.assign(submit, submit),
logout: Object.assign(logout, logout),
admin: Object.assign(admin, admin),
}

export default voting