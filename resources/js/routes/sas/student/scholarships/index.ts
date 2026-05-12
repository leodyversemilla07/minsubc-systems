import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:20
 * @route '/sas/student/scholarships'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/student/scholarships',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:20
 * @route '/sas/student/scholarships'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:20
 * @route '/sas/student/scholarships'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:20
 * @route '/sas/student/scholarships'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:20
 * @route '/sas/student/scholarships'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:20
 * @route '/sas/student/scholarships'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::index
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:20
 * @route '/sas/student/scholarships'
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
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:42
 * @route '/sas/student/scholarships/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/student/scholarships/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:42
 * @route '/sas/student/scholarships/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:42
 * @route '/sas/student/scholarships/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:42
 * @route '/sas/student/scholarships/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:42
 * @route '/sas/student/scholarships/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:42
 * @route '/sas/student/scholarships/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::show
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:42
 * @route '/sas/student/scholarships/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::requirements
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:61
 * @route '/sas/student/scholarships/{id}/requirements'
 */
export const requirements = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requirements.url(args, options),
    method: 'get',
})

requirements.definition = {
    methods: ["get","head"],
    url: '/sas/student/scholarships/{id}/requirements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::requirements
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:61
 * @route '/sas/student/scholarships/{id}/requirements'
 */
requirements.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return requirements.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::requirements
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:61
 * @route '/sas/student/scholarships/{id}/requirements'
 */
requirements.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requirements.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::requirements
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:61
 * @route '/sas/student/scholarships/{id}/requirements'
 */
requirements.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: requirements.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::requirements
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:61
 * @route '/sas/student/scholarships/{id}/requirements'
 */
    const requirementsForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: requirements.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::requirements
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:61
 * @route '/sas/student/scholarships/{id}/requirements'
 */
        requirementsForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: requirements.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::requirements
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:61
 * @route '/sas/student/scholarships/{id}/requirements'
 */
        requirementsForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: requirements.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    requirements.form = requirementsForm
/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::uploadRequirement
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:96
 * @route '/sas/student/scholarships/{id}/upload-requirement'
 */
export const uploadRequirement = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadRequirement.url(args, options),
    method: 'post',
})

uploadRequirement.definition = {
    methods: ["post"],
    url: '/sas/student/scholarships/{id}/upload-requirement',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::uploadRequirement
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:96
 * @route '/sas/student/scholarships/{id}/upload-requirement'
 */
uploadRequirement.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return uploadRequirement.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::uploadRequirement
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:96
 * @route '/sas/student/scholarships/{id}/upload-requirement'
 */
uploadRequirement.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadRequirement.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::uploadRequirement
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:96
 * @route '/sas/student/scholarships/{id}/upload-requirement'
 */
    const uploadRequirementForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: uploadRequirement.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\SAS\Http\Controllers\Student\ScholarshipController::uploadRequirement
 * @see Modules/SAS/app/Http/Controllers/Student/ScholarshipController.php:96
 * @route '/sas/student/scholarships/{id}/upload-requirement'
 */
        uploadRequirementForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: uploadRequirement.url(args, options),
            method: 'post',
        })
    
    uploadRequirement.form = uploadRequirementForm
const scholarships = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
requirements: Object.assign(requirements, requirements),
uploadRequirement: Object.assign(uploadRequirement, uploadRequirement),
}

export default scholarships