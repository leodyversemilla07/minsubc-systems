import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:19
 * @route '/curriculum/admin/syllabi'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/syllabi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:19
 * @route '/curriculum/admin/syllabi'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:19
 * @route '/curriculum/admin/syllabi'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:19
 * @route '/curriculum/admin/syllabi'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:19
 * @route '/curriculum/admin/syllabi'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:19
 * @route '/curriculum/admin/syllabi'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:19
 * @route '/curriculum/admin/syllabi'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:24
 * @route '/curriculum/admin/syllabi/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/syllabi/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:24
 * @route '/curriculum/admin/syllabi/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:24
 * @route '/curriculum/admin/syllabi/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:24
 * @route '/curriculum/admin/syllabi/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:24
 * @route '/curriculum/admin/syllabi/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:24
 * @route '/curriculum/admin/syllabi/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:24
 * @route '/curriculum/admin/syllabi/create'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:29
 * @route '/curriculum/admin/syllabi'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/curriculum/admin/syllabi',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:29
 * @route '/curriculum/admin/syllabi'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:29
 * @route '/curriculum/admin/syllabi'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:29
 * @route '/curriculum/admin/syllabi'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:29
 * @route '/curriculum/admin/syllabi'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:36
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
export const show = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/syllabi/{syllabus}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:36
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
show.url = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { syllabus: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { syllabus: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: typeof args.syllabus === 'object'
                ? args.syllabus.id
                : args.syllabus,
                }

    return show.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:36
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
show.get = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:36
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
show.head = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:36
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
    const showForm = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:36
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
        showForm.get = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:36
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
        showForm.head = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}/edit'
 */
export const edit = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/syllabi/{syllabus}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}/edit'
 */
edit.url = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { syllabus: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: args.syllabus,
                }

    return edit.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}/edit'
 */
edit.get = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}/edit'
 */
edit.head = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}/edit'
 */
    const editForm = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}/edit'
 */
        editForm.get = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}/edit'
 */
        editForm.head = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
export const update = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/curriculum/admin/syllabi/{syllabus}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
update.url = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { syllabus: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: args.syllabus,
                }

    return update.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
update.put = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
update.patch = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
    const updateForm = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
        updateForm.put = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
        updateForm.patch = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
export const destroy = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/curriculum/admin/syllabi/{syllabus}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
destroy.url = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { syllabus: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: args.syllabus,
                }

    return destroy.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
destroy.delete = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
    const destroyForm = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:0
 * @route '/curriculum/admin/syllabi/{syllabus}'
 */
        destroyForm.delete = (args: { syllabus: string | number } | [syllabus: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::publish
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:43
 * @route '/curriculum/admin/syllabi/{syllabus}/publish'
 */
export const publish = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

publish.definition = {
    methods: ["post"],
    url: '/curriculum/admin/syllabi/{syllabus}/publish',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::publish
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:43
 * @route '/curriculum/admin/syllabi/{syllabus}/publish'
 */
publish.url = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { syllabus: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { syllabus: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: typeof args.syllabus === 'object'
                ? args.syllabus.id
                : args.syllabus,
                }

    return publish.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::publish
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:43
 * @route '/curriculum/admin/syllabi/{syllabus}/publish'
 */
publish.post = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: publish.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::publish
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:43
 * @route '/curriculum/admin/syllabi/{syllabus}/publish'
 */
    const publishForm = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: publish.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::publish
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:43
 * @route '/curriculum/admin/syllabi/{syllabus}/publish'
 */
        publishForm.post = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: publish.url(args, options),
            method: 'post',
        })
    
    publish.form = publishForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::addCourseOutcome
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:48
 * @route '/curriculum/admin/syllabi/{syllabus}/course-outcomes'
 */
export const addCourseOutcome = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addCourseOutcome.url(args, options),
    method: 'post',
})

