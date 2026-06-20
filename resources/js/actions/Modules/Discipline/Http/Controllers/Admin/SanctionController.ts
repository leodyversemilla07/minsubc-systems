import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:11
 * @route '/admin/discipline/sanctions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/discipline/sanctions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:11
 * @route '/admin/discipline/sanctions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:11
 * @route '/admin/discipline/sanctions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:11
 * @route '/admin/discipline/sanctions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:11
 * @route '/admin/discipline/sanctions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:11
 * @route '/admin/discipline/sanctions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::index
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:11
 * @route '/admin/discipline/sanctions'
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
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:18
 * @route '/admin/discipline/sanctions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/discipline/sanctions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:18
 * @route '/admin/discipline/sanctions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:18
 * @route '/admin/discipline/sanctions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:18
 * @route '/admin/discipline/sanctions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::store
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:18
 * @route '/admin/discipline/sanctions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:33
 * @route '/admin/discipline/sanctions/{sanction}'
 */
export const update = (args: { sanction: number | { id: number } } | [sanction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/discipline/sanctions/{sanction}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:33
 * @route '/admin/discipline/sanctions/{sanction}'
 */
update.url = (args: { sanction: number | { id: number } } | [sanction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sanction: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sanction: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sanction: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sanction: typeof args.sanction === 'object'
                ? args.sanction.id
                : args.sanction,
                }

    return update.definition.url
            .replace('{sanction}', parsedArgs.sanction.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:33
 * @route '/admin/discipline/sanctions/{sanction}'
 */
update.put = (args: { sanction: number | { id: number } } | [sanction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:33
 * @route '/admin/discipline/sanctions/{sanction}'
 */
    const updateForm = (args: { sanction: number | { id: number } } | [sanction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Discipline\Http\Controllers\Admin\SanctionController::update
 * @see Modules/Discipline/app/Http/Controllers/Admin/SanctionController.php:33
 * @route '/admin/discipline/sanctions/{sanction}'
 */
        updateForm.put = (args: { sanction: number | { id: number } } | [sanction: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const SanctionController = { index, store, update }

export default SanctionController