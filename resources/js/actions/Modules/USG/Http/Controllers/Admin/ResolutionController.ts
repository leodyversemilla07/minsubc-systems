import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::index
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:18
 * @route '/usg/admin/resolutions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/admin/resolutions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::index
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:18
 * @route '/usg/admin/resolutions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::index
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:18
 * @route '/usg/admin/resolutions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::index
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:18
 * @route '/usg/admin/resolutions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::index
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:18
 * @route '/usg/admin/resolutions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::index
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:18
 * @route '/usg/admin/resolutions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::index
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:18
 * @route '/usg/admin/resolutions'
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
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::create
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:45
 * @route '/usg/admin/resolutions/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/usg/admin/resolutions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::create
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:45
 * @route '/usg/admin/resolutions/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::create
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:45
 * @route '/usg/admin/resolutions/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::create
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:45
 * @route '/usg/admin/resolutions/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::create
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:45
 * @route '/usg/admin/resolutions/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::create
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:45
 * @route '/usg/admin/resolutions/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::create
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:45
 * @route '/usg/admin/resolutions/create'
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
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::store
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:56
 * @route '/usg/admin/resolutions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/usg/admin/resolutions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::store
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:56
 * @route '/usg/admin/resolutions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::store
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:56
 * @route '/usg/admin/resolutions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::store
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:56
 * @route '/usg/admin/resolutions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::store
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:56
 * @route '/usg/admin/resolutions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::show
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:68
 * @route '/usg/admin/resolutions/{resolution}'
 */
export const show = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/usg/admin/resolutions/{resolution}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::show
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:68
 * @route '/usg/admin/resolutions/{resolution}'
 */
show.url = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resolution: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resolution: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resolution: args.resolution,
                }

    return show.definition.url
            .replace('{resolution}', parsedArgs.resolution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::show
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:68
 * @route '/usg/admin/resolutions/{resolution}'
 */
show.get = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::show
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:68
 * @route '/usg/admin/resolutions/{resolution}'
 */
show.head = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::show
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:68
 * @route '/usg/admin/resolutions/{resolution}'
 */
    const showForm = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::show
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:68
 * @route '/usg/admin/resolutions/{resolution}'
 */
        showForm.get = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::show
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:68
 * @route '/usg/admin/resolutions/{resolution}'
 */
        showForm.head = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:77
 * @route '/usg/admin/resolutions/{resolution}/edit'
 */
export const edit = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/usg/admin/resolutions/{resolution}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:77
 * @route '/usg/admin/resolutions/{resolution}/edit'
 */
edit.url = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resolution: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resolution: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resolution: args.resolution,
                }

    return edit.definition.url
            .replace('{resolution}', parsedArgs.resolution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:77
 * @route '/usg/admin/resolutions/{resolution}/edit'
 */
edit.get = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:77
 * @route '/usg/admin/resolutions/{resolution}/edit'
 */
edit.head = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:77
 * @route '/usg/admin/resolutions/{resolution}/edit'
 */
    const editForm = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:77
 * @route '/usg/admin/resolutions/{resolution}/edit'
 */
        editForm.get = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:77
 * @route '/usg/admin/resolutions/{resolution}/edit'
 */
        editForm.head = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::update
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:90
 * @route '/usg/admin/resolutions/{resolution}'
 */
export const update = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/usg/admin/resolutions/{resolution}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::update
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:90
 * @route '/usg/admin/resolutions/{resolution}'
 */
update.url = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resolution: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resolution: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resolution: args.resolution,
                }

    return update.definition.url
            .replace('{resolution}', parsedArgs.resolution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::update
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:90
 * @route '/usg/admin/resolutions/{resolution}'
 */
update.put = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::update
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:90
 * @route '/usg/admin/resolutions/{resolution}'
 */
update.patch = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::update
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:90
 * @route '/usg/admin/resolutions/{resolution}'
 */
    const updateForm = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::update
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:90
 * @route '/usg/admin/resolutions/{resolution}'
 */
        updateForm.put = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::update
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:90
 * @route '/usg/admin/resolutions/{resolution}'
 */
        updateForm.patch = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:104
 * @route '/usg/admin/resolutions/{resolution}'
 */
export const destroy = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/usg/admin/resolutions/{resolution}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:104
 * @route '/usg/admin/resolutions/{resolution}'
 */
destroy.url = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resolution: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resolution: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resolution: args.resolution,
                }

    return destroy.definition.url
            .replace('{resolution}', parsedArgs.resolution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:104
 * @route '/usg/admin/resolutions/{resolution}'
 */
destroy.delete = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:104
 * @route '/usg/admin/resolutions/{resolution}'
 */
    const destroyForm = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:104
 * @route '/usg/admin/resolutions/{resolution}'
 */
        destroyForm.delete = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:114
 * @route '/usg/admin/resolutions/{resolution}/archive'
 */
export const archive = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: archive.url(args, options),
    method: 'patch',
})

archive.definition = {
    methods: ["patch"],
    url: '/usg/admin/resolutions/{resolution}/archive',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:114
 * @route '/usg/admin/resolutions/{resolution}/archive'
 */
archive.url = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resolution: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resolution: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resolution: args.resolution,
                }

    return archive.definition.url
            .replace('{resolution}', parsedArgs.resolution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:114
 * @route '/usg/admin/resolutions/{resolution}/archive'
 */
archive.patch = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: archive.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:114
 * @route '/usg/admin/resolutions/{resolution}/archive'
 */
    const archiveForm = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: archive.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:114
 * @route '/usg/admin/resolutions/{resolution}/archive'
 */
        archiveForm.patch = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: archive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    archive.form = archiveForm
/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::unarchive
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:122
 * @route '/usg/admin/resolutions/{resolution}/unarchive'
 */
export const unarchive = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: unarchive.url(args, options),
    method: 'patch',
})

unarchive.definition = {
    methods: ["patch"],
    url: '/usg/admin/resolutions/{resolution}/unarchive',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::unarchive
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:122
 * @route '/usg/admin/resolutions/{resolution}/unarchive'
 */
unarchive.url = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { resolution: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    resolution: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        resolution: args.resolution,
                }

    return unarchive.definition.url
            .replace('{resolution}', parsedArgs.resolution.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::unarchive
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:122
 * @route '/usg/admin/resolutions/{resolution}/unarchive'
 */
unarchive.patch = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: unarchive.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::unarchive
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:122
 * @route '/usg/admin/resolutions/{resolution}/unarchive'
 */
    const unarchiveForm = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: unarchive.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\ResolutionController::unarchive
 * @see Modules/USG/app/Http/Controllers/Admin/ResolutionController.php:122
 * @route '/usg/admin/resolutions/{resolution}/unarchive'
 */
        unarchiveForm.patch = (args: { resolution: string | number } | [resolution: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: unarchive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    unarchive.form = unarchiveForm
const ResolutionController = { index, create, store, show, edit, update, destroy, archive, unarchive }

export default ResolutionController