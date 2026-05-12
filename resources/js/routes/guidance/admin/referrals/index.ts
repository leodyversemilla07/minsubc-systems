import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:304
 * @route '/guidance/admin/referrals'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/referrals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:304
 * @route '/guidance/admin/referrals'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:304
 * @route '/guidance/admin/referrals'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:304
 * @route '/guidance/admin/referrals'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:304
 * @route '/guidance/admin/referrals'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:304
 * @route '/guidance/admin/referrals'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:304
 * @route '/guidance/admin/referrals'
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
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:311
 * @route '/guidance/admin/referrals/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/referrals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:311
 * @route '/guidance/admin/referrals/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:311
 * @route '/guidance/admin/referrals/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:311
 * @route '/guidance/admin/referrals/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:311
 * @route '/guidance/admin/referrals/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:311
 * @route '/guidance/admin/referrals/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:311
 * @route '/guidance/admin/referrals/create'
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
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:317
 * @route '/guidance/admin/referrals'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/guidance/admin/referrals',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:317
 * @route '/guidance/admin/referrals'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:317
 * @route '/guidance/admin/referrals'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:317
 * @route '/guidance/admin/referrals'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:317
 * @route '/guidance/admin/referrals'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
export const show = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/referrals/{referral}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
show.url = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { referral: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    referral: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        referral: args.referral,
                }

    return show.definition.url
            .replace('{referral}', parsedArgs.referral.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
show.get = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
show.head = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
    const showForm = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
        showForm.get = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
        showForm.head = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}/edit'
 */
export const edit = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/referrals/{referral}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}/edit'
 */
edit.url = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { referral: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    referral: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        referral: args.referral,
                }

    return edit.definition.url
            .replace('{referral}', parsedArgs.referral.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}/edit'
 */
edit.get = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}/edit'
 */
edit.head = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}/edit'
 */
    const editForm = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}/edit'
 */
        editForm.get = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}/edit'
 */
        editForm.head = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
export const update = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/guidance/admin/referrals/{referral}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
update.url = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { referral: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    referral: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        referral: args.referral,
                }

    return update.definition.url
            .replace('{referral}', parsedArgs.referral.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
update.put = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
update.patch = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
    const updateForm = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
        updateForm.put = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
        updateForm.patch = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
export const destroy = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/guidance/admin/referrals/{referral}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
destroy.url = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { referral: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    referral: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        referral: args.referral,
                }

    return destroy.definition.url
            .replace('{referral}', parsedArgs.referral.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
destroy.delete = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
    const destroyForm = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/referrals/{referral}'
 */
        destroyForm.delete = (args: { referral: string | number } | [referral: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::accept
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:336
 * @route '/guidance/admin/referrals/{referral}/accept'
 */
export const accept = (args: { referral: number | { id: number } } | [referral: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

accept.definition = {
    methods: ["post"],
    url: '/guidance/admin/referrals/{referral}/accept',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::accept
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:336
 * @route '/guidance/admin/referrals/{referral}/accept'
 */
accept.url = (args: { referral: number | { id: number } } | [referral: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { referral: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { referral: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    referral: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        referral: typeof args.referral === 'object'
                ? args.referral.id
                : args.referral,
                }

    return accept.definition.url
            .replace('{referral}', parsedArgs.referral.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::accept
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:336
 * @route '/guidance/admin/referrals/{referral}/accept'
 */
accept.post = (args: { referral: number | { id: number } } | [referral: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accept.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::accept
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:336
 * @route '/guidance/admin/referrals/{referral}/accept'
 */
    const acceptForm = (args: { referral: number | { id: number } } | [referral: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: accept.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::accept
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:336
 * @route '/guidance/admin/referrals/{referral}/accept'
 */
        acceptForm.post = (args: { referral: number | { id: number } } | [referral: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: accept.url(args, options),
            method: 'post',
        })
    
    accept.form = acceptForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::complete
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:342
 * @route '/guidance/admin/referrals/{referral}/complete'
 */
export const complete = (args: { referral: number | { id: number } } | [referral: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/guidance/admin/referrals/{referral}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::complete
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:342
 * @route '/guidance/admin/referrals/{referral}/complete'
 */
complete.url = (args: { referral: number | { id: number } } | [referral: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { referral: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { referral: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    referral: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        referral: typeof args.referral === 'object'
                ? args.referral.id
                : args.referral,
                }

    return complete.definition.url
            .replace('{referral}', parsedArgs.referral.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::complete
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:342
 * @route '/guidance/admin/referrals/{referral}/complete'
 */
complete.post = (args: { referral: number | { id: number } } | [referral: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::complete
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:342
 * @route '/guidance/admin/referrals/{referral}/complete'
 */
    const completeForm = (args: { referral: number | { id: number } } | [referral: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\ReferralController::complete
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:342
 * @route '/guidance/admin/referrals/{referral}/complete'
 */
        completeForm.post = (args: { referral: number | { id: number } } | [referral: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
const referrals = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
accept: Object.assign(accept, accept),
complete: Object.assign(complete, complete),
}

export default referrals