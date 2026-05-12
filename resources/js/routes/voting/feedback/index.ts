import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::create
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:21
 * @route '/voting/feedback'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/voting/feedback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::create
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:21
 * @route '/voting/feedback'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::create
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:21
 * @route '/voting/feedback'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::create
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:21
 * @route '/voting/feedback'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::create
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:21
 * @route '/voting/feedback'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::create
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:21
 * @route '/voting/feedback'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::create
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:21
 * @route '/voting/feedback'
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
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::store
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:64
 * @route '/voting/feedback'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/voting/feedback',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::store
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:64
 * @route '/voting/feedback'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::store
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:64
 * @route '/voting/feedback'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::store
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:64
 * @route '/voting/feedback'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\FeedbackController::store
 * @see Modules/VotingSystem/app/Http/Controllers/FeedbackController.php:64
 * @route '/voting/feedback'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const feedback = {
    create: Object.assign(create, create),
store: Object.assign(store, store),
}

export default feedback