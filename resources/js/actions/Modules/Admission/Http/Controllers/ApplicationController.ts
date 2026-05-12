import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::create
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:17
 * @route '/admission/apply'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admission/apply',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::create
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:17
 * @route '/admission/apply'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::create
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:17
 * @route '/admission/apply'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::create
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:17
 * @route '/admission/apply'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::create
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:17
 * @route '/admission/apply'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::create
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:17
 * @route '/admission/apply'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::create
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:17
 * @route '/admission/apply'
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
* @see \Modules\Admission\Http\Controllers\ApplicationController::store
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:38
 * @route '/admission/apply'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admission/apply',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::store
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:38
 * @route '/admission/apply'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::store
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:38
 * @route '/admission/apply'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::store
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:38
 * @route '/admission/apply'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::store
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:38
 * @route '/admission/apply'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::show
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:72
 * @route '/admission/apply/{applicationNumber}'
 */
export const show = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admission/apply/{applicationNumber}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::show
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:72
 * @route '/admission/apply/{applicationNumber}'
 */
show.url = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { applicationNumber: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    applicationNumber: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        applicationNumber: args.applicationNumber,
                }

    return show.definition.url
            .replace('{applicationNumber}', parsedArgs.applicationNumber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::show
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:72
 * @route '/admission/apply/{applicationNumber}'
 */
show.get = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::show
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:72
 * @route '/admission/apply/{applicationNumber}'
 */
show.head = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::show
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:72
 * @route '/admission/apply/{applicationNumber}'
 */
    const showForm = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::show
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:72
 * @route '/admission/apply/{applicationNumber}'
 */
        showForm.get = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::show
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:72
 * @route '/admission/apply/{applicationNumber}'
 */
        showForm.head = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Admission\Http\Controllers\ApplicationController::submit
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:86
 * @route '/admission/apply/{applicationNumber}/submit'
 */
export const submit = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/admission/apply/{applicationNumber}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::submit
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:86
 * @route '/admission/apply/{applicationNumber}/submit'
 */
submit.url = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { applicationNumber: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    applicationNumber: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        applicationNumber: args.applicationNumber,
                }

    return submit.definition.url
            .replace('{applicationNumber}', parsedArgs.applicationNumber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::submit
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:86
 * @route '/admission/apply/{applicationNumber}/submit'
 */
submit.post = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::submit
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:86
 * @route '/admission/apply/{applicationNumber}/submit'
 */
    const submitForm = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::submit
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:86
 * @route '/admission/apply/{applicationNumber}/submit'
 */
        submitForm.post = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::uploadDocument
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:100
 * @route '/admission/apply/{applicationNumber}/documents'
 */
export const uploadDocument = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadDocument.url(args, options),
    method: 'post',
})

uploadDocument.definition = {
    methods: ["post"],
    url: '/admission/apply/{applicationNumber}/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::uploadDocument
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:100
 * @route '/admission/apply/{applicationNumber}/documents'
 */
uploadDocument.url = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { applicationNumber: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    applicationNumber: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        applicationNumber: args.applicationNumber,
                }

    return uploadDocument.definition.url
            .replace('{applicationNumber}', parsedArgs.applicationNumber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::uploadDocument
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:100
 * @route '/admission/apply/{applicationNumber}/documents'
 */
uploadDocument.post = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadDocument.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::uploadDocument
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:100
 * @route '/admission/apply/{applicationNumber}/documents'
 */
    const uploadDocumentForm = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadDocument.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::uploadDocument
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:100
 * @route '/admission/apply/{applicationNumber}/documents'
 */
        uploadDocumentForm.post = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadDocument.url(args, options),
            method: 'post',
        })
    
    uploadDocument.form = uploadDocumentForm
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::deleteDocument
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:0
 * @route '/admission/apply/{applicationNumber}/documents/{documentId}'
 */
export const deleteDocument = (args: { applicationNumber: string | number, documentId: string | number } | [applicationNumber: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteDocument.url(args, options),
    method: 'delete',
})

deleteDocument.definition = {
    methods: ["delete"],
    url: '/admission/apply/{applicationNumber}/documents/{documentId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::deleteDocument
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:0
 * @route '/admission/apply/{applicationNumber}/documents/{documentId}'
 */
deleteDocument.url = (args: { applicationNumber: string | number, documentId: string | number } | [applicationNumber: string | number, documentId: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    applicationNumber: args[0],
                    documentId: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        applicationNumber: args.applicationNumber,
                                documentId: args.documentId,
                }

    return deleteDocument.definition.url
            .replace('{applicationNumber}', parsedArgs.applicationNumber.toString())
            .replace('{documentId}', parsedArgs.documentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::deleteDocument
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:0
 * @route '/admission/apply/{applicationNumber}/documents/{documentId}'
 */
deleteDocument.delete = (args: { applicationNumber: string | number, documentId: string | number } | [applicationNumber: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteDocument.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::deleteDocument
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:0
 * @route '/admission/apply/{applicationNumber}/documents/{documentId}'
 */
    const deleteDocumentForm = (args: { applicationNumber: string | number, documentId: string | number } | [applicationNumber: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteDocument.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::deleteDocument
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:0
 * @route '/admission/apply/{applicationNumber}/documents/{documentId}'
 */
        deleteDocumentForm.delete = (args: { applicationNumber: string | number, documentId: string | number } | [applicationNumber: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteDocument.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteDocument.form = deleteDocumentForm
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackForm
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
export const trackForm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trackForm.url(options),
    method: 'get',
})

trackForm.definition = {
    methods: ["get","head"],
    url: '/admission/track',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackForm
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
trackForm.url = (options?: RouteQueryOptions) => {
    return trackForm.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackForm
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
trackForm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trackForm.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackForm
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
trackForm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trackForm.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackForm
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
    const trackFormForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: trackForm.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackForm
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
        trackFormForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trackForm.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackForm
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
        trackFormForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trackForm.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    trackForm.form = trackFormForm
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackStatus
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:120
 * @route '/admission/track'
 */
export const trackStatus = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: trackStatus.url(options),
    method: 'post',
})

trackStatus.definition = {
    methods: ["post"],
    url: '/admission/track',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackStatus
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:120
 * @route '/admission/track'
 */
trackStatus.url = (options?: RouteQueryOptions) => {
    return trackStatus.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackStatus
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:120
 * @route '/admission/track'
 */
trackStatus.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: trackStatus.url(options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackStatus
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:120
 * @route '/admission/track'
 */
    const trackStatusForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: trackStatus.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::trackStatus
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:120
 * @route '/admission/track'
 */
        trackStatusForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: trackStatus.url(options),
            method: 'post',
        })
    
    trackStatus.form = trackStatusForm
const ApplicationController = { create, store, show, submit, uploadDocument, deleteDocument, trackForm, trackStatus }

export default ApplicationController