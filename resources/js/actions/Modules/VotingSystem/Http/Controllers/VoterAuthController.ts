import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::showLogin
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
export const showLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})

showLogin.definition = {
    methods: ["get","head"],
    url: '/voting/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::showLogin
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
showLogin.url = (options?: RouteQueryOptions) => {
    return showLogin.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::showLogin
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
showLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLogin.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::showLogin
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
showLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLogin.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::showLogin
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
    const showLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showLogin.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::showLogin
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
        showLoginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLogin.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::showLogin
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:23
 * @route '/voting/login'
 */
        showLoginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showLogin.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showLogin.form = showLoginForm
/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:83
 * @route '/voting/authenticate'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

login.definition = {
    methods: ["post"],
    url: '/voting/authenticate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:83
 * @route '/voting/authenticate'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:83
 * @route '/voting/authenticate'
 */
login.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: login.url(options),
    method: 'post',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:83
 * @route '/voting/authenticate'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: login.url(options),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\VoterAuthController::login
 * @see Modules/VotingSystem/app/Http/Controllers/VoterAuthController.php:83
 * @route '/voting/authenticate'
 */
        loginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: login.url(options),
            method: 'post',
        })
    
    login.form = loginForm
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
const VoterAuthController = { showLogin, login, logout }

export default VoterAuthController