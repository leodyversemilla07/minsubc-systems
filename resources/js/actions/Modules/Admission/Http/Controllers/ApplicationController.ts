import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
const ApplicationController = { create, store, show, submit, uploadDocument, deleteDocument, trackForm, trackStatus }

export default ApplicationController