addCourseOutcome.definition = {
    methods: ["post"],
    url: '/curriculum/admin/syllabi/{syllabus}/course-outcomes',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::addCourseOutcome
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:48
 * @route '/curriculum/admin/syllabi/{syllabus}/course-outcomes'
 */
addCourseOutcome.url = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { syllabus: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { syllabus: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: typeof args.syllabus === 'object'
                ? args.syllabus.id
                : args.syllabus,
                }

    return addCourseOutcome.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::addCourseOutcome
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:48
 * @route '/curriculum/admin/syllabi/{syllabus}/course-outcomes'
 */
addCourseOutcome.post = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addCourseOutcome.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::addCourseOutcome
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:48
 * @route '/curriculum/admin/syllabi/{syllabus}/course-outcomes'
 */
    const addCourseOutcomeForm = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addCourseOutcome.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::addCourseOutcome
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:48
 * @route '/curriculum/admin/syllabi/{syllabus}/course-outcomes'
 */
        addCourseOutcomeForm.post = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addCourseOutcome.url(args, options),
            method: 'post',
        })
    
    addCourseOutcome.form = addCourseOutcomeForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::removeCourseOutcome
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:55
 * @route '/curriculum/admin/syllabi/{syllabus}/course-outcomes/{courseOutcome}'
 */
export const removeCourseOutcome = (args: { syllabus: number | { id: number }, courseOutcome: number | { id: number } } | [syllabus: number | { id: number }, courseOutcome: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeCourseOutcome.url(args, options),
    method: 'delete',
})

