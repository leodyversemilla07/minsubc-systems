import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
export const show = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/research/admin/issues/{issue}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
show.url = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { issue: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    issue: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        issue: args.issue,
                }

    return show.definition.url
            .replace('{issue}', parsedArgs.issue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
show.get = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
show.head = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
    const showForm = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
        showForm.get = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::show
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
        showForm.head = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
export const edit = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/research/admin/issues/{issue}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
edit.url = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { issue: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    issue: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        issue: args.issue,
                }

    return edit.definition.url
            .replace('{issue}', parsedArgs.issue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
edit.get = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
edit.head = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
    const editForm = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
        editForm.get = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::edit
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}/edit'
 */
        editForm.head = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
export const update = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/research/admin/issues/{issue}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
update.url = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { issue: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    issue: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        issue: args.issue,
                }

    return update.definition.url
            .replace('{issue}', parsedArgs.issue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
update.put = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
update.patch = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
    const updateForm = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
        updateForm.put = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::update
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
        updateForm.patch = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
export const destroy = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/research/admin/issues/{issue}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
destroy.url = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { issue: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    issue: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        issue: args.issue,
                }

    return destroy.definition.url
            .replace('{issue}', parsedArgs.issue.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
destroy.delete = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
    const destroyForm = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\JournalIssueController::destroy
 * @see Modules/Research/app/Http/Controllers/Admin/JournalIssueController.php:0
 * @route '/research/admin/issues/{issue}'
 */
        destroyForm.delete = (args: { issue: string | number } | [issue: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const issues = {
    show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default issues