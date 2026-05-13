import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\ResearchController::view
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
export const view = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/research/theses/{proposal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\ResearchController::view
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
view.url = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { proposal: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: typeof args.proposal === 'object'
                ? args.proposal.id
                : args.proposal,
                }

    return view.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\ResearchController::view
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
view.get = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\ResearchController::view
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
view.head = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\ResearchController::view
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
    const viewForm = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: view.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\ResearchController::view
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
        viewForm.get = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\ResearchController::view
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
        viewForm.head = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    view.form = viewForm
const theses = {
    view: Object.assign(view, view),
}

export default theses