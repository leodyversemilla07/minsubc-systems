import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
export const bySection = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bySection.url(args, options),
    method: 'get',
})

bySection.definition = {
    methods: ["get","head"],
    url: '/api/admission/enrollments/by-section/{sectionId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
bySection.url = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sectionId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    sectionId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sectionId: args.sectionId,
                }

    return bySection.definition.url
            .replace('{sectionId}', parsedArgs.sectionId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
bySection.get = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bySection.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\EnrollmentController::bySection
 * @see Modules/Admission/app/Http/Controllers/Admin/EnrollmentController.php:362
 * @route '/api/admission/enrollments/by-section/{sectionId}'
 */
bySection.head = (args: { sectionId: string | number } | [sectionId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bySection.url(args, options),
    method: 'head',
})
const enrollments = {
    bySection: Object.assign(bySection, bySection),
}

export default enrollments