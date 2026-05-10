import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/insurance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:25
 * @route '/sas/admin/insurance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/admin/insurance/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:42
 * @route '/sas/admin/insurance/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sas/admin/insurance/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
 */
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:54
 * @route '/sas/admin/insurance/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:66
 * @route '/sas/admin/insurance/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/sas/admin/insurance/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:66
 * @route '/sas/admin/insurance/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:66
 * @route '/sas/admin/insurance/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:124
 * @route '/sas/admin/insurance/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sas/admin/insurance/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:124
 * @route '/sas/admin/insurance/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:124
 * @route '/sas/admin/insurance/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:79
 * @route '/sas/admin/insurance/{id}/approve'
 */
export const approve = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/sas/admin/insurance/{id}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:79
 * @route '/sas/admin/insurance/{id}/approve'
 */
approve.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return approve.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::approve
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:79
 * @route '/sas/admin/insurance/{id}/approve'
 */
approve.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:98
 * @route '/sas/admin/insurance/{id}/reject'
 */
export const reject = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/sas/admin/insurance/{id}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:98
 * @route '/sas/admin/insurance/{id}/reject'
 */
reject.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return reject.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\InsuranceController::reject
 * @see Modules/SAS/app/Http/Controllers/Admin/InsuranceController.php:98
 * @route '/sas/admin/insurance/{id}/reject'
 */
reject.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})
const InsuranceController = { index, show, edit, update, destroy, approve, reject }

export default InsuranceController