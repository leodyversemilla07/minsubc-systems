import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
export const pdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/usg/admin/analytics/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
pdf.url = (options?: RouteQueryOptions) => {
    return pdf.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
pdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
pdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
    const pdfForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pdf.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
        pdfForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
        pdfForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pdf.form = pdfForm
/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
export const excel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})

excel.definition = {
    methods: ["get","head"],
    url: '/usg/admin/analytics/export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
excel.url = (options?: RouteQueryOptions) => {
    return excel.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
excel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
excel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: excel.url(options),
    method: 'head',
})

    /**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
    const excelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: excel.url(options),
        method: 'get',
    })

            /**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
        excelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: excel.url(options),
            method: 'get',
        })
            /**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
        excelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: excel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    excel.form = excelForm
const exportMethod = {
    pdf: Object.assign(pdf, pdf),
excel: Object.assign(excel, excel),
}

export default exportMethod