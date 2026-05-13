import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import theses from './theses'
import admin from './admin'
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
const research = {
    index: Object.assign(index, index),
proposals: Object.assign(proposals, proposals),
publications: Object.assign(publications, publications),
theses: Object.assign(theses, theses),
admin: Object.assign(admin, admin),
}

export default research