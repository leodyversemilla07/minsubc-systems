import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::update
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:283
 * @route '/student/enrollment/{enrollment}/subjects'
 */
export const update = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/student/enrollment/{enrollment}/subjects',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::update
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:283
 * @route '/student/enrollment/{enrollment}/subjects'
 */
update.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return update.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::update
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:283
 * @route '/student/enrollment/{enrollment}/subjects'
 */
update.patch = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::update
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:283
 * @route '/student/enrollment/{enrollment}/subjects'
 */
    const updateForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::update
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:283
 * @route '/student/enrollment/{enrollment}/subjects'
 */
        updateForm.patch = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const subjects = {
    update: Object.assign(update, update),
}

export default subjects