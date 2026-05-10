import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:17
 * @route '/admission/admin/applicants'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission/admin/applicants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:17
 * @route '/admission/admin/applicants'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:17
 * @route '/admission/admin/applicants'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:17
 * @route '/admission/admin/applicants'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:56
 * @route '/admission/admin/applicants/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admission/admin/applicants/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:56
 * @route '/admission/admin/applicants/{id}'
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
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:56
 * @route '/admission/admin/applicants/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:56
 * @route '/admission/admin/applicants/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::updateStatus
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:71
 * @route '/admission/admin/applicants/{id}/status'
 */
export const updateStatus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/admission/admin/applicants/{id}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::updateStatus
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:71
 * @route '/admission/admin/applicants/{id}/status'
 */
updateStatus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateStatus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::updateStatus
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:71
 * @route '/admission/admin/applicants/{id}/status'
 */
updateStatus.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:89
 * @route '/admission/admin/applicants/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admission/admin/applicants/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:89
 * @route '/admission/admin/applicants/{id}'
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
* @see \Modules\Admission\Http\Controllers\Admin\ApplicantController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/ApplicantController.php:89
 * @route '/admission/admin/applicants/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const applicants = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
updateStatus: Object.assign(updateStatus, updateStatus),
destroy: Object.assign(destroy, destroy),
}

export default applicants