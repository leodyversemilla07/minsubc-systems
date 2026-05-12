import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::submit
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:0
 * @route '/guidance/my/assessments/{assessment}/submit'
 */
export const submit = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/guidance/my/assessments/{assessment}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::submit
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:0
 * @route '/guidance/my/assessments/{assessment}/submit'
 */
submit.url = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return submit.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::submit
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:0
 * @route '/guidance/my/assessments/{assessment}/submit'
 */
submit.post = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::submit
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:0
 * @route '/guidance/my/assessments/{assessment}/submit'
 */
    const submitForm = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::submit
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:0
 * @route '/guidance/my/assessments/{assessment}/submit'
 */
        submitForm.post = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
const assessments = {
    submit: Object.assign(submit, submit),
}

export default assessments