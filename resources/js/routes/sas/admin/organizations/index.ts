import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/organizations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:25
 * @route '/sas/admin/organizations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sas/admin/organizations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:42
 * @route '/sas/admin/organizations/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:57
 * @route '/sas/admin/organizations'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sas/admin/organizations',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:57
 * @route '/sas/admin/organizations'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:57
 * @route '/sas/admin/organizations'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
export const show = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/admin/organizations/{organization}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
show.url = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    organization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        organization: args.organization,
                }

    return show.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
show.get = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:68
 * @route '/sas/admin/organizations/{organization}'
 */
show.head = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
export const edit = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sas/admin/organizations/{organization}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
edit.url = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    organization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        organization: args.organization,
                }

    return edit.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
edit.get = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:80
 * @route '/sas/admin/organizations/{organization}/edit'
 */
edit.head = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
export const update = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/sas/admin/organizations/{organization}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
update.url = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    organization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        organization: args.organization,
                }

    return update.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
update.put = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:98
 * @route '/sas/admin/organizations/{organization}'
 */
update.patch = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:111
 * @route '/sas/admin/organizations/{organization}'
 */
export const destroy = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sas/admin/organizations/{organization}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:111
 * @route '/sas/admin/organizations/{organization}'
 */
destroy.url = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { organization: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    organization: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        organization: args.organization,
                }

    return destroy.definition.url
            .replace('{organization}', parsedArgs.organization.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:111
 * @route '/sas/admin/organizations/{organization}'
 */
destroy.delete = (args: { organization: string | number } | [organization: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
export const compliance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: compliance.url(options),
    method: 'get',
})

compliance.definition = {
    methods: ["get","head"],
    url: '/sas/admin/organizations-compliance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
compliance.url = (options?: RouteQueryOptions) => {
    return compliance.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
compliance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: compliance.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\OrganizationController::compliance
 * @see Modules/SAS/app/Http/Controllers/Admin/OrganizationController.php:124
 * @route '/sas/admin/organizations-compliance'
 */
compliance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: compliance.url(options),
    method: 'head',
})
const organizations = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
compliance: Object.assign(compliance, compliance),
}

export default organizations