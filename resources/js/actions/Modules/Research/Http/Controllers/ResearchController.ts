import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\ResearchController::index
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:10
 * @route '/research'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\ResearchController::index
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:10
 * @route '/research'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\ResearchController::index
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:10
 * @route '/research'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\ResearchController::index
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:10
 * @route '/research'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\ResearchController::index
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:10
 * @route '/research'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\ResearchController::index
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:10
 * @route '/research'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\ResearchController::index
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:10
 * @route '/research'
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
* @see \Modules\Research\Http\Controllers\ResearchController::proposals
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:20
 * @route '/research/proposals'
 */
export const proposals = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proposals.url(options),
    method: 'get',
})

proposals.definition = {
    methods: ["get","head"],
    url: '/research/proposals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\ResearchController::proposals
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:20
 * @route '/research/proposals'
 */
proposals.url = (options?: RouteQueryOptions) => {
    return proposals.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\ResearchController::proposals
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:20
 * @route '/research/proposals'
 */
proposals.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proposals.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\ResearchController::proposals
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:20
 * @route '/research/proposals'
 */
proposals.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: proposals.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\ResearchController::proposals
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:20
 * @route '/research/proposals'
 */
    const proposalsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: proposals.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\ResearchController::proposals
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:20
 * @route '/research/proposals'
 */
        proposalsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: proposals.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\ResearchController::proposals
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:20
 * @route '/research/proposals'
 */
        proposalsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: proposals.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    proposals.form = proposalsForm
/**
* @see \Modules\Research\Http\Controllers\ResearchController::publications
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:25
 * @route '/research/publications'
 */
export const publications = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publications.url(options),
    method: 'get',
})

publications.definition = {
    methods: ["get","head"],
    url: '/research/publications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\ResearchController::publications
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:25
 * @route '/research/publications'
 */
publications.url = (options?: RouteQueryOptions) => {
    return publications.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\ResearchController::publications
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:25
 * @route '/research/publications'
 */
publications.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publications.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\ResearchController::publications
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:25
 * @route '/research/publications'
 */
publications.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publications.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\ResearchController::publications
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:25
 * @route '/research/publications'
 */
    const publicationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publications.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\ResearchController::publications
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:25
 * @route '/research/publications'
 */
        publicationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publications.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\ResearchController::publications
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:25
 * @route '/research/publications'
 */
        publicationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publications.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    publications.form = publicationsForm
/**
* @see \Modules\Research\Http\Controllers\ResearchController::viewThesis
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
export const viewThesis = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewThesis.url(args, options),
    method: 'get',
})

viewThesis.definition = {
    methods: ["get","head"],
    url: '/research/theses/{proposal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\ResearchController::viewThesis
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
viewThesis.url = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return viewThesis.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\ResearchController::viewThesis
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
viewThesis.get = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewThesis.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\ResearchController::viewThesis
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
viewThesis.head = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewThesis.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\ResearchController::viewThesis
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
    const viewThesisForm = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: viewThesis.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\ResearchController::viewThesis
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
        viewThesisForm.get = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewThesis.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\ResearchController::viewThesis
 * @see Modules/Research/app/Http/Controllers/ResearchController.php:30
 * @route '/research/theses/{proposal}'
 */
        viewThesisForm.head = (args: { proposal: number | { id: number } } | [proposal: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewThesis.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    viewThesis.form = viewThesisForm
const ResearchController = { index, proposals, publications, viewThesis }

export default ResearchController