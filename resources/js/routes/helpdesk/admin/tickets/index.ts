import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:13
 * @route '/admin/helpdesk/tickets'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/helpdesk/tickets',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:13
 * @route '/admin/helpdesk/tickets'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:13
 * @route '/admin/helpdesk/tickets'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:13
 * @route '/admin/helpdesk/tickets'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:13
 * @route '/admin/helpdesk/tickets'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:13
 * @route '/admin/helpdesk/tickets'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::index
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:13
 * @route '/admin/helpdesk/tickets'
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:20
 * @route '/admin/helpdesk/tickets/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/helpdesk/tickets/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:20
 * @route '/admin/helpdesk/tickets/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:20
 * @route '/admin/helpdesk/tickets/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:20
 * @route '/admin/helpdesk/tickets/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:20
 * @route '/admin/helpdesk/tickets/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:20
 * @route '/admin/helpdesk/tickets/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::create
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:20
 * @route '/admin/helpdesk/tickets/create'
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::store
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:26
 * @route '/admin/helpdesk/tickets'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/helpdesk/tickets',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::store
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:26
 * @route '/admin/helpdesk/tickets'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::store
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:26
 * @route '/admin/helpdesk/tickets'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::store
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:26
 * @route '/admin/helpdesk/tickets'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::store
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:26
 * @route '/admin/helpdesk/tickets'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::show
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:40
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
export const show = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/helpdesk/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::show
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:40
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
show.url = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return show.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::show
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:40
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
show.get = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::show
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:40
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
show.head = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::show
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:40
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
    const showForm = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::show
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:40
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
        showForm.get = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::show
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:40
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
        showForm.head = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}/edit'
 */
export const edit = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/helpdesk/tickets/{ticket}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}/edit'
 */
edit.url = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: args.ticket,
                }

    return edit.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}/edit'
 */
edit.get = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}/edit'
 */
edit.head = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}/edit'
 */
    const editForm = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}/edit'
 */
        editForm.get = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::edit
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}/edit'
 */
        editForm.head = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
export const update = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/helpdesk/tickets/{ticket}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
update.url = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: args.ticket,
                }

    return update.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
update.put = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
update.patch = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
    const updateForm = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
        updateForm.put = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::update
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
        updateForm.patch = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::destroy
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
export const destroy = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/helpdesk/tickets/{ticket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::destroy
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
destroy.url = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: args.ticket,
                }

    return destroy.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::destroy
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
destroy.delete = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::destroy
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
    const destroyForm = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::destroy
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:0
 * @route '/admin/helpdesk/tickets/{ticket}'
 */
        destroyForm.delete = (args: { ticket: string | number } | [ticket: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::assign
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:46
 * @route '/admin/helpdesk/tickets/{ticket}/assign'
 */
export const assign = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assign.url(args, options),
    method: 'patch',
})

assign.definition = {
    methods: ["patch"],
    url: '/admin/helpdesk/tickets/{ticket}/assign',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::assign
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:46
 * @route '/admin/helpdesk/tickets/{ticket}/assign'
 */
assign.url = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return assign.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::assign
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:46
 * @route '/admin/helpdesk/tickets/{ticket}/assign'
 */
assign.patch = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: assign.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::assign
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:46
 * @route '/admin/helpdesk/tickets/{ticket}/assign'
 */
    const assignForm = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: assign.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::assign
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:46
 * @route '/admin/helpdesk/tickets/{ticket}/assign'
 */
        assignForm.patch = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: assign.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    assign.form = assignForm
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::resolve
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:53
 * @route '/admin/helpdesk/tickets/{ticket}/resolve'
 */
export const resolve = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: resolve.url(args, options),
    method: 'patch',
})

resolve.definition = {
    methods: ["patch"],
    url: '/admin/helpdesk/tickets/{ticket}/resolve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::resolve
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:53
 * @route '/admin/helpdesk/tickets/{ticket}/resolve'
 */
resolve.url = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return resolve.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::resolve
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:53
 * @route '/admin/helpdesk/tickets/{ticket}/resolve'
 */
resolve.patch = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: resolve.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::resolve
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:53
 * @route '/admin/helpdesk/tickets/{ticket}/resolve'
 */
    const resolveForm = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resolve.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::resolve
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:53
 * @route '/admin/helpdesk/tickets/{ticket}/resolve'
 */
        resolveForm.patch = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resolve.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    resolve.form = resolveForm
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::close
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:59
 * @route '/admin/helpdesk/tickets/{ticket}/close'
 */
export const close = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: close.url(args, options),
    method: 'patch',
})

close.definition = {
    methods: ["patch"],
    url: '/admin/helpdesk/tickets/{ticket}/close',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::close
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:59
 * @route '/admin/helpdesk/tickets/{ticket}/close'
 */
close.url = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return close.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::close
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:59
 * @route '/admin/helpdesk/tickets/{ticket}/close'
 */
close.patch = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: close.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::close
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:59
 * @route '/admin/helpdesk/tickets/{ticket}/close'
 */
    const closeForm = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: close.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::close
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:59
 * @route '/admin/helpdesk/tickets/{ticket}/close'
 */
        closeForm.patch = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: close.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    close.form = closeForm
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::reopen
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:65
 * @route '/admin/helpdesk/tickets/{ticket}/reopen'
 */
export const reopen = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reopen.url(args, options),
    method: 'patch',
})

reopen.definition = {
    methods: ["patch"],
    url: '/admin/helpdesk/tickets/{ticket}/reopen',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::reopen
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:65
 * @route '/admin/helpdesk/tickets/{ticket}/reopen'
 */
reopen.url = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return reopen.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::reopen
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:65
 * @route '/admin/helpdesk/tickets/{ticket}/reopen'
 */
reopen.patch = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reopen.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::reopen
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:65
 * @route '/admin/helpdesk/tickets/{ticket}/reopen'
 */
    const reopenForm = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reopen.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::reopen
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:65
 * @route '/admin/helpdesk/tickets/{ticket}/reopen'
 */
        reopenForm.patch = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reopen.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    reopen.form = reopenForm
/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::comment
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:71
 * @route '/admin/helpdesk/tickets/{ticket}/comments'
 */
export const comment = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: comment.url(args, options),
    method: 'post',
})

comment.definition = {
    methods: ["post"],
    url: '/admin/helpdesk/tickets/{ticket}/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::comment
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:71
 * @route '/admin/helpdesk/tickets/{ticket}/comments'
 */
comment.url = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return comment.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::comment
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:71
 * @route '/admin/helpdesk/tickets/{ticket}/comments'
 */
comment.post = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: comment.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::comment
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:71
 * @route '/admin/helpdesk/tickets/{ticket}/comments'
 */
    const commentForm = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: comment.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Helpdesk\Http\Controllers\Admin\TicketController::comment
 * @see Modules/Helpdesk/app/Http/Controllers/Admin/TicketController.php:71
 * @route '/admin/helpdesk/tickets/{ticket}/comments'
 */
        commentForm.post = (args: { ticket: string | number | { id: string | number } } | [ticket: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: comment.url(args, options),
            method: 'post',
        })
    
    comment.form = commentForm
const tickets = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
assign: Object.assign(assign, assign),
resolve: Object.assign(resolve, resolve),
close: Object.assign(close, close),
reopen: Object.assign(reopen, reopen),
comment: Object.assign(comment, comment),
}

export default tickets