import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::verify
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:283
 * @route '/admission/admin/enrollments/payments/{payment}/verify'
 */
export const verify = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/admission/admin/enrollments/payments/{payment}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::verify
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:283
 * @route '/admission/admin/enrollments/payments/{payment}/verify'
 */
verify.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return verify.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::verify
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:283
 * @route '/admission/admin/enrollments/payments/{payment}/verify'
 */
verify.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reject
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:296
 * @route '/admission/admin/enrollments/payments/{payment}/reject'
 */
export const reject = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/admission/admin/enrollments/payments/{payment}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reject
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:296
 * @route '/admission/admin/enrollments/payments/{payment}/reject'
 */
reject.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return reject.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::reject
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:296
 * @route '/admission/admin/enrollments/payments/{payment}/reject'
 */
reject.post = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})
const payments = {
    verify: Object.assign(verify, verify),
reject: Object.assign(reject, reject),
}

export default payments