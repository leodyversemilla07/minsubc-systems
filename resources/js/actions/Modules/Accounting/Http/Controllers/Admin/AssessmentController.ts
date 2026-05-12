import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:20
 * @route '/accounting/admin/assessments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/assessments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:20
 * @route '/accounting/admin/assessments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:20
 * @route '/accounting/admin/assessments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:20
 * @route '/accounting/admin/assessments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:20
 * @route '/accounting/admin/assessments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:20
 * @route '/accounting/admin/assessments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:20
 * @route '/accounting/admin/assessments'
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
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:34
 * @route '/accounting/admin/assessments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/assessments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:34
 * @route '/accounting/admin/assessments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:34
 * @route '/accounting/admin/assessments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:34
 * @route '/accounting/admin/assessments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:34
 * @route '/accounting/admin/assessments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:34
 * @route '/accounting/admin/assessments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::create
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:34
 * @route '/accounting/admin/assessments/create'
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
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:41
 * @route '/accounting/admin/assessments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/accounting/admin/assessments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:41
 * @route '/accounting/admin/assessments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:41
 * @route '/accounting/admin/assessments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:41
 * @route '/accounting/admin/assessments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::store
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:41
 * @route '/accounting/admin/assessments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:60
 * @route '/accounting/admin/assessments/{assessment}'
 */
export const show = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/assessments/{assessment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:60
 * @route '/accounting/admin/assessments/{assessment}'
 */
show.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return show.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:60
 * @route '/accounting/admin/assessments/{assessment}'
 */
show.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:60
 * @route '/accounting/admin/assessments/{assessment}'
 */
show.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:60
 * @route '/accounting/admin/assessments/{assessment}'
 */
    const showForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:60
 * @route '/accounting/admin/assessments/{assessment}'
 */
        showForm.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:60
 * @route '/accounting/admin/assessments/{assessment}'
 */
        showForm.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/edit'
 */
export const edit = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/assessments/{assessment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/edit'
 */
edit.url = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: args.assessment,
                }

    return edit.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/edit'
 */
edit.get = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/edit'
 */
edit.head = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/edit'
 */
    const editForm = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/edit'
 */
        editForm.get = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::edit
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/edit'
 */
        editForm.head = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}'
 */
export const update = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/accounting/admin/assessments/{assessment}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}'
 */
update.url = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: args.assessment,
                }

    return update.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}'
 */
update.put = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}'
 */
    const updateForm = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::update
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}'
 */
        updateForm.put = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}'
 */
export const destroy = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/accounting/admin/assessments/{assessment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}'
 */
destroy.url = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: args.assessment,
                }

    return destroy.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}'
 */
destroy.delete = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}'
 */
    const destroyForm = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::destroy
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}'
 */
        destroyForm.delete = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::applyDiscount
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/apply-discount'
 */
export const applyDiscount = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: applyDiscount.url(args, options),
    method: 'post',
})

applyDiscount.definition = {
    methods: ["post"],
    url: '/accounting/admin/assessments/{assessment}/apply-discount',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::applyDiscount
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/apply-discount'
 */
applyDiscount.url = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: args.assessment,
                }

    return applyDiscount.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::applyDiscount
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/apply-discount'
 */
applyDiscount.post = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: applyDiscount.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::applyDiscount
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/apply-discount'
 */
    const applyDiscountForm = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: applyDiscount.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::applyDiscount
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/apply-discount'
 */
        applyDiscountForm.post = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: applyDiscount.url(args, options),
            method: 'post',
        })
    
    applyDiscount.form = applyDiscountForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::waive
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/waive'
 */
export const waive = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: waive.url(args, options),
    method: 'post',
})

waive.definition = {
    methods: ["post"],
    url: '/accounting/admin/assessments/{assessment}/waive',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::waive
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/waive'
 */
waive.url = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: args.assessment,
                }

    return waive.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::waive
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/waive'
 */
waive.post = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: waive.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::waive
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/waive'
 */
    const waiveForm = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: waive.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::waive
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:0
 * @route '/accounting/admin/assessments/{assessment}/waive'
 */
        waiveForm.post = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: waive.url(args, options),
            method: 'post',
        })
    
    waive.form = waiveForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::searchStudents
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
export const searchStudents = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchStudents.url(options),
    method: 'get',
})

searchStudents.definition = {
    methods: ["get","head"],
    url: '/api/accounting/students/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::searchStudents
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
searchStudents.url = (options?: RouteQueryOptions) => {
    return searchStudents.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::searchStudents
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
searchStudents.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: searchStudents.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::searchStudents
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
searchStudents.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: searchStudents.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::searchStudents
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
    const searchStudentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: searchStudents.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::searchStudents
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
        searchStudentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: searchStudents.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\AssessmentController::searchStudents
 * @see Modules/Accounting/app/Http/Controllers/Admin/AssessmentController.php:66
 * @route '/api/accounting/students/search'
 */
        searchStudentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: searchStudents.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    searchStudents.form = searchStudentsForm
const AssessmentController = { index, create, store, show, edit, update, destroy, applyDiscount, waive, searchStudents }

export default AssessmentController