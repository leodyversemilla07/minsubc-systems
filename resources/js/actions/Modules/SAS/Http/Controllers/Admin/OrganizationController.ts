import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/organizations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
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
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sas/admin/organizations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
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
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:57
 * @route '/sas/admin/organizations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sas/admin/organizations',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:57
 * @route '/sas/admin/organizations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:57
 * @route '/sas/admin/organizations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:57
 * @route '/sas/admin/organizations'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:57
 * @route '/sas/admin/organizations'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
export const show = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/admin/organizations/{organization}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
show.url = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    organization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        organization: args.organization,
                }

    return show.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
show.get = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
show.head = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
    const showForm = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
        showForm.get = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
        showForm.head = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
export const edit = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sas/admin/organizations/{organization}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
edit.url = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    organization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        organization: args.organization,
                }

    return edit.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
edit.get = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
edit.head = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
    const editForm = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
        editForm.get = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
        editForm.head = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
export const update = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/sas/admin/organizations/{organization}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
update.url = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    organization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        organization: args.organization,
                }

    return update.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
update.put = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
update.patch = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
    const updateForm = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
        updateForm.put = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
        updateForm.patch = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:111
 * @route '/sas/admin/organizations/{organization}'
 */
export const destroy = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sas/admin/organizations/{organization}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:111
 * @route '/sas/admin/organizations/{organization}'
 */
destroy.url = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    organization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        organization: args.organization,
                }

    return destroy.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:111
 * @route '/sas/admin/organizations/{organization}'
 */
destroy.delete = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:111
 * @route '/sas/admin/organizations/{organization}'
 */
    const destroyForm = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:111
 * @route '/sas/admin/organizations/{organization}'
 */
        destroyForm.delete = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
export const compliance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: compliance.url(options),
    method: 'get',
})

compliance.definition = {
    methods: ["get","head"],
    url: '/sas/admin/organizations-compliance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
compliance.url = (options?: RouteQueryOptions) => {
    return compliance.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
compliance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: compliance.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
compliance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: compliance.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
    const complianceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: compliance.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
        complianceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: compliance.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
        complianceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: compliance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    compliance.form = complianceForm
const OrganizationController = { index, create, store, show, edit, update, destroy, compliance }

export default OrganizationController