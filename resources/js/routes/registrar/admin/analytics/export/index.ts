import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::pdf
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:63
 * @route '/admin/analytics/export/pdf'
 */
export const pdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/admin/analytics/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::pdf
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:63
 * @route '/admin/analytics/export/pdf'
 */
pdf.url = (options?: RouteQueryOptions) => {
    return pdf.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::pdf
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:63
 * @route '/admin/analytics/export/pdf'
 */
pdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::pdf
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:63
 * @route '/admin/analytics/export/pdf'
 */
pdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::excel
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:82
 * @route '/admin/analytics/export/excel'
 */
export const excel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})

excel.definition = {
    methods: ["get","head"],
    url: '/admin/analytics/export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::excel
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:82
 * @route '/admin/analytics/export/excel'
 */
excel.url = (options?: RouteQueryOptions) => {
    return excel.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::excel
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:82
 * @route '/admin/analytics/export/excel'
 */
excel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::excel
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:82
 * @route '/admin/analytics/export/excel'
 */
excel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: excel.url(options),
    method: 'head',
})
const exportMethod = {
    pdf: Object.assign(pdf, pdf),
excel: Object.assign(excel, excel),
}

export default exportMethod