import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
const RedirectControllerb142dad5c79ff86cd10848d439d34f79 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
    method: 'get',
})

RedirectControllerb142dad5c79ff86cd10848d439d34f79.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/vmgo',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
RedirectControllerb142dad5c79ff86cd10848d439d34f79.url = (options?: RouteQueryOptions) => {
    return RedirectControllerb142dad5c79ff86cd10848d439d34f79.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
RedirectControllerb142dad5c79ff86cd10848d439d34f79.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
RedirectControllerb142dad5c79ff86cd10848d439d34f79.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
RedirectControllerb142dad5c79ff86cd10848d439d34f79.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
RedirectControllerb142dad5c79ff86cd10848d439d34f79.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
RedirectControllerb142dad5c79ff86cd10848d439d34f79.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
RedirectControllerb142dad5c79ff86cd10848d439d34f79.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
RedirectControllerb142dad5c79ff86cd10848d439d34f79.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
    const RedirectControllerb142dad5c79ff86cd10848d439d34f79Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
        RedirectControllerb142dad5c79ff86cd10848d439d34f79Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
        RedirectControllerb142dad5c79ff86cd10848d439d34f79Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
        RedirectControllerb142dad5c79ff86cd10848d439d34f79Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
        RedirectControllerb142dad5c79ff86cd10848d439d34f79Form.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
        RedirectControllerb142dad5c79ff86cd10848d439d34f79Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
        RedirectControllerb142dad5c79ff86cd10848d439d34f79Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/vmgo'
 */
        RedirectControllerb142dad5c79ff86cd10848d439d34f79Form.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerb142dad5c79ff86cd10848d439d34f79.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectControllerb142dad5c79ff86cd10848d439d34f79.form = RedirectControllerb142dad5c79ff86cd10848d439d34f79Form
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
const RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
    method: 'get',
})

RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/officers',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url = (options?: RouteQueryOptions) => {
    return RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
    const RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
        RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
        RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
        RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027fForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
        RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027fForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
        RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027fForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
        RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027fForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/officers'
 */
        RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027fForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f.form = RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027fForm
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
const RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
    method: 'get',
})

RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/announcements',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url = (options?: RouteQueryOptions) => {
    return RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
    const RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
        RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
        RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
        RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
        RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8Form.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
        RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
        RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/announcements'
 */
        RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8Form.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8.form = RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8Form
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
const RedirectController413ac16114db49ae410d1665e728ae96 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
    method: 'get',
})

RedirectController413ac16114db49ae410d1665e728ae96.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/events',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
RedirectController413ac16114db49ae410d1665e728ae96.url = (options?: RouteQueryOptions) => {
    return RedirectController413ac16114db49ae410d1665e728ae96.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
RedirectController413ac16114db49ae410d1665e728ae96.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
RedirectController413ac16114db49ae410d1665e728ae96.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
RedirectController413ac16114db49ae410d1665e728ae96.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
RedirectController413ac16114db49ae410d1665e728ae96.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
RedirectController413ac16114db49ae410d1665e728ae96.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
RedirectController413ac16114db49ae410d1665e728ae96.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
RedirectController413ac16114db49ae410d1665e728ae96.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
    const RedirectController413ac16114db49ae410d1665e728ae96Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
        RedirectController413ac16114db49ae410d1665e728ae96Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
        RedirectController413ac16114db49ae410d1665e728ae96Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController413ac16114db49ae410d1665e728ae96.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
        RedirectController413ac16114db49ae410d1665e728ae96Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController413ac16114db49ae410d1665e728ae96.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
        RedirectController413ac16114db49ae410d1665e728ae96Form.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController413ac16114db49ae410d1665e728ae96.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
        RedirectController413ac16114db49ae410d1665e728ae96Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController413ac16114db49ae410d1665e728ae96.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
        RedirectController413ac16114db49ae410d1665e728ae96Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController413ac16114db49ae410d1665e728ae96.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/events'
 */
        RedirectController413ac16114db49ae410d1665e728ae96Form.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController413ac16114db49ae410d1665e728ae96.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController413ac16114db49ae410d1665e728ae96.form = RedirectController413ac16114db49ae410d1665e728ae96Form
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
const RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
    method: 'get',
})

RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/resolutions',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url = (options?: RouteQueryOptions) => {
    return RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
    const RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
        RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
        RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
        RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
        RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37Form.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
        RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
        RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/resolutions'
 */
        RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37Form.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37.form = RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37Form
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
const RedirectController6f10d62553514d4f8c148a820d3eeb56 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
    method: 'get',
})

RedirectController6f10d62553514d4f8c148a820d3eeb56.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/transparency',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
RedirectController6f10d62553514d4f8c148a820d3eeb56.url = (options?: RouteQueryOptions) => {
    return RedirectController6f10d62553514d4f8c148a820d3eeb56.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
RedirectController6f10d62553514d4f8c148a820d3eeb56.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
RedirectController6f10d62553514d4f8c148a820d3eeb56.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
RedirectController6f10d62553514d4f8c148a820d3eeb56.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
RedirectController6f10d62553514d4f8c148a820d3eeb56.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
RedirectController6f10d62553514d4f8c148a820d3eeb56.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
RedirectController6f10d62553514d4f8c148a820d3eeb56.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
RedirectController6f10d62553514d4f8c148a820d3eeb56.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
    const RedirectController6f10d62553514d4f8c148a820d3eeb56Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
        RedirectController6f10d62553514d4f8c148a820d3eeb56Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
        RedirectController6f10d62553514d4f8c148a820d3eeb56Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6f10d62553514d4f8c148a820d3eeb56.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
        RedirectController6f10d62553514d4f8c148a820d3eeb56Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6f10d62553514d4f8c148a820d3eeb56.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
        RedirectController6f10d62553514d4f8c148a820d3eeb56Form.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6f10d62553514d4f8c148a820d3eeb56.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
        RedirectController6f10d62553514d4f8c148a820d3eeb56Form.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6f10d62553514d4f8c148a820d3eeb56.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
        RedirectController6f10d62553514d4f8c148a820d3eeb56Form.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController6f10d62553514d4f8c148a820d3eeb56.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/transparency'
 */
        RedirectController6f10d62553514d4f8c148a820d3eeb56Form.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController6f10d62553514d4f8c148a820d3eeb56.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController6f10d62553514d4f8c148a820d3eeb56.form = RedirectController6f10d62553514d4f8c148a820d3eeb56Form
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
const RedirectController4b87d2df7e3aa853f6720faea796e36c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'get',
})

RedirectController4b87d2df7e3aa853f6720faea796e36c.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/settings',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.url = (options?: RouteQueryOptions) => {
    return RedirectController4b87d2df7e3aa853f6720faea796e36c.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
    const RedirectController4b87d2df7e3aa853f6720faea796e36cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController4b87d2df7e3aa853f6720faea796e36c.form = RedirectController4b87d2df7e3aa853f6720faea796e36cForm

const RedirectController = {
    '/vmgo': RedirectControllerb142dad5c79ff86cd10848d439d34f79,
    '/officers': RedirectControlleraf4a5ac790b7a9c98f4027f0ec58027f,
    '/announcements': RedirectControllerc6f10a055e0027df4f56e6a48e43a2d8,
    '/events': RedirectController413ac16114db49ae410d1665e728ae96,
    '/resolutions': RedirectControllerac43fa8246715d97d9dfbbd1a7f81d37,
    '/transparency': RedirectController6f10d62553514d4f8c148a820d3eeb56,
    '/settings': RedirectController4b87d2df7e3aa853f6720faea796e36c,
}

export default RedirectController