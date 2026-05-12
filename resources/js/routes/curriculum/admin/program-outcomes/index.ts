import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:14
 * @route '/curriculum/admin/program-outcomes'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/program-outcomes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:14
 * @route '/curriculum/admin/program-outcomes'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:14
 * @route '/curriculum/admin/program-outcomes'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:14
 * @route '/curriculum/admin/program-outcomes'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:14
 * @route '/curriculum/admin/program-outcomes'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:14
 * @route '/curriculum/admin/program-outcomes'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:14
 * @route '/curriculum/admin/program-outcomes'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:19
 * @route '/curriculum/admin/program-outcomes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/curriculum/admin/program-outcomes',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:19
 * @route '/curriculum/admin/program-outcomes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:19
 * @route '/curriculum/admin/program-outcomes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:19
 * @route '/curriculum/admin/program-outcomes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::store
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:19
 * @route '/curriculum/admin/program-outcomes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:0
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
export const show = (args: { program_outcome: string | number } | [program_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/program-outcomes/{program_outcome}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:0
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
show.url = (args: { program_outcome: string | number } | [program_outcome: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program_outcome: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    program_outcome: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program_outcome: args.program_outcome,
                }

    return show.definition.url
            .replace('{program_outcome}', parsedArgs.program_outcome.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:0
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
show.get = (args: { program_outcome: string | number } | [program_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:0
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
show.head = (args: { program_outcome: string | number } | [program_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:0
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
    const showForm = (args: { program_outcome: string | number } | [program_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:0
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
        showForm.get = (args: { program_outcome: string | number } | [program_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::show
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:0
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
        showForm.head = (args: { program_outcome: string | number } | [program_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:25
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
export const update = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/curriculum/admin/program-outcomes/{program_outcome}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:25
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
update.url = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program_outcome: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { program_outcome: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    program_outcome: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program_outcome: typeof args.program_outcome === 'object'
                ? args.program_outcome.id
                : args.program_outcome,
                }

    return update.definition.url
            .replace('{program_outcome}', parsedArgs.program_outcome.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:25
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
update.put = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:25
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
update.patch = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:25
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
    const updateForm = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:25
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
        updateForm.put = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::update
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:25
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
        updateForm.patch = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:31
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
export const destroy = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/curriculum/admin/program-outcomes/{program_outcome}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:31
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
destroy.url = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { program_outcome: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { program_outcome: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    program_outcome: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        program_outcome: typeof args.program_outcome === 'object'
                ? args.program_outcome.id
                : args.program_outcome,
                }

    return destroy.definition.url
            .replace('{program_outcome}', parsedArgs.program_outcome.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:31
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
destroy.delete = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:31
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
    const destroyForm = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ProgramOutcomeController::destroy
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ProgramOutcomeController.php:31
 * @route '/curriculum/admin/program-outcomes/{program_outcome}'
 */
        destroyForm.delete = (args: { program_outcome: number | { id: number } } | [program_outcome: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const programOutcomes = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default programOutcomes