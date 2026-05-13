import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues'
 */
export const index = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/journals/{journal}/issues',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues'
 */
index.url = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { journal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    journal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        journal: args.journal,
                }

    return index.definition.url
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues'
 */
index.get = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues'
 */
index.head = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues'
 */
    const indexForm = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues'
 */
        indexForm.get = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::index
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues'
 */
        indexForm.head = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues/create'
 */
export const create = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/research/admin/journals/{journal}/issues/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues/create'
 */
create.url = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { journal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    journal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        journal: args.journal,
                }

    return create.definition.url
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues/create'
 */
create.get = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues/create'
 */
create.head = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues/create'
 */
    const createForm = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues/create'
 */
        createForm.get = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::create
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/journals/{journal}/issues/create'
 */
        createForm.head = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::store
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:12
 * @route '/research/admin/journals/{journal}/issues'
 */
export const store = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/research/admin/journals/{journal}/issues',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::store
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:12
 * @route '/research/admin/journals/{journal}/issues'
 */
store.url = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { journal: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    journal: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        journal: args.journal,
                }

    return store.definition.url
            .replace('{journal}', parsedArgs.journal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::store
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:12
 * @route '/research/admin/journals/{journal}/issues'
 */
store.post = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::store
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:12
 * @route '/research/admin/journals/{journal}/issues'
 */
    const storeForm = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::store
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:12
 * @route '/research/admin/journals/{journal}/issues'
 */
        storeForm.post = (args: { journal: string | number } | [journal: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const issues = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
}

export default issues