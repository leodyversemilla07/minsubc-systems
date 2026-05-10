import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:25
 * @route '/sas/admin/scholarship-recipients'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarship-recipients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:25
 * @route '/sas/admin/scholarship-recipients'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:25
 * @route '/sas/admin/scholarship-recipients'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::index
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:25
 * @route '/sas/admin/scholarship-recipients'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:49
 * @route '/sas/admin/scholarship-recipients/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarship-recipients/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:49
 * @route '/sas/admin/scholarship-recipients/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:49
 * @route '/sas/admin/scholarship-recipients/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::create
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:49
 * @route '/sas/admin/scholarship-recipients/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:61
 * @route '/sas/admin/scholarship-recipients'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sas/admin/scholarship-recipients',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:61
 * @route '/sas/admin/scholarship-recipients'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::store
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:61
 * @route '/sas/admin/scholarship-recipients'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:72
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
export const show = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarship-recipients/{scholarship_recipient}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:72
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
show.url = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship_recipient: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship_recipient: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship_recipient: args.scholarship_recipient,
                }

    return show.definition.url
            .replace('{scholarship_recipient}', parsedArgs.scholarship_recipient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:72
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
show.get = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::show
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:72
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
show.head = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:85
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}/edit'
 */
export const edit = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sas/admin/scholarship-recipients/{scholarship_recipient}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:85
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}/edit'
 */
edit.url = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship_recipient: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship_recipient: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship_recipient: args.scholarship_recipient,
                }

    return edit.definition.url
            .replace('{scholarship_recipient}', parsedArgs.scholarship_recipient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:85
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}/edit'
 */
edit.get = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::edit
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:85
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}/edit'
 */
edit.head = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:99
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
export const update = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/sas/admin/scholarship-recipients/{scholarship_recipient}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:99
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
update.url = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship_recipient: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship_recipient: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship_recipient: args.scholarship_recipient,
                }

    return update.definition.url
            .replace('{scholarship_recipient}', parsedArgs.scholarship_recipient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:99
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
update.put = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::update
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:99
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
update.patch = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:112
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
export const destroy = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sas/admin/scholarship-recipients/{scholarship_recipient}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:112
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
destroy.url = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { scholarship_recipient: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    scholarship_recipient: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        scholarship_recipient: args.scholarship_recipient,
                }

    return destroy.definition.url
            .replace('{scholarship_recipient}', parsedArgs.scholarship_recipient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Admin\ScholarshipRecipientController::destroy
 * @see Modules/SAS/app/Http/Controllers/Admin/ScholarshipRecipientController.php:112
 * @route '/sas/admin/scholarship-recipients/{scholarship_recipient}'
 */
destroy.delete = (args: { scholarship_recipient: string | number } | [scholarship_recipient: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ScholarshipRecipientController = { index, create, store, show, edit, update, destroy }

export default ScholarshipRecipientController