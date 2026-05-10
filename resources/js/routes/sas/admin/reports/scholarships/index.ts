import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\ReportController::recipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
export const recipients = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recipients.url(options),
    method: 'get',
})

recipients.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports/scholarships/recipients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::recipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
recipients.url = (options?: RouteQueryOptions) => {
    return recipients.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\ReportController::recipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
recipients.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: recipients.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::recipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
recipients.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: recipients.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\ReportController::approved
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
export const approved = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: approved.url(args, options),
    method: 'get',
})

approved.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::approved
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
approved.url = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    semester: args[0],
                    academicYear: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        semester: args.semester,
                                academicYear: args.academicYear,
                }

    return approved.definition.url
            .replace('{semester}', parsedArgs.semester.toString())
            .replace('{academicYear}', parsedArgs.academicYear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\ReportController::approved
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
approved.get = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: approved.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::approved
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
approved.head = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: approved.url(args, options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\ReportController::statistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
export const statistics = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(args, options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports/scholarships/statistics/{academicYear}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::statistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
statistics.url = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { academicYear: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    academicYear: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        academicYear: args.academicYear,
                }

    return statistics.definition.url
            .replace('{academicYear}', parsedArgs.academicYear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\ReportController::statistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
statistics.get = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::statistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
statistics.head = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(args, options),
    method: 'head',
})
const scholarships = {
    recipients: Object.assign(recipients, recipients),
approved: Object.assign(approved, approved),
statistics: Object.assign(statistics, statistics),
}

export default scholarships