import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::upload
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:100
 * @route '/admission/apply/{applicationNumber}/documents'
 */
export const upload = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/admission/apply/{applicationNumber}/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::upload
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:100
 * @route '/admission/apply/{applicationNumber}/documents'
 */
upload.url = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return upload.definition.url
            .replace('{applicationNumber}', parsedArgs.applicationNumber.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::upload
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:100
 * @route '/admission/apply/{applicationNumber}/documents'
 */
upload.post = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::upload
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:100
 * @route '/admission/apply/{applicationNumber}/documents'
 */
    const uploadForm = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::upload
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:100
 * @route '/admission/apply/{applicationNumber}/documents'
 */
        uploadForm.post = (args: { applicationNumber: string | number } | [applicationNumber: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(args, options),
            method: 'post',
        })
    
    upload.form = uploadForm
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::deleteMethod
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:0
 * @route '/admission/apply/{applicationNumber}/documents/{documentId}'
 */
export const deleteMethod = (args: { applicationNumber: string | number, documentId: string | number } | [applicationNumber: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/admission/apply/{applicationNumber}/documents/{documentId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::deleteMethod
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:0
 * @route '/admission/apply/{applicationNumber}/documents/{documentId}'
 */
deleteMethod.url = (args: { applicationNumber: string | number, documentId: string | number } | [applicationNumber: string | number, documentId: string | number ], options?: RouteQueryOptions) => {
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

    return deleteMethod.definition.url
            .replace('{applicationNumber}', parsedArgs.applicationNumber.toString())
            .replace('{documentId}', parsedArgs.documentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::deleteMethod
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:0
 * @route '/admission/apply/{applicationNumber}/documents/{documentId}'
 */
deleteMethod.delete = (args: { applicationNumber: string | number, documentId: string | number } | [applicationNumber: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::deleteMethod
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:0
 * @route '/admission/apply/{applicationNumber}/documents/{documentId}'
 */
    const deleteMethodForm = (args: { applicationNumber: string | number, documentId: string | number } | [applicationNumber: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\ApplicationController::deleteMethod
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:0
 * @route '/admission/apply/{applicationNumber}/documents/{documentId}'
 */
        deleteMethodForm.delete = (args: { applicationNumber: string | number, documentId: string | number } | [applicationNumber: string | number, documentId: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
const documents = {
    upload: Object.assign(upload, upload),
delete: Object.assign(deleteMethod, deleteMethod),
}

export default documents