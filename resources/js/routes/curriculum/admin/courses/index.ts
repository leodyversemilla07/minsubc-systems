import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:14
 * @route '/curriculum/admin/courses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:14
 * @route '/curriculum/admin/courses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:14
 * @route '/curriculum/admin/courses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:14
 * @route '/curriculum/admin/courses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:14
 * @route '/curriculum/admin/courses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:14
 * @route '/curriculum/admin/courses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:14
 * @route '/curriculum/admin/courses'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:19
 * @route '/curriculum/admin/courses/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/courses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:19
 * @route '/curriculum/admin/courses/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:19
 * @route '/curriculum/admin/courses/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:19
 * @route '/curriculum/admin/courses/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:19
 * @route '/curriculum/admin/courses/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:19
 * @route '/curriculum/admin/courses/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::create
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:19
 * @route '/curriculum/admin/courses/create'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:24
 * @route '/curriculum/admin/courses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/curriculum/admin/courses',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:24
 * @route '/curriculum/admin/courses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:24
 * @route '/curriculum/admin/courses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:24
 * @route '/curriculum/admin/courses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:24
 * @route '/curriculum/admin/courses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:0
 * @route '/curriculum/admin/courses/{course}'
 */
export const show = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/courses/{course}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:0
 * @route '/curriculum/admin/courses/{course}'
 */
show.url = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: args.course,
                }

    return show.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:0
 * @route '/curriculum/admin/courses/{course}'
 */
show.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:0
 * @route '/curriculum/admin/courses/{course}'
 */
show.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:0
 * @route '/curriculum/admin/courses/{course}'
 */
    const showForm = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:0
 * @route '/curriculum/admin/courses/{course}'
 */
        showForm.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:0
 * @route '/curriculum/admin/courses/{course}'
 */
        showForm.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:30
 * @route '/curriculum/admin/courses/{course}/edit'
 */
export const edit = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/courses/{course}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:30
 * @route '/curriculum/admin/courses/{course}/edit'
 */
edit.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return edit.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:30
 * @route '/curriculum/admin/courses/{course}/edit'
 */
edit.get = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:30
 * @route '/curriculum/admin/courses/{course}/edit'
 */
edit.head = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:30
 * @route '/curriculum/admin/courses/{course}/edit'
 */
    const editForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:30
 * @route '/curriculum/admin/courses/{course}/edit'
 */
        editForm.get = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::edit
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:30
 * @route '/curriculum/admin/courses/{course}/edit'
 */
        editForm.head = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:36
 * @route '/curriculum/admin/courses/{course}'
 */
export const update = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/curriculum/admin/courses/{course}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:36
 * @route '/curriculum/admin/courses/{course}'
 */
update.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return update.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:36
 * @route '/curriculum/admin/courses/{course}'
 */
update.put = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:36
 * @route '/curriculum/admin/courses/{course}'
 */
update.patch = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:36
 * @route '/curriculum/admin/courses/{course}'
 */
    const updateForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:36
 * @route '/curriculum/admin/courses/{course}'
 */
        updateForm.put = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:36
 * @route '/curriculum/admin/courses/{course}'
 */
        updateForm.patch = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:42
 * @route '/curriculum/admin/courses/{course}'
 */
export const destroy = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/curriculum/admin/courses/{course}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:42
 * @route '/curriculum/admin/courses/{course}'
 */
destroy.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return destroy.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:42
 * @route '/curriculum/admin/courses/{course}'
 */
destroy.delete = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:42
 * @route '/curriculum/admin/courses/{course}'
 */
    const destroyForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:42
 * @route '/curriculum/admin/courses/{course}'
 */
        destroyForm.delete = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::addPrerequisite
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:43
 * @route '/curriculum/admin/courses/{course}/prerequisites'
 */
export const addPrerequisite = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPrerequisite.url(args, options),
    method: 'post',
})

addPrerequisite.definition = {
    methods: ["post"],
    url: '/curriculum/admin/courses/{course}/prerequisites',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::addPrerequisite
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:43
 * @route '/curriculum/admin/courses/{course}/prerequisites'
 */
addPrerequisite.url = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { course: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                }

    return addPrerequisite.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::addPrerequisite
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:43
 * @route '/curriculum/admin/courses/{course}/prerequisites'
 */
addPrerequisite.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addPrerequisite.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::addPrerequisite
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:43
 * @route '/curriculum/admin/courses/{course}/prerequisites'
 */
    const addPrerequisiteForm = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addPrerequisite.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::addPrerequisite
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:43
 * @route '/curriculum/admin/courses/{course}/prerequisites'
 */
        addPrerequisiteForm.post = (args: { course: number | { id: number } } | [course: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addPrerequisite.url(args, options),
            method: 'post',
        })
    
    addPrerequisite.form = addPrerequisiteForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::removePrerequisite
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:49
 * @route '/curriculum/admin/courses/{course}/prerequisites/{prerequisite}'
 */
export const removePrerequisite = (args: { course: number | { id: number }, prerequisite: number | { id: number } } | [course: number | { id: number }, prerequisite: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removePrerequisite.url(args, options),
    method: 'delete',
})

removePrerequisite.definition = {
    methods: ["delete"],
    url: '/curriculum/admin/courses/{course}/prerequisites/{prerequisite}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::removePrerequisite
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:49
 * @route '/curriculum/admin/courses/{course}/prerequisites/{prerequisite}'
 */
removePrerequisite.url = (args: { course: number | { id: number }, prerequisite: number | { id: number } } | [course: number | { id: number }, prerequisite: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                    prerequisite: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: typeof args.course === 'object'
                ? args.course.id
                : args.course,
                                prerequisite: typeof args.prerequisite === 'object'
                ? args.prerequisite.id
                : args.prerequisite,
                }

    return removePrerequisite.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace('{prerequisite}', parsedArgs.prerequisite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::removePrerequisite
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:49
 * @route '/curriculum/admin/courses/{course}/prerequisites/{prerequisite}'
 */
removePrerequisite.delete = (args: { course: number | { id: number }, prerequisite: number | { id: number } } | [course: number | { id: number }, prerequisite: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removePrerequisite.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::removePrerequisite
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:49
 * @route '/curriculum/admin/courses/{course}/prerequisites/{prerequisite}'
 */
    const removePrerequisiteForm = (args: { course: number | { id: number }, prerequisite: number | { id: number } } | [course: number | { id: number }, prerequisite: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removePrerequisite.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\CourseController::removePrerequisite
 * @see Modules/Curriculum/app/Http/Controllers/Admin/CourseController.php:49
 * @route '/curriculum/admin/courses/{course}/prerequisites/{prerequisite}'
 */
        removePrerequisiteForm.delete = (args: { course: number | { id: number }, prerequisite: number | { id: number } } | [course: number | { id: number }, prerequisite: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removePrerequisite.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removePrerequisite.form = removePrerequisiteForm
const courses = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
addPrerequisite: Object.assign(addPrerequisite, addPrerequisite),
removePrerequisite: Object.assign(removePrerequisite, removePrerequisite),
}

export default courses