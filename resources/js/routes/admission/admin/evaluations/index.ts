import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\EvaluationController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/EvaluationController.php:14
 * @route '/admission/admin/applicants/{applicantId}/evaluate'
 */
export const store = (args: { applicantId: string | number } | [applicantId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admission/admin/applicants/{applicantId}/evaluate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EvaluationController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/EvaluationController.php:14
 * @route '/admission/admin/applicants/{applicantId}/evaluate'
 */
store.url = (args: { applicantId: string | number } | [applicantId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { applicantId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    applicantId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        applicantId: args.applicantId,
                }

    return store.definition.url
            .replace('{applicantId}', parsedArgs.applicantId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EvaluationController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/EvaluationController.php:14
 * @route '/admission/admin/applicants/{applicantId}/evaluate'
 */
store.post = (args: { applicantId: string | number } | [applicantId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})
const evaluations = {
    store: Object.assign(store, store),
}

export default evaluations