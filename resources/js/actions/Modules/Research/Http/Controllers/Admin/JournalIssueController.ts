import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
export const show = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/research/admin/issues/{issue}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
show.url = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { issue: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    issue: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        issue: args.issue,
                }

    return show.definition.url
            .replace('{issue}', parsedArgs.issue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
show.get = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
show.head = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
    const showForm = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
        showForm.get = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
        showForm.head = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
export const edit = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/research/admin/issues/{issue}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
edit.url = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { issue: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    issue: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        issue: args.issue,
                }

    return edit.definition.url
            .replace('{issue}', parsedArgs.issue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
edit.get = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
edit.head = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
    const editForm = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
        editForm.get = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
        editForm.head = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
export const update = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/research/admin/issues/{issue}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
update.url = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { issue: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    issue: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        issue: args.issue,
                }

    return update.definition.url
            .replace('{issue}', parsedArgs.issue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
update.put = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
update.patch = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
    const updateForm = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
        updateForm.put = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
        updateForm.patch = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
export const destroy = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/research/admin/issues/{issue}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
destroy.url = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { issue: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    issue: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        issue: args.issue,
                }

    return destroy.definition.url
            .replace('{issue}', parsedArgs.issue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
destroy.delete = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
    const destroyForm = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
        destroyForm.delete = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const JournalIssueController = { index, create, store, show, edit, update, destroy }

export default JournalIssueController