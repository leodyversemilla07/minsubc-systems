import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/admin/events',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::index
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:19
 * @route '/usg/admin/events'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/usg/admin/events/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::create
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:54
 * @route '/usg/admin/events/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::store
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:63
 * @route '/usg/admin/events'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/usg/admin/events',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::store
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:63
 * @route '/usg/admin/events'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::store
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:63
 * @route '/usg/admin/events'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
export const show = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/usg/admin/events/{event}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
show.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return show.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
show.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::show
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:75
 * @route '/usg/admin/events/{event}'
 */
show.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
export const edit = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/usg/admin/events/{event}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
edit.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return edit.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
edit.get = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:84
 * @route '/usg/admin/events/{event}/edit'
 */
edit.head = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
export const update = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/usg/admin/events/{event}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
update.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return update.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
update.put = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::update
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:95
 * @route '/usg/admin/events/{event}'
 */
update.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:109
 * @route '/usg/admin/events/{event}'
 */
export const destroy = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/usg/admin/events/{event}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:109
 * @route '/usg/admin/events/{event}'
 */
destroy.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return destroy.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:109
 * @route '/usg/admin/events/{event}'
 */
destroy.delete = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:119
 * @route '/usg/admin/events/{event}/publish'
 */
export const publish = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: publish.url(args, options),
    method: 'patch',
})

publish.definition = {
    methods: ["patch"],
    url: '/usg/admin/events/{event}/publish',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:119
 * @route '/usg/admin/events/{event}/publish'
 */
publish.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return publish.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::publish
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:119
 * @route '/usg/admin/events/{event}/publish'
 */
publish.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: publish.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::cancel
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:127
 * @route '/usg/admin/events/{event}/cancel'
 */
export const cancel = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: cancel.url(args, options),
    method: 'patch',
})

cancel.definition = {
    methods: ["patch"],
    url: '/usg/admin/events/{event}/cancel',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::cancel
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:127
 * @route '/usg/admin/events/{event}/cancel'
 */
cancel.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return cancel.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::cancel
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:127
 * @route '/usg/admin/events/{event}/cancel'
 */
cancel.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: cancel.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:135
 * @route '/usg/admin/events/{event}/archive'
 */
export const archive = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: archive.url(args, options),
    method: 'patch',
})

archive.definition = {
    methods: ["patch"],
    url: '/usg/admin/events/{event}/archive',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:135
 * @route '/usg/admin/events/{event}/archive'
 */
archive.url = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { event: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    event: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        event: args.event,
                }

    return archive.definition.url
            .replace('{event}', parsedArgs.event.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\EventController::archive
 * @see Modules/USG/app/Http/Controllers/Admin/EventController.php:135
 * @route '/usg/admin/events/{event}/archive'
 */
archive.patch = (args: { event: string | number } | [event: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: archive.url(args, options),
    method: 'patch',
})
const events = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
publish: Object.assign(publish, publish),
cancel: Object.assign(cancel, cancel),
archive: Object.assign(archive, archive),
}

export default events