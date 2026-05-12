import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting/admin/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
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
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
export const exportPdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})

exportPdf.definition = {
    methods: ["get","head"],
    url: '/voting/admin/analytics/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
exportPdf.url = (options?: RouteQueryOptions) => {
    return exportPdf.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
exportPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
exportPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
    const exportPdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportPdf.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
        exportPdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
        exportPdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportPdf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportPdf.form = exportPdfForm
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
 */
export const exportExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})

exportExcel.definition = {
    methods: ["get","head"],
    url: '/voting/admin/analytics/export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
 */
exportExcel.url = (options?: RouteQueryOptions) => {
    return exportExcel.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
 */
exportExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
 */
exportExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportExcel.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
 */
    const exportExcelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exportExcel.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
 */
        exportExcelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportExcel.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
 */
        exportExcelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exportExcel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exportExcel.form = exportExcelForm
const AnalyticsController = { index, exportPdf, exportExcel }

export default AnalyticsController