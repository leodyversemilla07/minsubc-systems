import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/admin/facilities/facilities'
 */
const indexca8a1890b7f3fb17fb74cb47dddcc140 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexca8a1890b7f3fb17fb74cb47dddcc140.url(options),
    method: 'get',
})

indexca8a1890b7f3fb17fb74cb47dddcc140.definition = {
    methods: ["get","head"],
    url: '/admin/facilities/facilities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/admin/facilities/facilities'
 */
indexca8a1890b7f3fb17fb74cb47dddcc140.url = (options?: RouteQueryOptions) => {
    return indexca8a1890b7f3fb17fb74cb47dddcc140.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/admin/facilities/facilities'
 */
indexca8a1890b7f3fb17fb74cb47dddcc140.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexca8a1890b7f3fb17fb74cb47dddcc140.url(options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/admin/facilities/facilities'
 */
indexca8a1890b7f3fb17fb74cb47dddcc140.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexca8a1890b7f3fb17fb74cb47dddcc140.url(options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/admin/facilities/facilities'
 */
    const indexca8a1890b7f3fb17fb74cb47dddcc140Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexca8a1890b7f3fb17fb74cb47dddcc140.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/admin/facilities/facilities'
 */
        indexca8a1890b7f3fb17fb74cb47dddcc140Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexca8a1890b7f3fb17fb74cb47dddcc140.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/admin/facilities/facilities'
 */
        indexca8a1890b7f3fb17fb74cb47dddcc140Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexca8a1890b7f3fb17fb74cb47dddcc140.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexca8a1890b7f3fb17fb74cb47dddcc140.form = indexca8a1890b7f3fb17fb74cb47dddcc140Form
    /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
const index9ac4595afb4e621a1679d2720a645491 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index9ac4595afb4e621a1679d2720a645491.url(options),
    method: 'get',
})

index9ac4595afb4e621a1679d2720a645491.definition = {
    methods: ["get","head"],
    url: '/api/facilities/facilities/facilities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
index9ac4595afb4e621a1679d2720a645491.url = (options?: RouteQueryOptions) => {
    return index9ac4595afb4e621a1679d2720a645491.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
index9ac4595afb4e621a1679d2720a645491.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index9ac4595afb4e621a1679d2720a645491.url(options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
index9ac4595afb4e621a1679d2720a645491.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index9ac4595afb4e621a1679d2720a645491.url(options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
    const index9ac4595afb4e621a1679d2720a645491Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index9ac4595afb4e621a1679d2720a645491.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
        index9ac4595afb4e621a1679d2720a645491Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index9ac4595afb4e621a1679d2720a645491.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::index
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:11
 * @route '/api/facilities/facilities/facilities'
 */
        index9ac4595afb4e621a1679d2720a645491Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index9ac4595afb4e621a1679d2720a645491.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index9ac4595afb4e621a1679d2720a645491.form = index9ac4595afb4e621a1679d2720a645491Form

export const index = {
    '/admin/facilities/facilities': indexca8a1890b7f3fb17fb74cb47dddcc140,
    '/api/facilities/facilities/facilities': index9ac4595afb4e621a1679d2720a645491,
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::create
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:17
 * @route '/admin/facilities/facilities/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/facilities/facilities/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::create
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:17
 * @route '/admin/facilities/facilities/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::create
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:17
 * @route '/admin/facilities/facilities/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::create
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:17
 * @route '/admin/facilities/facilities/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::create
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:17
 * @route '/admin/facilities/facilities/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::create
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:17
 * @route '/admin/facilities/facilities/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::create
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:17
 * @route '/admin/facilities/facilities/create'
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
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:22
 * @route '/admin/facilities/facilities'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/facilities/facilities',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:22
 * @route '/admin/facilities/facilities'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:22
 * @route '/admin/facilities/facilities'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:22
 * @route '/admin/facilities/facilities'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::store
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:22
 * @route '/admin/facilities/facilities'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:43
 * @route '/admin/facilities/facilities/{facility}'
 */
export const show = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/facilities/facilities/{facility}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:43
 * @route '/admin/facilities/facilities/{facility}'
 */
show.url = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { facility: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { facility: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    facility: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        facility: typeof args.facility === 'object'
                ? args.facility.id
                : args.facility,
                }

    return show.definition.url
            .replace('{facility}', parsedArgs.facility.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:43
 * @route '/admin/facilities/facilities/{facility}'
 */
show.get = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:43
 * @route '/admin/facilities/facilities/{facility}'
 */
show.head = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:43
 * @route '/admin/facilities/facilities/{facility}'
 */
    const showForm = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:43
 * @route '/admin/facilities/facilities/{facility}'
 */
        showForm.get = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::show
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:43
 * @route '/admin/facilities/facilities/{facility}'
 */
        showForm.head = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::edit
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:49
 * @route '/admin/facilities/facilities/{facility}/edit'
 */
export const edit = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/facilities/facilities/{facility}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::edit
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:49
 * @route '/admin/facilities/facilities/{facility}/edit'
 */
edit.url = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { facility: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { facility: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    facility: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        facility: typeof args.facility === 'object'
                ? args.facility.id
                : args.facility,
                }

    return edit.definition.url
            .replace('{facility}', parsedArgs.facility.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::edit
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:49
 * @route '/admin/facilities/facilities/{facility}/edit'
 */
edit.get = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::edit
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:49
 * @route '/admin/facilities/facilities/{facility}/edit'
 */
edit.head = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::edit
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:49
 * @route '/admin/facilities/facilities/{facility}/edit'
 */
    const editForm = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::edit
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:49
 * @route '/admin/facilities/facilities/{facility}/edit'
 */
        editForm.get = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::edit
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:49
 * @route '/admin/facilities/facilities/{facility}/edit'
 */
        editForm.head = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:54
 * @route '/admin/facilities/facilities/{facility}'
 */
export const update = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/facilities/facilities/{facility}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:54
 * @route '/admin/facilities/facilities/{facility}'
 */
update.url = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { facility: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { facility: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    facility: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        facility: typeof args.facility === 'object'
                ? args.facility.id
                : args.facility,
                }

    return update.definition.url
            .replace('{facility}', parsedArgs.facility.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:54
 * @route '/admin/facilities/facilities/{facility}'
 */
update.put = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:54
 * @route '/admin/facilities/facilities/{facility}'
 */
update.patch = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:54
 * @route '/admin/facilities/facilities/{facility}'
 */
    const updateForm = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:54
 * @route '/admin/facilities/facilities/{facility}'
 */
        updateForm.put = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::update
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:54
 * @route '/admin/facilities/facilities/{facility}'
 */
        updateForm.patch = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::destroy
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:75
 * @route '/admin/facilities/facilities/{facility}'
 */
export const destroy = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/facilities/facilities/{facility}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::destroy
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:75
 * @route '/admin/facilities/facilities/{facility}'
 */
destroy.url = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { facility: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { facility: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    facility: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        facility: typeof args.facility === 'object'
                ? args.facility.id
                : args.facility,
                }

    return destroy.definition.url
            .replace('{facility}', parsedArgs.facility.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::destroy
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:75
 * @route '/admin/facilities/facilities/{facility}'
 */
destroy.delete = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::destroy
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:75
 * @route '/admin/facilities/facilities/{facility}'
 */
    const destroyForm = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Facilities\Http\Controllers\Admin\FacilityController::destroy
 * @see Modules/Facilities/app/Http/Controllers/Admin/FacilityController.php:75
 * @route '/admin/facilities/facilities/{facility}'
 */
        destroyForm.delete = (args: { facility: number | { id: number } } | [facility: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const FacilityController = { index, create, store, show, edit, update, destroy }

export default FacilityController