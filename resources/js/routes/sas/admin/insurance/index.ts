import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/insurance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/admin/insurance/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sas/admin/insurance/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:66
 * @route '/sas/admin/insurance/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/sas/admin/insurance/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:66
 * @route '/sas/admin/insurance/{id}'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:66
 * @route '/sas/admin/insurance/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:66
 * @route '/sas/admin/insurance/{id}'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:66
 * @route '/sas/admin/insurance/{id}'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:124
 * @route '/sas/admin/insurance/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sas/admin/insurance/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:124
 * @route '/sas/admin/insurance/{id}'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:124
 * @route '/sas/admin/insurance/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:124
 * @route '/sas/admin/insurance/{id}'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:124
 * @route '/sas/admin/insurance/{id}'
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
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:79
 * @route '/sas/admin/insurance/{id}/approve'
 */
export const approve = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/sas/admin/insurance/{id}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:79
 * @route '/sas/admin/insurance/{id}/approve'
 */
approve.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return approve.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:79
 * @route '/sas/admin/insurance/{id}/approve'
 */
approve.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:79
 * @route '/sas/admin/insurance/{id}/approve'
 */
    const approveForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:79
 * @route '/sas/admin/insurance/{id}/approve'
 */
        approveForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, options),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:98
 * @route '/sas/admin/insurance/{id}/reject'
 */
export const reject = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/sas/admin/insurance/{id}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:98
 * @route '/sas/admin/insurance/{id}/reject'
 */
reject.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return reject.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:98
 * @route '/sas/admin/insurance/{id}/reject'
 */
reject.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:98
 * @route '/sas/admin/insurance/{id}/reject'
 */
    const rejectForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:98
 * @route '/sas/admin/insurance/{id}/reject'
 */
        rejectForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const insurance = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
}

export default insurance