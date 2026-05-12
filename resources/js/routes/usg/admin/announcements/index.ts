import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:18
 * @route '/usg/admin/announcements'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/admin/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:18
 * @route '/usg/admin/announcements'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:18
 * @route '/usg/admin/announcements'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:18
 * @route '/usg/admin/announcements'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:18
 * @route '/usg/admin/announcements'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:18
 * @route '/usg/admin/announcements'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:18
 * @route '/usg/admin/announcements'
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
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::create
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:48
 * @route '/usg/admin/announcements/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/usg/admin/announcements/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::create
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:48
 * @route '/usg/admin/announcements/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::create
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:48
 * @route '/usg/admin/announcements/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::create
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:48
 * @route '/usg/admin/announcements/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::create
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:48
 * @route '/usg/admin/announcements/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::create
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:48
 * @route '/usg/admin/announcements/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::create
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:48
 * @route '/usg/admin/announcements/create'
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
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::store
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:57
 * @route '/usg/admin/announcements'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/usg/admin/announcements',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::store
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:57
 * @route '/usg/admin/announcements'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::store
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:57
 * @route '/usg/admin/announcements'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::store
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:57
 * @route '/usg/admin/announcements'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::store
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:57
 * @route '/usg/admin/announcements'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::show
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:69
 * @route '/usg/admin/announcements/{announcement}'
 */
export const show = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/usg/admin/announcements/{announcement}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::show
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:69
 * @route '/usg/admin/announcements/{announcement}'
 */
show.url = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: args.announcement,
                }

    return show.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::show
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:69
 * @route '/usg/admin/announcements/{announcement}'
 */
show.get = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::show
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:69
 * @route '/usg/admin/announcements/{announcement}'
 */
show.head = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::show
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:69
 * @route '/usg/admin/announcements/{announcement}'
 */
    const showForm = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::show
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:69
 * @route '/usg/admin/announcements/{announcement}'
 */
        showForm.get = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::show
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:69
 * @route '/usg/admin/announcements/{announcement}'
 */
        showForm.head = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:78
 * @route '/usg/admin/announcements/{announcement}/edit'
 */
export const edit = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/usg/admin/announcements/{announcement}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:78
 * @route '/usg/admin/announcements/{announcement}/edit'
 */
edit.url = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: args.announcement,
                }

    return edit.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:78
 * @route '/usg/admin/announcements/{announcement}/edit'
 */
edit.get = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:78
 * @route '/usg/admin/announcements/{announcement}/edit'
 */
edit.head = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:78
 * @route '/usg/admin/announcements/{announcement}/edit'
 */
    const editForm = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:78
 * @route '/usg/admin/announcements/{announcement}/edit'
 */
        editForm.get = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:78
 * @route '/usg/admin/announcements/{announcement}/edit'
 */
        editForm.head = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::update
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:89
 * @route '/usg/admin/announcements/{announcement}'
 */
export const update = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/usg/admin/announcements/{announcement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::update
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:89
 * @route '/usg/admin/announcements/{announcement}'
 */
update.url = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: args.announcement,
                }

    return update.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::update
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:89
 * @route '/usg/admin/announcements/{announcement}'
 */
update.put = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::update
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:89
 * @route '/usg/admin/announcements/{announcement}'
 */
update.patch = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::update
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:89
 * @route '/usg/admin/announcements/{announcement}'
 */
    const updateForm = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::update
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:89
 * @route '/usg/admin/announcements/{announcement}'
 */
        updateForm.put = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::update
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:89
 * @route '/usg/admin/announcements/{announcement}'
 */
        updateForm.patch = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:103
 * @route '/usg/admin/announcements/{announcement}'
 */
export const destroy = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/usg/admin/announcements/{announcement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:103
 * @route '/usg/admin/announcements/{announcement}'
 */
destroy.url = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: args.announcement,
                }

    return destroy.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:103
 * @route '/usg/admin/announcements/{announcement}'
 */
destroy.delete = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:103
 * @route '/usg/admin/announcements/{announcement}'
 */
    const destroyForm = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:103
 * @route '/usg/admin/announcements/{announcement}'
 */
        destroyForm.delete = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::preview
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:137
 * @route '/usg/admin/announcements/{announcement}/preview'
 */
