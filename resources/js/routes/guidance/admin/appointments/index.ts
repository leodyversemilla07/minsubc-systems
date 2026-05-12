import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:152
 * @route '/guidance/admin/appointments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:152
 * @route '/guidance/admin/appointments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:152
 * @route '/guidance/admin/appointments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:152
 * @route '/guidance/admin/appointments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:152
 * @route '/guidance/admin/appointments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:152
 * @route '/guidance/admin/appointments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:152
 * @route '/guidance/admin/appointments'
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
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:167
 * @route '/guidance/admin/appointments/{appointment}'
 */
export const show = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/appointments/{appointment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:167
 * @route '/guidance/admin/appointments/{appointment}'
 */
show.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return show.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:167
 * @route '/guidance/admin/appointments/{appointment}'
 */
show.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:167
 * @route '/guidance/admin/appointments/{appointment}'
 */
show.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:167
 * @route '/guidance/admin/appointments/{appointment}'
 */
    const showForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:167
 * @route '/guidance/admin/appointments/{appointment}'
 */
        showForm.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:167
 * @route '/guidance/admin/appointments/{appointment}'
 */
        showForm.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::confirm
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:173
 * @route '/guidance/admin/appointments/{appointment}/confirm'
 */
export const confirm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

confirm.definition = {
    methods: ["post"],
    url: '/guidance/admin/appointments/{appointment}/confirm',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::confirm
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:173
 * @route '/guidance/admin/appointments/{appointment}/confirm'
 */
confirm.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return confirm.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::confirm
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:173
 * @route '/guidance/admin/appointments/{appointment}/confirm'
 */
confirm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirm.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::confirm
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:173
 * @route '/guidance/admin/appointments/{appointment}/confirm'
 */
    const confirmForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: confirm.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::confirm
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:173
 * @route '/guidance/admin/appointments/{appointment}/confirm'
 */
        confirmForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: confirm.url(args, options),
            method: 'post',
        })
    
    confirm.form = confirmForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::complete
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:179
 * @route '/guidance/admin/appointments/{appointment}/complete'
 */
export const complete = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/guidance/admin/appointments/{appointment}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::complete
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:179
 * @route '/guidance/admin/appointments/{appointment}/complete'
 */
complete.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return complete.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::complete
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:179
 * @route '/guidance/admin/appointments/{appointment}/complete'
 */
complete.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::complete
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:179
 * @route '/guidance/admin/appointments/{appointment}/complete'
 */
    const completeForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::complete
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:179
 * @route '/guidance/admin/appointments/{appointment}/complete'
 */
        completeForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::cancel
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:185
 * @route '/guidance/admin/appointments/{appointment}/cancel'
 */
export const cancel = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/guidance/admin/appointments/{appointment}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::cancel
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:185
 * @route '/guidance/admin/appointments/{appointment}/cancel'
 */
cancel.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return cancel.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::cancel
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:185
 * @route '/guidance/admin/appointments/{appointment}/cancel'
 */
cancel.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::cancel
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:185
 * @route '/guidance/admin/appointments/{appointment}/cancel'
 */
    const cancelForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::cancel
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:185
 * @route '/guidance/admin/appointments/{appointment}/cancel'
 */
        cancelForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::noShow
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:193
 * @route '/guidance/admin/appointments/{appointment}/no-show'
 */
export const noShow = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: noShow.url(args, options),
    method: 'post',
})

noShow.definition = {
    methods: ["post"],
    url: '/guidance/admin/appointments/{appointment}/no-show',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::noShow
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:193
 * @route '/guidance/admin/appointments/{appointment}/no-show'
 */
noShow.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return noShow.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::noShow
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:193
 * @route '/guidance/admin/appointments/{appointment}/no-show'
 */
noShow.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: noShow.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::noShow
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:193
 * @route '/guidance/admin/appointments/{appointment}/no-show'
 */
    const noShowForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: noShow.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AppointmentController::noShow
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:193
 * @route '/guidance/admin/appointments/{appointment}/no-show'
 */
        noShowForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: noShow.url(args, options),
            method: 'post',
        })
    
    noShow.form = noShowForm
const appointments = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
confirm: Object.assign(confirm, confirm),
complete: Object.assign(complete, complete),
cancel: Object.assign(cancel, cancel),
noShow: Object.assign(noShow, noShow),
}

export default appointments