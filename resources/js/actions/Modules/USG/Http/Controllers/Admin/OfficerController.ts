import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::index
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:18
 * @route '/usg/admin/officers'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/admin/officers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::index
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:18
 * @route '/usg/admin/officers'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::index
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:18
 * @route '/usg/admin/officers'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::index
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:18
 * @route '/usg/admin/officers'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::create
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:34
 * @route '/usg/admin/officers/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/usg/admin/officers/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::create
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:34
 * @route '/usg/admin/officers/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::create
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:34
 * @route '/usg/admin/officers/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::create
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:34
 * @route '/usg/admin/officers/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::store
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:42
 * @route '/usg/admin/officers'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/usg/admin/officers',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::store
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:42
 * @route '/usg/admin/officers'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::store
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:42
 * @route '/usg/admin/officers'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:51
 * @route '/usg/admin/officers/{officer}/edit'
 */
export const edit = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/usg/admin/officers/{officer}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:51
 * @route '/usg/admin/officers/{officer}/edit'
 */
edit.url = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { officer: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    officer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        officer: args.officer,
                }

    return edit.definition.url
            .replace('{officer}', parsedArgs.officer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:51
 * @route '/usg/admin/officers/{officer}/edit'
 */
edit.get = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:51
 * @route '/usg/admin/officers/{officer}/edit'
 */
edit.head = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::update
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:63
 * @route '/usg/admin/officers/{officer}'
 */
export const update = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/usg/admin/officers/{officer}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::update
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:63
 * @route '/usg/admin/officers/{officer}'
 */
update.url = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { officer: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    officer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        officer: args.officer,
                }

    return update.definition.url
            .replace('{officer}', parsedArgs.officer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::update
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:63
 * @route '/usg/admin/officers/{officer}'
 */
update.put = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::update
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:63
 * @route '/usg/admin/officers/{officer}'
 */
update.patch = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:77
 * @route '/usg/admin/officers/{officer}'
 */
export const destroy = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/usg/admin/officers/{officer}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:77
 * @route '/usg/admin/officers/{officer}'
 */
destroy.url = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { officer: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    officer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        officer: args.officer,
                }

    return destroy.definition.url
            .replace('{officer}', parsedArgs.officer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::destroy
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:77
 * @route '/usg/admin/officers/{officer}'
 */
destroy.delete = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::reorder
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:87
 * @route '/usg/admin/officers/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/usg/admin/officers/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::reorder
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:87
 * @route '/usg/admin/officers/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::reorder
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:87
 * @route '/usg/admin/officers/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::toggleActive
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:94
 * @route '/usg/admin/officers/{officer}/toggle-active'
 */
export const toggleActive = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

toggleActive.definition = {
    methods: ["patch"],
    url: '/usg/admin/officers/{officer}/toggle-active',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::toggleActive
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:94
 * @route '/usg/admin/officers/{officer}/toggle-active'
 */
toggleActive.url = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { officer: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    officer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        officer: args.officer,
                }

    return toggleActive.definition.url
            .replace('{officer}', parsedArgs.officer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\OfficerController::toggleActive
 * @see Modules/USG/app/Http/Controllers/Admin/OfficerController.php:94
 * @route '/usg/admin/officers/{officer}/toggle-active'
 */
toggleActive.patch = (args: { officer: string | number } | [officer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})
const OfficerController = { index, create, store, edit, update, destroy, reorder, toggleActive }

export default OfficerController