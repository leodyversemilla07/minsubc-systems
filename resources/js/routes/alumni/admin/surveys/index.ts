import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:11
 * @route '/alumni/admin/surveys'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/surveys',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:11
 * @route '/alumni/admin/surveys'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:11
 * @route '/alumni/admin/surveys'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:11
 * @route '/alumni/admin/surveys'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:11
 * @route '/alumni/admin/surveys'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:11
 * @route '/alumni/admin/surveys'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:11
 * @route '/alumni/admin/surveys'
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
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:17
 * @route '/alumni/admin/surveys/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/surveys/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:17
 * @route '/alumni/admin/surveys/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:17
 * @route '/alumni/admin/surveys/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:17
 * @route '/alumni/admin/surveys/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:17
 * @route '/alumni/admin/surveys/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:17
 * @route '/alumni/admin/surveys/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::create
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:17
 * @route '/alumni/admin/surveys/create'
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
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:22
 * @route '/alumni/admin/surveys'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/alumni/admin/surveys',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:22
 * @route '/alumni/admin/surveys'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:22
 * @route '/alumni/admin/surveys'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:22
 * @route '/alumni/admin/surveys'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::store
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:22
 * @route '/alumni/admin/surveys'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:36
 * @route '/alumni/admin/surveys/{survey}'
 */
export const show = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/surveys/{survey}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:36
 * @route '/alumni/admin/surveys/{survey}'
 */
show.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { survey: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { survey: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    survey: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        survey: typeof args.survey === 'object'
                ? args.survey.id
                : args.survey,
                }

    return show.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:36
 * @route '/alumni/admin/surveys/{survey}'
 */
show.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:36
 * @route '/alumni/admin/surveys/{survey}'
 */
show.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:36
 * @route '/alumni/admin/surveys/{survey}'
 */
    const showForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:36
 * @route '/alumni/admin/surveys/{survey}'
 */
        showForm.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::show
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:36
 * @route '/alumni/admin/surveys/{survey}'
 */
        showForm.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:42
 * @route '/alumni/admin/surveys/{survey}/edit'
 */
export const edit = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/surveys/{survey}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:42
 * @route '/alumni/admin/surveys/{survey}/edit'
 */
edit.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { survey: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { survey: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    survey: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        survey: typeof args.survey === 'object'
                ? args.survey.id
                : args.survey,
                }

    return edit.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:42
 * @route '/alumni/admin/surveys/{survey}/edit'
 */
edit.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:42
 * @route '/alumni/admin/surveys/{survey}/edit'
 */
edit.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:42
 * @route '/alumni/admin/surveys/{survey}/edit'
 */
    const editForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:42
 * @route '/alumni/admin/surveys/{survey}/edit'
 */
        editForm.get = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::edit
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:42
 * @route '/alumni/admin/surveys/{survey}/edit'
 */
        editForm.head = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:47
 * @route '/alumni/admin/surveys/{survey}'
 */
export const update = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/alumni/admin/surveys/{survey}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:47
 * @route '/alumni/admin/surveys/{survey}'
 */
update.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { survey: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { survey: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    survey: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        survey: typeof args.survey === 'object'
                ? args.survey.id
                : args.survey,
                }

    return update.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:47
 * @route '/alumni/admin/surveys/{survey}'
 */
update.put = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:47
 * @route '/alumni/admin/surveys/{survey}'
 */
update.patch = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:47
 * @route '/alumni/admin/surveys/{survey}'
 */
    const updateForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:47
 * @route '/alumni/admin/surveys/{survey}'
 */
        updateForm.put = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::update
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:47
 * @route '/alumni/admin/surveys/{survey}'
 */
        updateForm.patch = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:58
 * @route '/alumni/admin/surveys/{survey}'
 */
export const destroy = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/alumni/admin/surveys/{survey}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:58
 * @route '/alumni/admin/surveys/{survey}'
 */
destroy.url = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { survey: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { survey: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    survey: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        survey: typeof args.survey === 'object'
                ? args.survey.id
                : args.survey,
                }

    return destroy.definition.url
            .replace('{survey}', parsedArgs.survey.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:58
 * @route '/alumni/admin/surveys/{survey}'
 */
destroy.delete = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:58
 * @route '/alumni/admin/surveys/{survey}'
 */
    const destroyForm = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\SurveyController::destroy
 * @see Modules/Alumni/app/Http/Controllers/Admin/SurveyController.php:58
 * @route '/alumni/admin/surveys/{survey}'
 */
        destroyForm.delete = (args: { survey: number | { id: number } } | [survey: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const surveys = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default surveys