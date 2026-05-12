import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/admission/subjects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
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
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
export const byCourse = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourse.url(args, options),
    method: 'get',
})

byCourse.definition = {
    methods: ["get","head"],
    url: '/api/admission/subjects/by-course/{courseId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
byCourse.url = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { courseId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    courseId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        courseId: args.courseId,
                }

    return byCourse.definition.url
            .replace('{courseId}', parsedArgs.courseId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
byCourse.get = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourse.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
byCourse.head = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byCourse.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
    const byCourseForm = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: byCourse.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
        byCourseForm.get = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourse.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
        byCourseForm.head = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourse.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    byCourse.form = byCourseForm
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
export const byCourseLevel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourseLevel.url(options),
    method: 'get',
})

byCourseLevel.definition = {
    methods: ["get","head"],
    url: '/api/admission/subjects/by-course-level',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
byCourseLevel.url = (options?: RouteQueryOptions) => {
    return byCourseLevel.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
byCourseLevel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourseLevel.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
byCourseLevel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byCourseLevel.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
    const byCourseLevelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: byCourseLevel.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
        byCourseLevelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourseLevel.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
        byCourseLevelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourseLevel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    byCourseLevel.form = byCourseLevelForm
const subjects = {
    index: Object.assign(index, index),
byCourse: Object.assign(byCourse, byCourse),
byCourseLevel: Object.assign(byCourseLevel, byCourseLevel),
}

export default subjects