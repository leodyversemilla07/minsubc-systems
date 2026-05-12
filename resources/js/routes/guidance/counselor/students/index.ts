import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::show
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
export const show = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/guidance/counselor/students/{student}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::show
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
show.url = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'student_id' in args) {
            args = { student: args.student_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.student_id
                : args.student,
                }

    return show.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::show
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
show.get = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::show
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
show.head = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::show
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
    const showForm = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::show
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
        showForm.get = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::show
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
        showForm.head = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const students = {
    show: Object.assign(show, show),
}

export default students