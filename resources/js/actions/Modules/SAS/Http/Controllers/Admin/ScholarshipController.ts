import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarships',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:24
 * @route '/sas/admin/scholarships'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarships/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:49
 * @route '/sas/admin/scholarships/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:57
 * @route '/sas/admin/scholarships'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sas/admin/scholarships',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:57
 * @route '/sas/admin/scholarships'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:57
 * @route '/sas/admin/scholarships'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
export const show = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarships/{scholarship}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
show.url = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship: args.scholarship,
                }

    return show.definition.url
            .replace('{scholarship}', parsedArgs.scholarship.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
show.get = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:68
 * @route '/sas/admin/scholarships/{scholarship}'
 */
show.head = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
export const edit = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarships/{scholarship}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
edit.url = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship: args.scholarship,
                }

    return edit.definition.url
            .replace('{scholarship}', parsedArgs.scholarship.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
edit.get = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:80
 * @route '/sas/admin/scholarships/{scholarship}/edit'
 */
edit.head = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
export const update = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/sas/admin/scholarships/{scholarship}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
update.url = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship: args.scholarship,
                }

    return update.definition.url
            .replace('{scholarship}', parsedArgs.scholarship.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
update.put = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:92
 * @route '/sas/admin/scholarships/{scholarship}'
 */
update.patch = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:105
 * @route '/sas/admin/scholarships/{scholarship}'
 */
export const destroy = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sas/admin/scholarships/{scholarship}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:105
 * @route '/sas/admin/scholarships/{scholarship}'
 */
destroy.url = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship: args.scholarship,
                }

    return destroy.definition.url
            .replace('{scholarship}', parsedArgs.scholarship.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipController.php:105
 * @route '/sas/admin/scholarships/{scholarship}'
 */
destroy.delete = (args: { scholarship: string | number } | [scholarship: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ScholarshipController = { index, create, store, show, edit, update, destroy }

export default ScholarshipController