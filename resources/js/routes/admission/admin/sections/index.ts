import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:21
 * @route '/admission/admin/sections'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission/admin/sections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:21
 * @route '/admission/admin/sections'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:21
 * @route '/admission/admin/sections'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:21
 * @route '/admission/admin/sections'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:21
 * @route '/admission/admin/sections'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:21
 * @route '/admission/admin/sections'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:21
 * @route '/admission/admin/sections'
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
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:47
 * @route '/admission/admin/sections/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admission/admin/sections/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:47
 * @route '/admission/admin/sections/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:47
 * @route '/admission/admin/sections/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:47
 * @route '/admission/admin/sections/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:47
 * @route '/admission/admin/sections/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:47
 * @route '/admission/admin/sections/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:47
 * @route '/admission/admin/sections/create'
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
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:64
 * @route '/admission/admin/sections'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admission/admin/sections',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:64
 * @route '/admission/admin/sections'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:64
 * @route '/admission/admin/sections'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:64
 * @route '/admission/admin/sections'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:64
 * @route '/admission/admin/sections'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:83
 * @route '/admission/admin/sections/{section}'
 */
export const show = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admission/admin/sections/{section}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:83
 * @route '/admission/admin/sections/{section}'
 */
show.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return show.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:83
 * @route '/admission/admin/sections/{section}'
 */
show.get = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:83
 * @route '/admission/admin/sections/{section}'
 */
show.head = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:83
 * @route '/admission/admin/sections/{section}'
 */
    const showForm = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:83
 * @route '/admission/admin/sections/{section}'
 */
        showForm.get = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:83
 * @route '/admission/admin/sections/{section}'
 */
        showForm.head = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:117
 * @route '/admission/admin/sections/{section}/edit'
 */
export const edit = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admission/admin/sections/{section}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:117
 * @route '/admission/admin/sections/{section}/edit'
 */
edit.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return edit.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:117
 * @route '/admission/admin/sections/{section}/edit'
 */
edit.get = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:117
 * @route '/admission/admin/sections/{section}/edit'
 */
edit.head = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:117
 * @route '/admission/admin/sections/{section}/edit'
 */
    const editForm = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:117
 * @route '/admission/admin/sections/{section}/edit'
 */
        editForm.get = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:117
 * @route '/admission/admin/sections/{section}/edit'
 */
        editForm.head = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:135
 * @route '/admission/admin/sections/{section}'
 */
export const update = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admission/admin/sections/{section}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:135
 * @route '/admission/admin/sections/{section}'
 */
update.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return update.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:135
 * @route '/admission/admin/sections/{section}'
 */
update.patch = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:135
 * @route '/admission/admin/sections/{section}'
 */
    const updateForm = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:135
 * @route '/admission/admin/sections/{section}'
 */
        updateForm.patch = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:155
 * @route '/admission/admin/sections/{section}'
 */
export const destroy = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admission/admin/sections/{section}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:155
 * @route '/admission/admin/sections/{section}'
 */
destroy.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return destroy.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:155
 * @route '/admission/admin/sections/{section}'
 */
destroy.delete = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:155
 * @route '/admission/admin/sections/{section}'
 */
    const destroyForm = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:155
 * @route '/admission/admin/sections/{section}'
 */
        destroyForm.delete = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::addSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:170
 * @route '/admission/admin/sections/{section}/add-schedule'
 */
export const addSchedule = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addSchedule.url(args, options),
    method: 'post',
})

addSchedule.definition = {
    methods: ["post"],
    url: '/admission/admin/sections/{section}/add-schedule',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::addSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:170
 * @route '/admission/admin/sections/{section}/add-schedule'
 */
addSchedule.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return addSchedule.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::addSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:170
 * @route '/admission/admin/sections/{section}/add-schedule'
 */
addSchedule.post = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addSchedule.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::addSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:170
 * @route '/admission/admin/sections/{section}/add-schedule'
 */
    const addScheduleForm = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addSchedule.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::addSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:170
 * @route '/admission/admin/sections/{section}/add-schedule'
 */
        addScheduleForm.post = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addSchedule.url(args, options),
            method: 'post',
        })
    
    addSchedule.form = addScheduleForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::removeSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:194
 * @route '/admission/admin/sections/{section}/remove-schedule/{schedule}'
 */
export const removeSchedule = (args: { section: string | number, schedule: number | { id: number } } | [section: string | number, schedule: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeSchedule.url(args, options),
    method: 'post',
})

removeSchedule.definition = {
    methods: ["post"],
    url: '/admission/admin/sections/{section}/remove-schedule/{schedule}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::removeSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:194
 * @route '/admission/admin/sections/{section}/remove-schedule/{schedule}'
 */
removeSchedule.url = (args: { section: string | number, schedule: number | { id: number } } | [section: string | number, schedule: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                    schedule: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: args.section,
                                schedule: typeof args.schedule === 'object'
                ? args.schedule.id
                : args.schedule,
                }

    return removeSchedule.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::removeSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:194
 * @route '/admission/admin/sections/{section}/remove-schedule/{schedule}'
 */
removeSchedule.post = (args: { section: string | number, schedule: number | { id: number } } | [section: string | number, schedule: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: removeSchedule.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::removeSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:194
 * @route '/admission/admin/sections/{section}/remove-schedule/{schedule}'
 */
    const removeScheduleForm = (args: { section: string | number, schedule: number | { id: number } } | [section: string | number, schedule: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeSchedule.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::removeSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:194
 * @route '/admission/admin/sections/{section}/remove-schedule/{schedule}'
 */
        removeScheduleForm.post = (args: { section: string | number, schedule: number | { id: number } } | [section: string | number, schedule: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeSchedule.url(args, options),
            method: 'post',
        })
    
    removeSchedule.form = removeScheduleForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::availableSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:204
 * @route '/admission/admin/sections/{section}/available-subjects'
 */
export const availableSubjects = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableSubjects.url(args, options),
    method: 'get',
})

availableSubjects.definition = {
    methods: ["get","head"],
    url: '/admission/admin/sections/{section}/available-subjects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::availableSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:204
 * @route '/admission/admin/sections/{section}/available-subjects'
 */
availableSubjects.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return availableSubjects.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::availableSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:204
 * @route '/admission/admin/sections/{section}/available-subjects'
 */
availableSubjects.get = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableSubjects.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::availableSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:204
 * @route '/admission/admin/sections/{section}/available-subjects'
 */
availableSubjects.head = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availableSubjects.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::availableSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:204
 * @route '/admission/admin/sections/{section}/available-subjects'
 */
    const availableSubjectsForm = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: availableSubjects.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::availableSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:204
 * @route '/admission/admin/sections/{section}/available-subjects'
 */
        availableSubjectsForm.get = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: availableSubjects.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SectionController::availableSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/SectionController.php:204
 * @route '/admission/admin/sections/{section}/available-subjects'
 */
        availableSubjectsForm.head = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: availableSubjects.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    availableSubjects.form = availableSubjectsForm
const sections = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
addSchedule: Object.assign(addSchedule, addSchedule),
removeSchedule: Object.assign(removeSchedule, removeSchedule),
availableSubjects: Object.assign(availableSubjects, availableSubjects),
}

export default sections