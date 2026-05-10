import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\ReportController::records
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
export const records = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: records.url(options),
    method: 'get',
})

records.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports/insurance/records',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::records
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
records.url = (options?: RouteQueryOptions) => {
    return records.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\ReportController::records
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
records.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: records.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::records
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
records.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: records.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\ReportController::statistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
 */
export const statistics = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(args, options),
    method: 'get',
})

statistics.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports/insurance/statistics/{academicYear}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::statistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
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
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
 */
statistics.get = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: statistics.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::statistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
 */
statistics.head = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: statistics.url(args, options),
    method: 'head',
})
const insurance = {
    records: Object.assign(records, records),
statistics: Object.assign(statistics, statistics),
}

export default insurance