import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submit
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/my/enrollment/{enrollment}/payment'
 */
export const submit = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/my/enrollment/{enrollment}/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submit
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/my/enrollment/{enrollment}/payment'
 */
submit.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return submit.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submit
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/my/enrollment/{enrollment}/payment'
 */
submit.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submit
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/my/enrollment/{enrollment}/payment'
 */
    const submitForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submit
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/my/enrollment/{enrollment}/payment'
 */
        submitForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
const payment = {
    submit: Object.assign(submit, submit),
}

export default payment