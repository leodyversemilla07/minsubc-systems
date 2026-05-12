import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\ReportController::index
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:24
 * @route '/sas/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::index
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:24
 * @route '/sas/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\ReportController::index
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:24
 * @route '/sas/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::index
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:24
 * @route '/sas/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\ReportController::index
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:24
 * @route '/sas/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\ReportController::index
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:24
 * @route '/sas/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\ReportController::index
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:24
 * @route '/sas/admin/reports'
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
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipRecipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
export const scholarshipRecipients = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scholarshipRecipients.url(options),
    method: 'get',
})

scholarshipRecipients.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports/scholarships/recipients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipRecipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
scholarshipRecipients.url = (options?: RouteQueryOptions) => {
    return scholarshipRecipients.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipRecipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
scholarshipRecipients.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scholarshipRecipients.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipRecipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
scholarshipRecipients.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: scholarshipRecipients.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipRecipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
    const scholarshipRecipientsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: scholarshipRecipients.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipRecipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
        scholarshipRecipientsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: scholarshipRecipients.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipRecipients
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:34
 * @route '/sas/admin/reports/scholarships/recipients'
 */
        scholarshipRecipientsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: scholarshipRecipients.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    scholarshipRecipients.form = scholarshipRecipientsForm
/**
* @see \Modules\SAS\Http\Controllers\ReportController::approvedScholars
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
export const approvedScholars = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: approvedScholars.url(args, options),
    method: 'get',
})

approvedScholars.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::approvedScholars
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
approvedScholars.url = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions) => {
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

    return approvedScholars.definition.url
            .replace('{semester}', parsedArgs.semester.toString())
            .replace('{academicYear}', parsedArgs.academicYear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\ReportController::approvedScholars
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
approvedScholars.get = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: approvedScholars.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::approvedScholars
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
approvedScholars.head = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: approvedScholars.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\ReportController::approvedScholars
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
    const approvedScholarsForm = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: approvedScholars.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\ReportController::approvedScholars
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
        approvedScholarsForm.get = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: approvedScholars.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\ReportController::approvedScholars
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:48
 * @route '/sas/admin/reports/scholarships/approved/{semester}/{academicYear}'
 */
        approvedScholarsForm.head = (args: { semester: string | number, academicYear: string | number } | [semester: string | number, academicYear: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: approvedScholars.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    approvedScholars.form = approvedScholarsForm
/**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
export const scholarshipStatistics = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scholarshipStatistics.url(args, options),
    method: 'get',
})

scholarshipStatistics.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports/scholarships/statistics/{academicYear}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
scholarshipStatistics.url = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return scholarshipStatistics.definition.url
            .replace('{academicYear}', parsedArgs.academicYear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
scholarshipStatistics.get = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: scholarshipStatistics.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
scholarshipStatistics.head = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: scholarshipStatistics.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
    const scholarshipStatisticsForm = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: scholarshipStatistics.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
        scholarshipStatisticsForm.get = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: scholarshipStatistics.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\ReportController::scholarshipStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:56
 * @route '/sas/admin/reports/scholarships/statistics/{academicYear}'
 */
        scholarshipStatisticsForm.head = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: scholarshipStatistics.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    scholarshipStatistics.form = scholarshipStatisticsForm
/**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceRecords
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
export const insuranceRecords = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: insuranceRecords.url(options),
    method: 'get',
})

insuranceRecords.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports/insurance/records',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceRecords
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
insuranceRecords.url = (options?: RouteQueryOptions) => {
    return insuranceRecords.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceRecords
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
insuranceRecords.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: insuranceRecords.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceRecords
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
insuranceRecords.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: insuranceRecords.url(options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceRecords
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
    const insuranceRecordsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: insuranceRecords.url(options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceRecords
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
        insuranceRecordsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: insuranceRecords.url(options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceRecords
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:64
 * @route '/sas/admin/reports/insurance/records'
 */
        insuranceRecordsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: insuranceRecords.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    insuranceRecords.form = insuranceRecordsForm
/**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
 */
export const insuranceStatistics = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: insuranceStatistics.url(args, options),
    method: 'get',
})

insuranceStatistics.definition = {
    methods: ["get","head"],
    url: '/sas/admin/reports/insurance/statistics/{academicYear}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
 */
insuranceStatistics.url = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return insuranceStatistics.definition.url
            .replace('{academicYear}', parsedArgs.academicYear.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
 */
insuranceStatistics.get = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: insuranceStatistics.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
 */
insuranceStatistics.head = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: insuranceStatistics.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
 */
    const insuranceStatisticsForm = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: insuranceStatistics.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
 */
        insuranceStatisticsForm.get = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: insuranceStatistics.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\SAS\Http\Controllers\ReportController::insuranceStatistics
 * @see Modules/SAS/app/Http/Controllers/ReportController.php:78
 * @route '/sas/admin/reports/insurance/statistics/{academicYear}'
 */
        insuranceStatisticsForm.head = (args: { academicYear: string | number } | [academicYear: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: insuranceStatistics.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    insuranceStatistics.form = insuranceStatisticsForm
const ReportController = { index, scholarshipRecipients, approvedScholars, scholarshipStatistics, insuranceRecords, insuranceStatistics }

export default ReportController