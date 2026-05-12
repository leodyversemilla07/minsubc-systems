import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:13
 * @route '/curriculum/admin/programs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/programs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:13
 * @route '/curriculum/admin/programs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:13
 * @route '/curriculum/admin/programs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:13
 * @route '/curriculum/admin/programs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:13
 * @route '/curriculum/admin/programs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:13
 * @route '/curriculum/admin/programs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:13
 * @route '/curriculum/admin/programs'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:18
 * @route '/curriculum/admin/programs/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/programs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:18
 * @route '/curriculum/admin/programs/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:18
 * @route '/curriculum/admin/programs/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:18
 * @route '/curriculum/admin/programs/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:18
 * @route '/curriculum/admin/programs/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:18
 * @route '/curriculum/admin/programs/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:18
 * @route '/curriculum/admin/programs/create'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:19
 * @route '/curriculum/admin/programs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/curriculum/admin/programs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:19
 * @route '/curriculum/admin/programs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:19
 * @route '/curriculum/admin/programs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:19
 * @route '/curriculum/admin/programs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:19
 * @route '/curriculum/admin/programs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:0
 * @route '/curriculum/admin/programs/{program}'
 */
export const show = (args: { program: string | number } | [program: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/programs/{program}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:0
 * @route '/curriculum/admin/programs/{program}'
 */
show.url = (args: { program: string | number } | [program: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: args.program,
                }

    return show.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:0
 * @route '/curriculum/admin/programs/{program}'
 */
show.get = (args: { program: string | number } | [program: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:0
 * @route '/curriculum/admin/programs/{program}'
 */
show.head = (args: { program: string | number } | [program: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:0
 * @route '/curriculum/admin/programs/{program}'
 */
    const showForm = (args: { program: string | number } | [program: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:0
 * @route '/curriculum/admin/programs/{program}'
 */
        showForm.get = (args: { program: string | number } | [program: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:0
 * @route '/curriculum/admin/programs/{program}'
 */
        showForm.head = (args: { program: string | number } | [program: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:25
 * @route '/curriculum/admin/programs/{program}/edit'
 */
export const edit = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/programs/{program}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:25
 * @route '/curriculum/admin/programs/{program}/edit'
 */
edit.url = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { program: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                }

    return edit.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:25
 * @route '/curriculum/admin/programs/{program}/edit'
 */
edit.get = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:25
 * @route '/curriculum/admin/programs/{program}/edit'
 */
edit.head = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:25
 * @route '/curriculum/admin/programs/{program}/edit'
 */
    const editForm = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:25
 * @route '/curriculum/admin/programs/{program}/edit'
 */
        editForm.get = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:25
 * @route '/curriculum/admin/programs/{program}/edit'
 */
        editForm.head = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:26
 * @route '/curriculum/admin/programs/{program}'
 */
export const update = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/curriculum/admin/programs/{program}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:26
 * @route '/curriculum/admin/programs/{program}'
 */
update.url = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { program: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                }

    return update.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:26
 * @route '/curriculum/admin/programs/{program}'
 */
update.put = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:26
 * @route '/curriculum/admin/programs/{program}'
 */
update.patch = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:26
 * @route '/curriculum/admin/programs/{program}'
 */
    const updateForm = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:26
 * @route '/curriculum/admin/programs/{program}'
 */
        updateForm.put = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:26
 * @route '/curriculum/admin/programs/{program}'
 */
        updateForm.patch = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:32
 * @route '/curriculum/admin/programs/{program}'
 */
export const destroy = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/curriculum/admin/programs/{program}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:32
 * @route '/curriculum/admin/programs/{program}'
 */
destroy.url = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { program: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    program: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program: typeof args.program === 'object'
                ? args.program.id
                : args.program,
                }

    return destroy.definition.url
            .replace('{program}', parsedArgs.program.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:32
 * @route '/curriculum/admin/programs/{program}'
 */
destroy.delete = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:32
 * @route '/curriculum/admin/programs/{program}'
 */
    const destroyForm = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramController.php:32
 * @route '/curriculum/admin/programs/{program}'
 */
        destroyForm.delete = (args: { program: number | { id: number } } | [program: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProgramController = { index, create, store, show, edit, update, destroy }

export default ProgramController