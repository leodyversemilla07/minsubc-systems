import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:16
 * @route '/curriculum/admin/curricula'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/curricula',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:16
 * @route '/curriculum/admin/curricula'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:16
 * @route '/curriculum/admin/curricula'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:16
 * @route '/curriculum/admin/curricula'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:16
 * @route '/curriculum/admin/curricula'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:16
 * @route '/curriculum/admin/curricula'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:16
 * @route '/curriculum/admin/curricula'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:21
 * @route '/curriculum/admin/curricula/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/curricula/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:21
 * @route '/curriculum/admin/curricula/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:21
 * @route '/curriculum/admin/curricula/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:21
 * @route '/curriculum/admin/curricula/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:21
 * @route '/curriculum/admin/curricula/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:21
 * @route '/curriculum/admin/curricula/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:21
 * @route '/curriculum/admin/curricula/create'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:26
 * @route '/curriculum/admin/curricula'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/curriculum/admin/curricula',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:26
 * @route '/curriculum/admin/curricula'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:26
 * @route '/curriculum/admin/curricula'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:26
 * @route '/curriculum/admin/curricula'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:26
 * @route '/curriculum/admin/curricula'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
export const show = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/curricula/{curriculum}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
show.url = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { curriculum: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { curriculum: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    curriculum: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        curriculum: typeof args.curriculum === 'object'
                ? args.curriculum.id
                : args.curriculum,
                }

    return show.definition.url
            .replace('{curriculum}', parsedArgs.curriculum.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
show.get = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
show.head = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
    const showForm = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
        showForm.get = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:32
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
        showForm.head = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}/edit'
 */
export const edit = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/curricula/{curriculum}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}/edit'
 */
edit.url = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { curriculum: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    curriculum: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        curriculum: args.curriculum,
                }

    return edit.definition.url
            .replace('{curriculum}', parsedArgs.curriculum.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}/edit'
 */
edit.get = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}/edit'
 */
edit.head = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}/edit'
 */
    const editForm = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}/edit'
 */
        editForm.get = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}/edit'
 */
        editForm.head = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
export const update = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/curriculum/admin/curricula/{curriculum}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
update.url = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { curriculum: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    curriculum: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        curriculum: args.curriculum,
                }

    return update.definition.url
            .replace('{curriculum}', parsedArgs.curriculum.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
update.put = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
update.patch = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
    const updateForm = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
        updateForm.put = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
        updateForm.patch = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
export const destroy = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/curriculum/admin/curricula/{curriculum}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
destroy.url = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { curriculum: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    curriculum: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        curriculum: args.curriculum,
                }

    return destroy.definition.url
            .replace('{curriculum}', parsedArgs.curriculum.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
destroy.delete = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
    const destroyForm = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:0
 * @route '/curriculum/admin/curricula/{curriculum}'
 */
        destroyForm.delete = (args: { curriculum: string | number } | [curriculum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::publish
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:38
 * @route '/curriculum/admin/curricula/{curriculum}/publish'
 */
export const publish = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

publish.definition = {
    methods: ["post"],
    url: '/curriculum/admin/curricula/{curriculum}/publish',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::publish
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:38
 * @route '/curriculum/admin/curricula/{curriculum}/publish'
 */
publish.url = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { curriculum: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { curriculum: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    curriculum: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        curriculum: typeof args.curriculum === 'object'
                ? args.curriculum.id
                : args.curriculum,
                }

    return publish.definition.url
            .replace('{curriculum}', parsedArgs.curriculum.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::publish
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:38
 * @route '/curriculum/admin/curricula/{curriculum}/publish'
 */
publish.post = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::publish
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:38
 * @route '/curriculum/admin/curricula/{curriculum}/publish'
 */
    const publishForm = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publish.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::publish
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:38
 * @route '/curriculum/admin/curricula/{curriculum}/publish'
 */
        publishForm.post = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publish.url(args, options),
            method: 'post',
        })
    
    publish.form = publishForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::addCourse
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:43
 * @route '/curriculum/admin/curricula/{curriculum}/courses'
 */
export const addCourse = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addCourse.url(args, options),
    method: 'post',
})

addCourse.definition = {
    methods: ["post"],
    url: '/curriculum/admin/curricula/{curriculum}/courses',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::addCourse
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:43
 * @route '/curriculum/admin/curricula/{curriculum}/courses'
 */
addCourse.url = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { curriculum: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { curriculum: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    curriculum: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        curriculum: typeof args.curriculum === 'object'
                ? args.curriculum.id
                : args.curriculum,
                }

    return addCourse.definition.url
            .replace('{curriculum}', parsedArgs.curriculum.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::addCourse
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:43
 * @route '/curriculum/admin/curricula/{curriculum}/courses'
 */
addCourse.post = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addCourse.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::addCourse
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:43
 * @route '/curriculum/admin/curricula/{curriculum}/courses'
 */
    const addCourseForm = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addCourse.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::addCourse
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:43
 * @route '/curriculum/admin/curricula/{curriculum}/courses'
 */
        addCourseForm.post = (args: { curriculum: number | { id: number } } | [curriculum: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addCourse.url(args, options),
            method: 'post',
        })
    
    addCourse.form = addCourseForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::removeCourse
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:50
 * @route '/curriculum/admin/curricula/{curriculum}/courses/{curriculumCourse}'
 */
export const removeCourse = (args: { curriculum: number | { id: number }, curriculumCourse: number | { id: number } } | [curriculum: number | { id: number }, curriculumCourse: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeCourse.url(args, options),
    method: 'delete',
})

removeCourse.definition = {
    methods: ["delete"],
    url: '/curriculum/admin/curricula/{curriculum}/courses/{curriculumCourse}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::removeCourse
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:50
 * @route '/curriculum/admin/curricula/{curriculum}/courses/{curriculumCourse}'
 */
removeCourse.url = (args: { curriculum: number | { id: number }, curriculumCourse: number | { id: number } } | [curriculum: number | { id: number }, curriculumCourse: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    curriculum: args[0],
                    curriculumCourse: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        curriculum: typeof args.curriculum === 'object'
                ? args.curriculum.id
                : args.curriculum,
                                curriculumCourse: typeof args.curriculumCourse === 'object'
                ? args.curriculumCourse.id
                : args.curriculumCourse,
                }

    return removeCourse.definition.url
            .replace('{curriculum}', parsedArgs.curriculum.toString())
            .replace('{curriculumCourse}', parsedArgs.curriculumCourse.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::removeCourse
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:50
 * @route '/curriculum/admin/curricula/{curriculum}/courses/{curriculumCourse}'
 */
removeCourse.delete = (args: { curriculum: number | { id: number }, curriculumCourse: number | { id: number } } | [curriculum: number | { id: number }, curriculumCourse: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeCourse.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::removeCourse
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:50
 * @route '/curriculum/admin/curricula/{curriculum}/courses/{curriculumCourse}'
 */
    const removeCourseForm = (args: { curriculum: number | { id: number }, curriculumCourse: number | { id: number } } | [curriculum: number | { id: number }, curriculumCourse: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeCourse.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CurriculumController::removeCourse
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CurriculumController.php:50
 * @route '/curriculum/admin/curricula/{curriculum}/courses/{curriculumCourse}'
 */
        removeCourseForm.delete = (args: { curriculum: number | { id: number }, curriculumCourse: number | { id: number } } | [curriculum: number | { id: number }, curriculumCourse: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeCourse.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeCourse.form = removeCourseForm
const CurriculumController = { index, create, store, show, edit, update, destroy, publish, addCourse, removeCourse }

export default CurriculumController