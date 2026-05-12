import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:402
 * @route '/guidance/admin/incident-reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/incident-reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:402
 * @route '/guidance/admin/incident-reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:402
 * @route '/guidance/admin/incident-reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:402
 * @route '/guidance/admin/incident-reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:402
 * @route '/guidance/admin/incident-reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:402
 * @route '/guidance/admin/incident-reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:402
 * @route '/guidance/admin/incident-reports'
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
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:409
 * @route '/guidance/admin/incident-reports/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/incident-reports/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:409
 * @route '/guidance/admin/incident-reports/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:409
 * @route '/guidance/admin/incident-reports/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:409
 * @route '/guidance/admin/incident-reports/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:409
 * @route '/guidance/admin/incident-reports/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:409
 * @route '/guidance/admin/incident-reports/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::create
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:409
 * @route '/guidance/admin/incident-reports/create'
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
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:414
 * @route '/guidance/admin/incident-reports'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/guidance/admin/incident-reports',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:414
 * @route '/guidance/admin/incident-reports'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:414
 * @route '/guidance/admin/incident-reports'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:414
 * @route '/guidance/admin/incident-reports'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::store
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:414
 * @route '/guidance/admin/incident-reports'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:431
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
export const show = (args: { incident_report: number | { id: number } } | [incident_report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/incident-reports/{incident_report}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:431
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
show.url = (args: { incident_report: number | { id: number } } | [incident_report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incident_report: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { incident_report: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    incident_report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incident_report: typeof args.incident_report === 'object'
                ? args.incident_report.id
                : args.incident_report,
                }

    return show.definition.url
            .replace('{incident_report}', parsedArgs.incident_report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:431
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
show.get = (args: { incident_report: number | { id: number } } | [incident_report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:431
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
show.head = (args: { incident_report: number | { id: number } } | [incident_report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:431
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
    const showForm = (args: { incident_report: number | { id: number } } | [incident_report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:431
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
        showForm.get = (args: { incident_report: number | { id: number } } | [incident_report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:431
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
        showForm.head = (args: { incident_report: number | { id: number } } | [incident_report: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}/edit'
 */
export const edit = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/incident-reports/{incident_report}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}/edit'
 */
edit.url = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incident_report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    incident_report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incident_report: args.incident_report,
                }

    return edit.definition.url
            .replace('{incident_report}', parsedArgs.incident_report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}/edit'
 */
edit.get = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}/edit'
 */
edit.head = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}/edit'
 */
    const editForm = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}/edit'
 */
        editForm.get = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::edit
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}/edit'
 */
        editForm.head = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
export const update = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/guidance/admin/incident-reports/{incident_report}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
update.url = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incident_report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    incident_report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incident_report: args.incident_report,
                }

    return update.definition.url
            .replace('{incident_report}', parsedArgs.incident_report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
update.put = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
update.patch = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
    const updateForm = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
        updateForm.put = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::update
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
        updateForm.patch = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
export const destroy = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/guidance/admin/incident-reports/{incident_report}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
destroy.url = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incident_report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    incident_report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incident_report: args.incident_report,
                }

    return destroy.definition.url
            .replace('{incident_report}', parsedArgs.incident_report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
destroy.delete = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
    const destroyForm = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::destroy
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/incident-reports/{incident_report}'
 */
        destroyForm.delete = (args: { incident_report: string | number } | [incident_report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::resolve
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:437
 * @route '/guidance/admin/incident-reports/{incidentReport}/resolve'
 */
export const resolve = (args: { incidentReport: number | { id: number } } | [incidentReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resolve.url(args, options),
    method: 'post',
})

resolve.definition = {
    methods: ["post"],
    url: '/guidance/admin/incident-reports/{incidentReport}/resolve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::resolve
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:437
 * @route '/guidance/admin/incident-reports/{incidentReport}/resolve'
 */
resolve.url = (args: { incidentReport: number | { id: number } } | [incidentReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { incidentReport: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { incidentReport: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    incidentReport: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        incidentReport: typeof args.incidentReport === 'object'
                ? args.incidentReport.id
                : args.incidentReport,
                }

    return resolve.definition.url
            .replace('{incidentReport}', parsedArgs.incidentReport.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::resolve
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:437
 * @route '/guidance/admin/incident-reports/{incidentReport}/resolve'
 */
resolve.post = (args: { incidentReport: number | { id: number } } | [incidentReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resolve.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::resolve
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:437
 * @route '/guidance/admin/incident-reports/{incidentReport}/resolve'
 */
    const resolveForm = (args: { incidentReport: number | { id: number } } | [incidentReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resolve.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\IncidentReportController::resolve
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:437
 * @route '/guidance/admin/incident-reports/{incidentReport}/resolve'
 */
        resolveForm.post = (args: { incidentReport: number | { id: number } } | [incidentReport: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resolve.url(args, options),
            method: 'post',
        })
    
    resolve.form = resolveForm
const IncidentReportController = { index, create, store, show, edit, update, destroy, resolve }

export default IncidentReportController