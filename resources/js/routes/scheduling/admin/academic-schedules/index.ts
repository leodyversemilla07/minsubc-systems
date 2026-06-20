import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:11
 * @route '/admin/scheduling/academic-schedules'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/scheduling/academic-schedules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:11
 * @route '/admin/scheduling/academic-schedules'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:11
 * @route '/admin/scheduling/academic-schedules'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:11
 * @route '/admin/scheduling/academic-schedules'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:11
 * @route '/admin/scheduling/academic-schedules'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:11
 * @route '/admin/scheduling/academic-schedules'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::index
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:11
 * @route '/admin/scheduling/academic-schedules'
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
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::store
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:17
 * @route '/admin/scheduling/academic-schedules'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/scheduling/academic-schedules',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::store
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:17
 * @route '/admin/scheduling/academic-schedules'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::store
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:17
 * @route '/admin/scheduling/academic-schedules'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::store
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:17
 * @route '/admin/scheduling/academic-schedules'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::store
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:17
 * @route '/admin/scheduling/academic-schedules'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::update
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:33
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
export const update = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/scheduling/academic-schedules/{academic_schedule}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::update
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:33
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
update.url = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { academic_schedule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { academic_schedule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    academic_schedule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        academic_schedule: typeof args.academic_schedule === 'object'
                ? args.academic_schedule.id
                : args.academic_schedule,
                }

    return update.definition.url
            .replace('{academic_schedule}', parsedArgs.academic_schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::update
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:33
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
update.put = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::update
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:33
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
update.patch = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::update
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:33
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
    const updateForm = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::update
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:33
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
        updateForm.put = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::update
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:33
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
        updateForm.patch = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::destroy
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:49
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
export const destroy = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/scheduling/academic-schedules/{academic_schedule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::destroy
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:49
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
destroy.url = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { academic_schedule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { academic_schedule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    academic_schedule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        academic_schedule: typeof args.academic_schedule === 'object'
                ? args.academic_schedule.id
                : args.academic_schedule,
                }

    return destroy.definition.url
            .replace('{academic_schedule}', parsedArgs.academic_schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::destroy
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:49
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
destroy.delete = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::destroy
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:49
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
    const destroyForm = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Scheduling\Http\Controllers\Admin\AcademicScheduleController::destroy
 * @see Modules/Scheduling/app/Http/Controllers/Admin/AcademicScheduleController.php:49
 * @route '/admin/scheduling/academic-schedules/{academic_schedule}'
 */
        destroyForm.delete = (args: { academic_schedule: number | { id: number } } | [academic_schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const academicSchedules = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default academicSchedules