import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
const bySection56b580f6d3222e48cd53d0eec2b32079 = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bySection56b580f6d3222e48cd53d0eec2b32079.url(args, options),
    method: 'get',
})

bySection56b580f6d3222e48cd53d0eec2b32079.definition = {
    methods: ["get","head"],
    url: '/api/admission/enrollments/by-section/{sectionId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
bySection56b580f6d3222e48cd53d0eec2b32079.url = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sectionId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    sectionId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sectionId: args.sectionId,
                }

    return bySection56b580f6d3222e48cd53d0eec2b32079.definition.url
            .replace('{sectionId}', parsedArgs.sectionId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
bySection56b580f6d3222e48cd53d0eec2b32079.get = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bySection56b580f6d3222e48cd53d0eec2b32079.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
bySection56b580f6d3222e48cd53d0eec2b32079.head = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bySection56b580f6d3222e48cd53d0eec2b32079.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
    const bySection56b580f6d3222e48cd53d0eec2b32079Form = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bySection56b580f6d3222e48cd53d0eec2b32079.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
        bySection56b580f6d3222e48cd53d0eec2b32079Form.get = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bySection56b580f6d3222e48cd53d0eec2b32079.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
        bySection56b580f6d3222e48cd53d0eec2b32079Form.head = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bySection56b580f6d3222e48cd53d0eec2b32079.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bySection56b580f6d3222e48cd53d0eec2b32079.form = bySection56b580f6d3222e48cd53d0eec2b32079Form
    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/admission/admin/enrollments/by-section/{sectionId}'
 */
const bySection94a944914e20347a61b49ece7621451b = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bySection94a944914e20347a61b49ece7621451b.url(args, options),
    method: 'get',
})

