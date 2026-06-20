import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:11
 * @route '/clinic/admin/physical-exams'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/physical-exams',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:11
 * @route '/clinic/admin/physical-exams'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:11
 * @route '/clinic/admin/physical-exams'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:11
 * @route '/clinic/admin/physical-exams'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:11
 * @route '/clinic/admin/physical-exams'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:11
 * @route '/clinic/admin/physical-exams'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::index
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:11
 * @route '/clinic/admin/physical-exams'
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
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:17
 * @route '/clinic/admin/physical-exams/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/physical-exams/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:17
 * @route '/clinic/admin/physical-exams/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:17
 * @route '/clinic/admin/physical-exams/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:17
 * @route '/clinic/admin/physical-exams/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:17
 * @route '/clinic/admin/physical-exams/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:17
 * @route '/clinic/admin/physical-exams/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::create
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:17
 * @route '/clinic/admin/physical-exams/create'
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
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:23
 * @route '/clinic/admin/physical-exams'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/clinic/admin/physical-exams',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:23
 * @route '/clinic/admin/physical-exams'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:23
 * @route '/clinic/admin/physical-exams'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:23
 * @route '/clinic/admin/physical-exams'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::store
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:23
 * @route '/clinic/admin/physical-exams'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:39
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
export const show = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/physical-exams/{physical_exam}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:39
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
show.url = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_exam: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { physical_exam: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    physical_exam: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        physical_exam: typeof args.physical_exam === 'object'
                ? args.physical_exam.id
                : args.physical_exam,
                }

    return show.definition.url
            .replace('{physical_exam}', parsedArgs.physical_exam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:39
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
show.get = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:39
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
show.head = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:39
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
    const showForm = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:39
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
        showForm.get = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::show
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:39
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
        showForm.head = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}/edit'
 */
export const edit = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/clinic/admin/physical-exams/{physical_exam}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}/edit'
 */
edit.url = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_exam: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    physical_exam: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        physical_exam: args.physical_exam,
                }

    return edit.definition.url
            .replace('{physical_exam}', parsedArgs.physical_exam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}/edit'
 */
edit.get = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}/edit'
 */
edit.head = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}/edit'
 */
    const editForm = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}/edit'
 */
        editForm.get = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::edit
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}/edit'
 */
        editForm.head = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
export const update = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/clinic/admin/physical-exams/{physical_exam}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
update.url = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_exam: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    physical_exam: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        physical_exam: args.physical_exam,
                }

    return update.definition.url
            .replace('{physical_exam}', parsedArgs.physical_exam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
update.put = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
update.patch = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
    const updateForm = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
        updateForm.put = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::update
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:0
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
        updateForm.patch = (args: { physical_exam: string | number } | [physical_exam: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:45
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
export const destroy = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/clinic/admin/physical-exams/{physical_exam}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:45
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
destroy.url = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { physical_exam: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { physical_exam: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    physical_exam: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        physical_exam: typeof args.physical_exam === 'object'
                ? args.physical_exam.id
                : args.physical_exam,
                }

    return destroy.definition.url
            .replace('{physical_exam}', parsedArgs.physical_exam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:45
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
destroy.delete = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:45
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
    const destroyForm = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\PhysicalExamController::destroy
 * @see Modules/Clinic/app/Http/Controllers/Admin/PhysicalExamController.php:45
 * @route '/clinic/admin/physical-exams/{physical_exam}'
 */
        destroyForm.delete = (args: { physical_exam: number | { id: number } } | [physical_exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const physicalExams = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default physicalExams