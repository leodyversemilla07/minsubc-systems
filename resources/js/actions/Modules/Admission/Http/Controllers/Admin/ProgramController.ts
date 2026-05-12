import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:14
 * @route '/admission/admin/programs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission/admin/programs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:14
 * @route '/admission/admin/programs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:14
 * @route '/admission/admin/programs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:14
 * @route '/admission/admin/programs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:14
 * @route '/admission/admin/programs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:14
 * @route '/admission/admin/programs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:14
 * @route '/admission/admin/programs'
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
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:37
 * @route '/admission/admin/programs/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admission/admin/programs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:37
 * @route '/admission/admin/programs/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:37
 * @route '/admission/admin/programs/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:37
 * @route '/admission/admin/programs/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:37
 * @route '/admission/admin/programs/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:37
 * @route '/admission/admin/programs/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:37
 * @route '/admission/admin/programs/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:43
 * @route '/admission/admin/programs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admission/admin/programs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:43
 * @route '/admission/admin/programs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:43
 * @route '/admission/admin/programs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:43
 * @route '/admission/admin/programs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:43
 * @route '/admission/admin/programs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:63
 * @route '/admission/admin/programs/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admission/admin/programs/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:63
 * @route '/admission/admin/programs/{id}/edit'
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
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:63
 * @route '/admission/admin/programs/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:63
 * @route '/admission/admin/programs/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:63
 * @route '/admission/admin/programs/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:63
 * @route '/admission/admin/programs/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:63
 * @route '/admission/admin/programs/{id}/edit'
 */
        editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:74
 * @route '/admission/admin/programs/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admission/admin/programs/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:74
 * @route '/admission/admin/programs/{id}'
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
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:74
 * @route '/admission/admin/programs/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:74
 * @route '/admission/admin/programs/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\ProgramController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/ProgramController.php:74
 * @route '/admission/admin/programs/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const ProgramController = { index, create, store, edit, update }

export default ProgramController