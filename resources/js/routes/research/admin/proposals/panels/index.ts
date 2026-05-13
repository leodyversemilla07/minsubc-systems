import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
export const index = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/proposals/{proposal}/panels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
index.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: args.proposal,
                }

    return index.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
index.get = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
index.head = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
    const indexForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
        indexForm.get = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::index
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels'
 */
        indexForm.head = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
export const create = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/research/admin/proposals/{proposal}/panels/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
create.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: args.proposal,
                }

    return create.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
create.get = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
create.head = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
    const createForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
        createForm.get = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::create
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:0
 * @route '/research/admin/proposals/{proposal}/panels/create'
 */
        createForm.head = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:12
 * @route '/research/admin/proposals/{proposal}/panels'
 */
export const store = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/research/admin/proposals/{proposal}/panels',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:12
 * @route '/research/admin/proposals/{proposal}/panels'
 */
store.url = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { proposal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    proposal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        proposal: args.proposal,
                }

    return store.definition.url
            .replace('{proposal}', parsedArgs.proposal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:12
 * @route '/research/admin/proposals/{proposal}/panels'
 */
store.post = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:12
 * @route '/research/admin/proposals/{proposal}/panels'
 */
    const storeForm = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\PanelController::store
 * @see Modules/Research/app/Http/Controllers/Admin/PanelController.php:12
 * @route '/research/admin/proposals/{proposal}/panels'
 */
        storeForm.post = (args: { proposal: string | number } | [proposal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const panels = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
}

export default panels