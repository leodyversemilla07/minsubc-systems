import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
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
const FeedbackController = { create, store }

export default FeedbackController