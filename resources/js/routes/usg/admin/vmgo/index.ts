import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:16
 * @route '/usg/admin/vmgo/edit'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/usg/admin/vmgo/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:16
 * @route '/usg/admin/vmgo/edit'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:16
 * @route '/usg/admin/vmgo/edit'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:16
 * @route '/usg/admin/vmgo/edit'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:16
 * @route '/usg/admin/vmgo/edit'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:16
 * @route '/usg/admin/vmgo/edit'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::edit
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:16
 * @route '/usg/admin/vmgo/edit'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::update
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:25
 * @route '/usg/admin/vmgo'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/usg/admin/vmgo',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::update
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:25
 * @route '/usg/admin/vmgo'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::update
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:25
 * @route '/usg/admin/vmgo'
 */
update.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(options),
    method: 'patch',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::update
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:25
 * @route '/usg/admin/vmgo'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::update
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:25
 * @route '/usg/admin/vmgo'
 */
        updateForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::history
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:40
 * @route '/usg/admin/vmgo/history'
 */
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/usg/admin/vmgo/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::history
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:40
 * @route '/usg/admin/vmgo/history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::history
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:40
 * @route '/usg/admin/vmgo/history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::history
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:40
 * @route '/usg/admin/vmgo/history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::history
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:40
 * @route '/usg/admin/vmgo/history'
 */
    const historyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::history
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:40
 * @route '/usg/admin/vmgo/history'
 */
        historyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\VMGOController::history
 * @see Modules/USG/app/Http/Controllers/Admin/VMGOController.php:40
 * @route '/usg/admin/vmgo/history'
 */
        historyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
const vmgo = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
history: Object.assign(history, history),
}

export default vmgo