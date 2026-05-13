import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:13
 * @route '/research/admin/grade-reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/grade-reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:13
 * @route '/research/admin/grade-reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:13
 * @route '/research/admin/grade-reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:13
 * @route '/research/admin/grade-reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:13
 * @route '/research/admin/grade-reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:13
 * @route '/research/admin/grade-reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:13
 * @route '/research/admin/grade-reports'
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
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::create
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/research/admin/grade-reports/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::create
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::create
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::create
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::create
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::create
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::create
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/create'
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
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::store
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:14
 * @route '/research/admin/grade-reports'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/research/admin/grade-reports',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::store
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:14
 * @route '/research/admin/grade-reports'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::store
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:14
 * @route '/research/admin/grade-reports'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::store
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:14
 * @route '/research/admin/grade-reports'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::store
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:14
 * @route '/research/admin/grade-reports'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::show
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
export const show = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/research/admin/grade-reports/{grade_report}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::show
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
show.url = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grade_report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    grade_report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        grade_report: args.grade_report,
                }

    return show.definition.url
            .replace('{grade_report}', parsedArgs.grade_report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::show
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
show.get = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::show
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
show.head = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::show
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
    const showForm = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::show
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
        showForm.get = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::show
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
        showForm.head = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}/edit'
 */
export const edit = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/research/admin/grade-reports/{grade_report}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}/edit'
 */
edit.url = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grade_report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    grade_report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        grade_report: args.grade_report,
                }

    return edit.definition.url
            .replace('{grade_report}', parsedArgs.grade_report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}/edit'
 */
edit.get = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}/edit'
 */
edit.head = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}/edit'
 */
    const editForm = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}/edit'
 */
        editForm.get = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}/edit'
 */
        editForm.head = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::update
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
export const update = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/research/admin/grade-reports/{grade_report}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::update
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
update.url = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grade_report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    grade_report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        grade_report: args.grade_report,
                }

    return update.definition.url
            .replace('{grade_report}', parsedArgs.grade_report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::update
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
update.put = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::update
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
update.patch = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::update
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
    const updateForm = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::update
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
        updateForm.put = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::update
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
        updateForm.patch = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
export const destroy = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/research/admin/grade-reports/{grade_report}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
destroy.url = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { grade_report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    grade_report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        grade_report: args.grade_report,
                }

    return destroy.definition.url
            .replace('{grade_report}', parsedArgs.grade_report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
destroy.delete = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
    const destroyForm = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\GradeReportController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/GradeReportController.php:0
 * @route '/research/admin/grade-reports/{grade_report}'
 */
        destroyForm.delete = (args: { grade_report: string | number } | [grade_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const gradeReports = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default gradeReports