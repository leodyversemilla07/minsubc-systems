import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
export const index = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting/results/{election}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
index.url = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{election}', parsedArgs.election.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
index.get = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\ResultsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/ResultsController.php:19
 * @route '/voting/results/{election}'
 */
index.head = (args: { election: string | number } | [election: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})
const ResultsController = { index }

export default ResultsController