removeCourseOutcome.definition = {
    methods: ["delete"],
    url: '/curriculum/admin/syllabi/{syllabus}/course-outcomes/{courseOutcome}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::removeCourseOutcome
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:55
 * @route '/curriculum/admin/syllabi/{syllabus}/course-outcomes/{courseOutcome}'
 */
removeCourseOutcome.url = (args: { syllabus: number | { id: number }, courseOutcome: number | { id: number } } | [syllabus: number | { id: number }, courseOutcome: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                    courseOutcome: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: typeof args.syllabus === 'object'
                ? args.syllabus.id
                : args.syllabus,
                                courseOutcome: typeof args.courseOutcome === 'object'
                ? args.courseOutcome.id
                : args.courseOutcome,
                }

    return removeCourseOutcome.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace('{courseOutcome}', parsedArgs.courseOutcome.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::removeCourseOutcome
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:55
 * @route '/curriculum/admin/syllabi/{syllabus}/course-outcomes/{courseOutcome}'
 */
removeCourseOutcome.delete = (args: { syllabus: number | { id: number }, courseOutcome: number | { id: number } } | [syllabus: number | { id: number }, courseOutcome: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeCourseOutcome.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::removeCourseOutcome
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:55
 * @route '/curriculum/admin/syllabi/{syllabus}/course-outcomes/{courseOutcome}'
 */
    const removeCourseOutcomeForm = (args: { syllabus: number | { id: number }, courseOutcome: number | { id: number } } | [syllabus: number | { id: number }, courseOutcome: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeCourseOutcome.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::removeCourseOutcome
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:55
 * @route '/curriculum/admin/syllabi/{syllabus}/course-outcomes/{courseOutcome}'
 */
        removeCourseOutcomeForm.delete = (args: { syllabus: number | { id: number }, courseOutcome: number | { id: number } } | [syllabus: number | { id: number }, courseOutcome: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeCourseOutcome.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeCourseOutcome.form = removeCourseOutcomeForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::mapOutcomes
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:56
 * @route '/curriculum/admin/syllabi/{syllabus}/map-outcomes'
 */
export const mapOutcomes = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mapOutcomes.url(args, options),
    method: 'post',
})

mapOutcomes.definition = {
    methods: ["post"],
    url: '/curriculum/admin/syllabi/{syllabus}/map-outcomes',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::mapOutcomes
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:56
 * @route '/curriculum/admin/syllabi/{syllabus}/map-outcomes'
 */
mapOutcomes.url = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { syllabus: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { syllabus: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: typeof args.syllabus === 'object'
                ? args.syllabus.id
                : args.syllabus,
                }

    return mapOutcomes.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::mapOutcomes
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:56
 * @route '/curriculum/admin/syllabi/{syllabus}/map-outcomes'
 */
mapOutcomes.post = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: mapOutcomes.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::mapOutcomes
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:56
 * @route '/curriculum/admin/syllabi/{syllabus}/map-outcomes'
 */
    const mapOutcomesForm = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: mapOutcomes.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::mapOutcomes
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:56
 * @route '/curriculum/admin/syllabi/{syllabus}/map-outcomes'
 */
        mapOutcomesForm.post = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: mapOutcomes.url(args, options),
            method: 'post',
        })
    
    mapOutcomes.form = mapOutcomesForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::addTextbook
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:67
 * @route '/curriculum/admin/syllabi/{syllabus}/textbooks'
 */
export const addTextbook = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addTextbook.url(args, options),
    method: 'post',
})

addTextbook.definition = {
    methods: ["post"],
    url: '/curriculum/admin/syllabi/{syllabus}/textbooks',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::addTextbook
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:67
 * @route '/curriculum/admin/syllabi/{syllabus}/textbooks'
 */
addTextbook.url = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { syllabus: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { syllabus: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: typeof args.syllabus === 'object'
                ? args.syllabus.id
                : args.syllabus,
                }

    return addTextbook.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::addTextbook
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:67
 * @route '/curriculum/admin/syllabi/{syllabus}/textbooks'
 */
addTextbook.post = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addTextbook.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::addTextbook
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:67
 * @route '/curriculum/admin/syllabi/{syllabus}/textbooks'
 */
    const addTextbookForm = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addTextbook.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::addTextbook
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:67
 * @route '/curriculum/admin/syllabi/{syllabus}/textbooks'
 */
        addTextbookForm.post = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addTextbook.url(args, options),
            method: 'post',
        })
    
    addTextbook.form = addTextbookForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::removeTextbook
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:73
 * @route '/curriculum/admin/syllabi/{syllabus}/textbooks/{syllabusTextbook}'
 */
export const removeTextbook = (args: { syllabus: number | { id: number }, syllabusTextbook: number | { id: number } } | [syllabus: number | { id: number }, syllabusTextbook: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeTextbook.url(args, options),
    method: 'delete',
})

removeTextbook.definition = {
    methods: ["delete"],
    url: '/curriculum/admin/syllabi/{syllabus}/textbooks/{syllabusTextbook}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::removeTextbook
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:73
 * @route '/curriculum/admin/syllabi/{syllabus}/textbooks/{syllabusTextbook}'
 */
removeTextbook.url = (args: { syllabus: number | { id: number }, syllabusTextbook: number | { id: number } } | [syllabus: number | { id: number }, syllabusTextbook: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                    syllabusTextbook: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: typeof args.syllabus === 'object'
                ? args.syllabus.id
                : args.syllabus,
                                syllabusTextbook: typeof args.syllabusTextbook === 'object'
                ? args.syllabusTextbook.id
                : args.syllabusTextbook,
                }

    return removeTextbook.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace('{syllabusTextbook}', parsedArgs.syllabusTextbook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::removeTextbook
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:73
 * @route '/curriculum/admin/syllabi/{syllabus}/textbooks/{syllabusTextbook}'
 */
removeTextbook.delete = (args: { syllabus: number | { id: number }, syllabusTextbook: number | { id: number } } | [syllabus: number | { id: number }, syllabusTextbook: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeTextbook.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::removeTextbook
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:73
 * @route '/curriculum/admin/syllabi/{syllabus}/textbooks/{syllabusTextbook}'
 */
    const removeTextbookForm = (args: { syllabus: number | { id: number }, syllabusTextbook: number | { id: number } } | [syllabus: number | { id: number }, syllabusTextbook: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeTextbook.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\SyllabusController::removeTextbook
 * @see Modules/Curriculum/app/Http/Controllers/Admin/SyllabusController.php:73
 * @route '/curriculum/admin/syllabi/{syllabus}/textbooks/{syllabusTextbook}'
 */
        removeTextbookForm.delete = (args: { syllabus: number | { id: number }, syllabusTextbook: number | { id: number } } | [syllabus: number | { id: number }, syllabusTextbook: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeTextbook.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeTextbook.form = removeTextbookForm
const SyllabusController = { index, create, store, show, edit, update, destroy, publish, addCourseOutcome, removeCourseOutcome, mapOutcomes, addTextbook, removeTextbook }

export default SyllabusController