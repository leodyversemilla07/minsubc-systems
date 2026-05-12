import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:267
 * @route '/guidance/admin/assessments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/assessments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:267
 * @route '/guidance/admin/assessments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:267
 * @route '/guidance/admin/assessments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:267
 * @route '/guidance/admin/assessments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:267
 * @route '/guidance/admin/assessments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:267
 * @route '/guidance/admin/assessments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::index
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:267
 * @route '/guidance/admin/assessments'
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
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:282
 * @route '/guidance/admin/assessments/{assessment}'
 */
export const show = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/assessments/{assessment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:282
 * @route '/guidance/admin/assessments/{assessment}'
 */
show.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return show.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:282
 * @route '/guidance/admin/assessments/{assessment}'
 */
show.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:282
 * @route '/guidance/admin/assessments/{assessment}'
 */
show.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:282
 * @route '/guidance/admin/assessments/{assessment}'
 */
    const showForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:282
 * @route '/guidance/admin/assessments/{assessment}'
 */
        showForm.get = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::show
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:282
 * @route '/guidance/admin/assessments/{assessment}'
 */
        showForm.head = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::review
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:288
 * @route '/guidance/admin/assessments/{assessment}/review'
 */
export const review = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: review.url(args, options),
    method: 'post',
})

review.definition = {
    methods: ["post"],
    url: '/guidance/admin/assessments/{assessment}/review',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::review
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:288
 * @route '/guidance/admin/assessments/{assessment}/review'
 */
review.url = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { assessment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: typeof args.assessment === 'object'
                ? args.assessment.id
                : args.assessment,
                }

    return review.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::review
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:288
 * @route '/guidance/admin/assessments/{assessment}/review'
 */
review.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: review.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::review
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:288
 * @route '/guidance/admin/assessments/{assessment}/review'
 */
    const reviewForm = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: review.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::review
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:288
 * @route '/guidance/admin/assessments/{assessment}/review'
 */
        reviewForm.post = (args: { assessment: number | { id: number } } | [assessment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: review.url(args, options),
            method: 'post',
        })
    
    review.form = reviewForm
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/assessments/{assessment}/print'
 */
export const print = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/guidance/admin/assessments/{assessment}/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/assessments/{assessment}/print'
 */
print.url = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: args.assessment,
                }

    return print.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/assessments/{assessment}/print'
 */
print.get = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/assessments/{assessment}/print'
 */
print.head = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/assessments/{assessment}/print'
 */
    const printForm = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: print.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/assessments/{assessment}/print'
 */
        printForm.get = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: print.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\AssessmentController::print
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:0
 * @route '/guidance/admin/assessments/{assessment}/print'
 */
        printForm.head = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: print.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    print.form = printForm
const assessments = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
review: Object.assign(review, review),
print: Object.assign(print, print),
}

export default assessments