bySection94a944914e20347a61b49ece7621451b.definition = {
    methods: ["get","head"],
    url: '/admission/admin/enrollments/by-section/{sectionId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/admission/admin/enrollments/by-section/{sectionId}'
 */
bySection94a944914e20347a61b49ece7621451b.url = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sectionId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    sectionId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sectionId: args.sectionId,
                }

    return bySection94a944914e20347a61b49ece7621451b.definition.url
            .replace('{sectionId}', parsedArgs.sectionId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/admission/admin/enrollments/by-section/{sectionId}'
 */
bySection94a944914e20347a61b49ece7621451b.get = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bySection94a944914e20347a61b49ece7621451b.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/admission/admin/enrollments/by-section/{sectionId}'
 */
bySection94a944914e20347a61b49ece7621451b.head = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bySection94a944914e20347a61b49ece7621451b.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/admission/admin/enrollments/by-section/{sectionId}'
 */
    const bySection94a944914e20347a61b49ece7621451bForm = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bySection94a944914e20347a61b49ece7621451b.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/admission/admin/enrollments/by-section/{sectionId}'
 */
        bySection94a944914e20347a61b49ece7621451bForm.get = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bySection94a944914e20347a61b49ece7621451b.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/admission/admin/enrollments/by-section/{sectionId}'
 */
        bySection94a944914e20347a61b49ece7621451bForm.head = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bySection94a944914e20347a61b49ece7621451b.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bySection94a944914e20347a61b49ece7621451b.form = bySection94a944914e20347a61b49ece7621451bForm

export const bySection = {
    '/api/admission/enrollments/by-section/{sectionId}': bySection56b580f6d3222e48cd53d0eec2b32079,
    '/admission/admin/enrollments/by-section/{sectionId}': bySection94a944914e20347a61b49ece7621451b,
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:30
 * @route '/admission/admin/enrollments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission/admin/enrollments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:30
 * @route '/admission/admin/enrollments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:30
 * @route '/admission/admin/enrollments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:30
 * @route '/admission/admin/enrollments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:30
 * @route '/admission/admin/enrollments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:30
 * @route '/admission/admin/enrollments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:30
 * @route '/admission/admin/enrollments'
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
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:66
 * @route '/admission/admin/enrollments/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admission/admin/enrollments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:66
 * @route '/admission/admin/enrollments/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:66
 * @route '/admission/admin/enrollments/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:66
 * @route '/admission/admin/enrollments/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:66
 * @route '/admission/admin/enrollments/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:66
 * @route '/admission/admin/enrollments/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:66
 * @route '/admission/admin/enrollments/create'
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
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:89
 * @route '/admission/admin/enrollments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admission/admin/enrollments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:89
 * @route '/admission/admin/enrollments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:89
 * @route '/admission/admin/enrollments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:89
 * @route '/admission/admin/enrollments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:89
 * @route '/admission/admin/enrollments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:128
 * @route '/admission/admin/enrollments/{enrollment}'
 */
export const show = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admission/admin/enrollments/{enrollment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:128
 * @route '/admission/admin/enrollments/{enrollment}'
 */
show.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return show.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:128
 * @route '/admission/admin/enrollments/{enrollment}'
 */
show.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:128
 * @route '/admission/admin/enrollments/{enrollment}'
 */
show.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:128
 * @route '/admission/admin/enrollments/{enrollment}'
 */
    const showForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:128
 * @route '/admission/admin/enrollments/{enrollment}'
 */
        showForm.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:128
 * @route '/admission/admin/enrollments/{enrollment}'
 */
        showForm.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:164
 * @route '/admission/admin/enrollments/{enrollment}/edit'
 */
export const edit = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admission/admin/enrollments/{enrollment}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:164
 * @route '/admission/admin/enrollments/{enrollment}/edit'
 */
edit.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return edit.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:164
 * @route '/admission/admin/enrollments/{enrollment}/edit'
 */
edit.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:164
 * @route '/admission/admin/enrollments/{enrollment}/edit'
 */
edit.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:164
 * @route '/admission/admin/enrollments/{enrollment}/edit'
 */
    const editForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:164
 * @route '/admission/admin/enrollments/{enrollment}/edit'
 */
        editForm.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:164
 * @route '/admission/admin/enrollments/{enrollment}/edit'
 */
        editForm.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:181
 * @route '/admission/admin/enrollments/{enrollment}'
 */
export const update = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admission/admin/enrollments/{enrollment}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:181
 * @route '/admission/admin/enrollments/{enrollment}'
 */
update.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return update.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:181
 * @route '/admission/admin/enrollments/{enrollment}'
 */
update.patch = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:181
 * @route '/admission/admin/enrollments/{enrollment}'
 */
    const updateForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:181
 * @route '/admission/admin/enrollments/{enrollment}'
 */
        updateForm.patch = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:211
 * @route '/admission/admin/enrollments/{enrollment}'
 */
export const destroy = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admission/admin/enrollments/{enrollment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:211
 * @route '/admission/admin/enrollments/{enrollment}'
 */
destroy.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return destroy.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:211
 * @route '/admission/admin/enrollments/{enrollment}'
 */
destroy.delete = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:211
 * @route '/admission/admin/enrollments/{enrollment}'
 */
    const destroyForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:211
 * @route '/admission/admin/enrollments/{enrollment}'
 */
        destroyForm.delete = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::confirm
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:375
 * @route '/admission/admin/enrollments/{enrollment}/confirm'
 */
export const confirm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

confirm.definition = {
    methods: ["post"],
    url: '/admission/admin/enrollments/{enrollment}/confirm',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::confirm
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:375
 * @route '/admission/admin/enrollments/{enrollment}/confirm'
 */
confirm.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return confirm.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::confirm
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:375
 * @route '/admission/admin/enrollments/{enrollment}/confirm'
 */
confirm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::confirm
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:375
 * @route '/admission/admin/enrollments/{enrollment}/confirm'
 */
    const confirmForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirm.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::confirm
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:375
 * @route '/admission/admin/enrollments/{enrollment}/confirm'
 */
        confirmForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirm.url(args, options),
            method: 'post',
        })
    
    confirm.form = confirmForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::assignSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:229
 * @route '/admission/admin/enrollments/{enrollment}/assign-subjects'
 */
export const assignSubjects = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignSubjects.url(args, options),
    method: 'post',
})

assignSubjects.definition = {
    methods: ["post"],
    url: '/admission/admin/enrollments/{enrollment}/assign-subjects',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::assignSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:229
 * @route '/admission/admin/enrollments/{enrollment}/assign-subjects'
 */
assignSubjects.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return assignSubjects.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::assignSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:229
 * @route '/admission/admin/enrollments/{enrollment}/assign-subjects'
 */
assignSubjects.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignSubjects.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::assignSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:229
 * @route '/admission/admin/enrollments/{enrollment}/assign-subjects'
 */
    const assignSubjectsForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assignSubjects.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::assignSubjects
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:229
 * @route '/admission/admin/enrollments/{enrollment}/assign-subjects'
 */
        assignSubjectsForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assignSubjects.url(args, options),
            method: 'post',
        })
    
    assignSubjects.form = assignSubjectsForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::dropSubject
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:251
 * @route '/admission/admin/enrollments/{enrollment}/drop-subject/{subjectId}'
 */
export const dropSubject = (args: { enrollment: number | { id: number }, subjectId: string | number } | [enrollment: number | { id: number }, subjectId: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dropSubject.url(args, options),
    method: 'post',
})

