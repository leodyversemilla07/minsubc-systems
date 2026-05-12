import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:24
 * @route '/sas/admin/documents'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:24
 * @route '/sas/admin/documents'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:24
 * @route '/sas/admin/documents'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:24
 * @route '/sas/admin/documents'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:24
 * @route '/sas/admin/documents'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:24
 * @route '/sas/admin/documents'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:24
 * @route '/sas/admin/documents'
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
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:43
 * @route '/sas/admin/documents/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sas/admin/documents/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:43
 * @route '/sas/admin/documents/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:43
 * @route '/sas/admin/documents/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:43
 * @route '/sas/admin/documents/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:43
 * @route '/sas/admin/documents/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:43
 * @route '/sas/admin/documents/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:43
 * @route '/sas/admin/documents/create'
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
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:51
 * @route '/sas/admin/documents'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sas/admin/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:51
 * @route '/sas/admin/documents'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:51
 * @route '/sas/admin/documents'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:51
 * @route '/sas/admin/documents'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:51
 * @route '/sas/admin/documents'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:65
 * @route '/sas/admin/documents/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/admin/documents/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:65
 * @route '/sas/admin/documents/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:65
 * @route '/sas/admin/documents/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:65
 * @route '/sas/admin/documents/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:65
 * @route '/sas/admin/documents/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:65
 * @route '/sas/admin/documents/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:65
 * @route '/sas/admin/documents/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:77
 * @route '/sas/admin/documents/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sas/admin/documents/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:77
 * @route '/sas/admin/documents/{id}/edit'
 */
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:77
 * @route '/sas/admin/documents/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:77
 * @route '/sas/admin/documents/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:77
 * @route '/sas/admin/documents/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:77
 * @route '/sas/admin/documents/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:77
 * @route '/sas/admin/documents/{id}/edit'
 */
        editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:89
 * @route '/sas/admin/documents/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/sas/admin/documents/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:89
 * @route '/sas/admin/documents/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:89
 * @route '/sas/admin/documents/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:89
 * @route '/sas/admin/documents/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:89
 * @route '/sas/admin/documents/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:102
 * @route '/sas/admin/documents/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sas/admin/documents/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:102
 * @route '/sas/admin/documents/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:102
 * @route '/sas/admin/documents/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:102
 * @route '/sas/admin/documents/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:102
 * @route '/sas/admin/documents/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::manageDisposal
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:115
 * @route '/sas/admin/documents-manage-disposal'
 */
export const manageDisposal = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manageDisposal.url(options),
    method: 'get',
})

manageDisposal.definition = {
    methods: ["get","head"],
    url: '/sas/admin/documents-manage-disposal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::manageDisposal
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:115
 * @route '/sas/admin/documents-manage-disposal'
 */
manageDisposal.url = (options?: RouteQueryOptions) => {
    return manageDisposal.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::manageDisposal
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:115
 * @route '/sas/admin/documents-manage-disposal'
 */
manageDisposal.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manageDisposal.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::manageDisposal
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:115
 * @route '/sas/admin/documents-manage-disposal'
 */
manageDisposal.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manageDisposal.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::manageDisposal
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:115
 * @route '/sas/admin/documents-manage-disposal'
 */
    const manageDisposalForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manageDisposal.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::manageDisposal
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:115
 * @route '/sas/admin/documents-manage-disposal'
 */
        manageDisposalForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manageDisposal.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::manageDisposal
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:115
 * @route '/sas/admin/documents-manage-disposal'
 */
        manageDisposalForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manageDisposal.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    manageDisposal.form = manageDisposalForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::updateDisposalStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:127
 * @route '/sas/admin/documents/{id}/disposal-status'
 */
export const updateDisposalStatus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateDisposalStatus.url(args, options),
    method: 'post',
})

updateDisposalStatus.definition = {
    methods: ["post"],
    url: '/sas/admin/documents/{id}/disposal-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::updateDisposalStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:127
 * @route '/sas/admin/documents/{id}/disposal-status'
 */
updateDisposalStatus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return updateDisposalStatus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::updateDisposalStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:127
 * @route '/sas/admin/documents/{id}/disposal-status'
 */
updateDisposalStatus.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateDisposalStatus.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::updateDisposalStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:127
 * @route '/sas/admin/documents/{id}/disposal-status'
 */
    const updateDisposalStatusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateDisposalStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\DocumentController::updateDisposalStatus
 * @see Modules/SAS/app/Http/Controllers/Admin/DocumentController.php:127
 * @route '/sas/admin/documents/{id}/disposal-status'
 */
        updateDisposalStatusForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateDisposalStatus.url(args, options),
            method: 'post',
        })
    
    updateDisposalStatus.form = updateDisposalStatusForm
const documents = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
manageDisposal: Object.assign(manageDisposal, manageDisposal),
updateDisposalStatus: Object.assign(updateDisposalStatus, updateDisposalStatus),
}

export default documents