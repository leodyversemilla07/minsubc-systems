import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\FeedbackController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/FeedbackController.php:17
 * @route '/voting/admin/feedback'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting/admin/feedback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\FeedbackController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/FeedbackController.php:17
 * @route '/voting/admin/feedback'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\FeedbackController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/FeedbackController.php:17
 * @route '/voting/admin/feedback'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\FeedbackController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/FeedbackController.php:17
 * @route '/voting/admin/feedback'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\FeedbackController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/FeedbackController.php:61
 * @route '/voting/admin/feedback/{feedback}'
 */
export const show = (args: { feedback: number | { id: number } } | [feedback: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/voting/admin/feedback/{feedback}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\FeedbackController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/FeedbackController.php:61
 * @route '/voting/admin/feedback/{feedback}'
 */
show.url = (args: { feedback: number | { id: number } } | [feedback: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { feedback: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { feedback: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    feedback: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        feedback: typeof args.feedback === 'object'
                ? args.feedback.id
                : args.feedback,
                }

    return show.definition.url
            .replace('{feedback}', parsedArgs.feedback.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\FeedbackController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/FeedbackController.php:61
 * @route '/voting/admin/feedback/{feedback}'
 */
show.get = (args: { feedback: number | { id: number } } | [feedback: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\FeedbackController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/FeedbackController.php:61
 * @route '/voting/admin/feedback/{feedback}'
 */
show.head = (args: { feedback: number | { id: number } } | [feedback: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const FeedbackController = { index, show }

export default FeedbackController