dropSubject.definition = {
    methods: ["post"],
    url: '/admission/admin/enrollments/{enrollment}/drop-subject/{subjectId}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::dropSubject
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:251
 * @route '/admission/admin/enrollments/{enrollment}/drop-subject/{subjectId}'
 */
dropSubject.url = (args: { enrollment: number | { id: number }, subjectId: string | number } | [enrollment: number | { id: number }, subjectId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                    subjectId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                                subjectId: args.subjectId,
                }

    return dropSubject.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace('{subjectId}', parsedArgs.subjectId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::dropSubject
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:251
 * @route '/admission/admin/enrollments/{enrollment}/drop-subject/{subjectId}'
 */
dropSubject.post = (args: { enrollment: number | { id: number }, subjectId: string | number } | [enrollment: number | { id: number }, subjectId: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dropSubject.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::dropSubject
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:251
 * @route '/admission/admin/enrollments/{enrollment}/drop-subject/{subjectId}'
 */
    const dropSubjectForm = (args: { enrollment: number | { id: number }, subjectId: string | number } | [enrollment: number | { id: number }, subjectId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dropSubject.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::dropSubject
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:251
 * @route '/admission/admin/enrollments/{enrollment}/drop-subject/{subjectId}'
 */
        dropSubjectForm.post = (args: { enrollment: number | { id: number }, subjectId: string | number } | [enrollment: number | { id: number }, subjectId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dropSubject.url(args, options),
            method: 'post',
        })
    
    dropSubject.form = dropSubjectForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::recordPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:263
 * @route '/admission/admin/enrollments/{enrollment}/record-payment'
 */
export const recordPayment = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordPayment.url(args, options),
    method: 'post',
})

recordPayment.definition = {
    methods: ["post"],
    url: '/admission/admin/enrollments/{enrollment}/record-payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::recordPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:263
 * @route '/admission/admin/enrollments/{enrollment}/record-payment'
 */
recordPayment.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return recordPayment.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::recordPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:263
 * @route '/admission/admin/enrollments/{enrollment}/record-payment'
 */
recordPayment.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordPayment.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::recordPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:263
 * @route '/admission/admin/enrollments/{enrollment}/record-payment'
 */
    const recordPaymentForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: recordPayment.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::recordPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:263
 * @route '/admission/admin/enrollments/{enrollment}/record-payment'
 */
        recordPaymentForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: recordPayment.url(args, options),
            method: 'post',
        })
    
    recordPayment.form = recordPaymentForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reEnroll
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:313
 * @route '/admission/admin/enrollments/{enrollment}/re-enroll'
 */
export const reEnroll = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reEnroll.url(args, options),
    method: 'post',
})

reEnroll.definition = {
    methods: ["post"],
    url: '/admission/admin/enrollments/{enrollment}/re-enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reEnroll
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:313
 * @route '/admission/admin/enrollments/{enrollment}/re-enroll'
 */
reEnroll.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return reEnroll.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reEnroll
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:313
 * @route '/admission/admin/enrollments/{enrollment}/re-enroll'
 */
reEnroll.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reEnroll.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reEnroll
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:313
 * @route '/admission/admin/enrollments/{enrollment}/re-enroll'
 */
    const reEnrollForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reEnroll.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reEnroll
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:313
 * @route '/admission/admin/enrollments/{enrollment}/re-enroll'
 */
        reEnrollForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reEnroll.url(args, options),
            method: 'post',
        })
    
    reEnroll.form = reEnrollForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::verifyPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:283
 * @route '/admission/admin/enrollments/payments/{payment}/verify'
 */
export const verifyPayment = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyPayment.url(args, options),
    method: 'post',
})

verifyPayment.definition = {
    methods: ["post"],
    url: '/admission/admin/enrollments/payments/{payment}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::verifyPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:283
 * @route '/admission/admin/enrollments/payments/{payment}/verify'
 */
verifyPayment.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return verifyPayment.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::verifyPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:283
 * @route '/admission/admin/enrollments/payments/{payment}/verify'
 */
verifyPayment.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyPayment.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::verifyPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:283
 * @route '/admission/admin/enrollments/payments/{payment}/verify'
 */
    const verifyPaymentForm = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verifyPayment.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::verifyPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:283
 * @route '/admission/admin/enrollments/payments/{payment}/verify'
 */
        verifyPaymentForm.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verifyPayment.url(args, options),
            method: 'post',
        })
    
    verifyPayment.form = verifyPaymentForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::rejectPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:296
 * @route '/admission/admin/enrollments/payments/{payment}/reject'
 */
export const rejectPayment = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectPayment.url(args, options),
    method: 'post',
})

rejectPayment.definition = {
    methods: ["post"],
    url: '/admission/admin/enrollments/payments/{payment}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::rejectPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:296
 * @route '/admission/admin/enrollments/payments/{payment}/reject'
 */
rejectPayment.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return rejectPayment.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::rejectPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:296
 * @route '/admission/admin/enrollments/payments/{payment}/reject'
 */
rejectPayment.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectPayment.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::rejectPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:296
 * @route '/admission/admin/enrollments/payments/{payment}/reject'
 */
    const rejectPaymentForm = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rejectPayment.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::rejectPayment
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:296
 * @route '/admission/admin/enrollments/payments/{payment}/reject'
 */
        rejectPaymentForm.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rejectPayment.url(args, options),
            method: 'post',
        })
    
    rejectPayment.form = rejectPaymentForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reports
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:341
 * @route '/admission/admin/enrollments/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: '/admission/admin/enrollments/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reports
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:341
 * @route '/admission/admin/enrollments/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reports
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:341
 * @route '/admission/admin/enrollments/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reports
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:341
 * @route '/admission/admin/enrollments/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reports
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:341
 * @route '/admission/admin/enrollments/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reports
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:341
 * @route '/admission/admin/enrollments/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reports
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:341
 * @route '/admission/admin/enrollments/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
const EnrollmentController = { bySection, index, create, store, show, edit, update, destroy, confirm, assignSubjects, dropSubject, recordPayment, reEnroll, verifyPayment, rejectPayment, reports }

export default EnrollmentController