export const preview = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/usg/admin/announcements/{announcement}/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::preview
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:137
 * @route '/usg/admin/announcements/{announcement}/preview'
 */
preview.url = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { announcement: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: typeof args.announcement === 'object'
                ? args.announcement.slug
                : args.announcement,
                }

    return preview.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::preview
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:137
 * @route '/usg/admin/announcements/{announcement}/preview'
 */
preview.get = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::preview
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:137
 * @route '/usg/admin/announcements/{announcement}/preview'
 */
preview.head = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::preview
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:137
 * @route '/usg/admin/announcements/{announcement}/preview'
 */
    const previewForm = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: preview.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::preview
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:137
 * @route '/usg/admin/announcements/{announcement}/preview'
 */
        previewForm.get = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: preview.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::preview
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:137
 * @route '/usg/admin/announcements/{announcement}/preview'
 */
        previewForm.head = (args: { announcement: string | number | { slug: string | number } } | [announcement: string | number | { slug: string | number } ] | string | number | { slug: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: preview.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    preview.form = previewForm
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:113
 * @route '/usg/admin/announcements/{announcement}/publish'
 */
export const publish = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: publish.url(args, options),
    method: 'patch',
})

publish.definition = {
    methods: ["patch"],
    url: '/usg/admin/announcements/{announcement}/publish',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:113
 * @route '/usg/admin/announcements/{announcement}/publish'
 */
publish.url = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: args.announcement,
                }

    return publish.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:113
 * @route '/usg/admin/announcements/{announcement}/publish'
 */
publish.patch = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: publish.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:113
 * @route '/usg/admin/announcements/{announcement}/publish'
 */
    const publishForm = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publish.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:113
 * @route '/usg/admin/announcements/{announcement}/publish'
 */
        publishForm.patch = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publish.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    publish.form = publishForm
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::unpublish
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:121
 * @route '/usg/admin/announcements/{announcement}/unpublish'
 */
export const unpublish = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: unpublish.url(args, options),
    method: 'patch',
})

unpublish.definition = {
    methods: ["patch"],
    url: '/usg/admin/announcements/{announcement}/unpublish',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::unpublish
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:121
 * @route '/usg/admin/announcements/{announcement}/unpublish'
 */
unpublish.url = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: args.announcement,
                }

    return unpublish.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::unpublish
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:121
 * @route '/usg/admin/announcements/{announcement}/unpublish'
 */
unpublish.patch = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: unpublish.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::unpublish
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:121
 * @route '/usg/admin/announcements/{announcement}/unpublish'
 */
    const unpublishForm = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: unpublish.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::unpublish
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:121
 * @route '/usg/admin/announcements/{announcement}/unpublish'
 */
        unpublishForm.patch = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: unpublish.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    unpublish.form = unpublishForm
/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:129
 * @route '/usg/admin/announcements/{announcement}/archive'
 */
export const archive = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: archive.url(args, options),
    method: 'patch',
})

archive.definition = {
    methods: ["patch"],
    url: '/usg/admin/announcements/{announcement}/archive',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:129
 * @route '/usg/admin/announcements/{announcement}/archive'
 */
archive.url = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { announcement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    announcement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        announcement: args.announcement,
                }

    return archive.definition.url
            .replace('{announcement}', parsedArgs.announcement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:129
 * @route '/usg/admin/announcements/{announcement}/archive'
 */
archive.patch = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: archive.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:129
 * @route '/usg/admin/announcements/{announcement}/archive'
 */
    const archiveForm = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: archive.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnnouncementController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/AnnouncementController.php:129
 * @route '/usg/admin/announcements/{announcement}/archive'
 */
        archiveForm.patch = (args: { announcement: string | number } | [announcement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: archive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    archive.form = archiveForm
const announcements = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
preview: Object.assign(preview, preview),
publish: Object.assign(publish, publish),
unpublish: Object.assign(unpublish, unpublish),
archive: Object.assign(archive, archive),
}

export default announcements