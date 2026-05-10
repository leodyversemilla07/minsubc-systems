import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:21
 * @route '/admission/admin/schedules'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission/admin/schedules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:21
 * @route '/admission/admin/schedules'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:21
 * @route '/admission/admin/schedules'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:21
 * @route '/admission/admin/schedules'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:44
 * @route '/admission/admin/schedules/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admission/admin/schedules/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:44
 * @route '/admission/admin/schedules/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:44
 * @route '/admission/admin/schedules/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:44
 * @route '/admission/admin/schedules/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:58
 * @route '/admission/admin/schedules'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admission/admin/schedules',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:58
 * @route '/admission/admin/schedules'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:58
 * @route '/admission/admin/schedules'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:87
 * @route '/admission/admin/schedules/{schedule}'
 */
export const show = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admission/admin/schedules/{schedule}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:87
 * @route '/admission/admin/schedules/{schedule}'
 */
show.url = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { schedule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { schedule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    schedule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        schedule: typeof args.schedule === 'object'
                ? args.schedule.id
                : args.schedule,
                }

    return show.definition.url
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:87
 * @route '/admission/admin/schedules/{schedule}'
 */
show.get = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:87
 * @route '/admission/admin/schedules/{schedule}'
 */
show.head = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:100
 * @route '/admission/admin/schedules/{schedule}/edit'
 */
export const edit = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admission/admin/schedules/{schedule}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:100
 * @route '/admission/admin/schedules/{schedule}/edit'
 */
edit.url = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { schedule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { schedule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    schedule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        schedule: typeof args.schedule === 'object'
                ? args.schedule.id
                : args.schedule,
                }

    return edit.definition.url
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:100
 * @route '/admission/admin/schedules/{schedule}/edit'
 */
edit.get = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:100
 * @route '/admission/admin/schedules/{schedule}/edit'
 */
edit.head = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:115
 * @route '/admission/admin/schedules/{schedule}'
 */
export const update = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admission/admin/schedules/{schedule}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:115
 * @route '/admission/admin/schedules/{schedule}'
 */
update.url = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { schedule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { schedule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    schedule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        schedule: typeof args.schedule === 'object'
                ? args.schedule.id
                : args.schedule,
                }

    return update.definition.url
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:115
 * @route '/admission/admin/schedules/{schedule}'
 */
update.patch = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:142
 * @route '/admission/admin/schedules/{schedule}'
 */
export const destroy = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admission/admin/schedules/{schedule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:142
 * @route '/admission/admin/schedules/{schedule}'
 */
destroy.url = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { schedule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { schedule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    schedule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        schedule: typeof args.schedule === 'object'
                ? args.schedule.id
                : args.schedule,
                }

    return destroy.definition.url
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:142
 * @route '/admission/admin/schedules/{schedule}'
 */
destroy.delete = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::instructorSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:152
 * @route '/admission/admin/schedules/instructor/{instructorId}'
 */
export const instructorSchedule = (args: { instructorId: string | number } | [instructorId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: instructorSchedule.url(args, options),
    method: 'get',
})

instructorSchedule.definition = {
    methods: ["get","head"],
    url: '/admission/admin/schedules/instructor/{instructorId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::instructorSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:152
 * @route '/admission/admin/schedules/instructor/{instructorId}'
 */
instructorSchedule.url = (args: { instructorId: string | number } | [instructorId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { instructorId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    instructorId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        instructorId: args.instructorId,
                }

    return instructorSchedule.definition.url
            .replace('{instructorId}', parsedArgs.instructorId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::instructorSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:152
 * @route '/admission/admin/schedules/instructor/{instructorId}'
 */
instructorSchedule.get = (args: { instructorId: string | number } | [instructorId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: instructorSchedule.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::instructorSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:152
 * @route '/admission/admin/schedules/instructor/{instructorId}'
 */
instructorSchedule.head = (args: { instructorId: string | number } | [instructorId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: instructorSchedule.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::roomSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:176
 * @route '/admission/admin/schedules/room/{room}'
 */
export const roomSchedule = (args: { room: string | number } | [room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roomSchedule.url(args, options),
    method: 'get',
})

roomSchedule.definition = {
    methods: ["get","head"],
    url: '/admission/admin/schedules/room/{room}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::roomSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:176
 * @route '/admission/admin/schedules/room/{room}'
 */
roomSchedule.url = (args: { room: string | number } | [room: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { room: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    room: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        room: args.room,
                }

    return roomSchedule.definition.url
            .replace('{room}', parsedArgs.room.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::roomSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:176
 * @route '/admission/admin/schedules/room/{room}'
 */
roomSchedule.get = (args: { room: string | number } | [room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: roomSchedule.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ScheduleController::roomSchedule
 * @see Modules/Admission/app/Http/Controllers/Admin/ScheduleController.php:176
 * @route '/admission/admin/schedules/room/{room}'
 */
roomSchedule.head = (args: { room: string | number } | [room: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: roomSchedule.url(args, options),
    method: 'head',
})
const ScheduleController = { index, create, store, show, edit, update, destroy, instructorSchedule, roomSchedule }

export default ScheduleController