import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
export const pdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: '/voting/admin/analytics/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
pdf.url = (options?: RouteQueryOptions) => {
    return pdf.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
pdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::pdf
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:41
 * @route '/voting/admin/analytics/export/pdf'
 */
pdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(options),
    method: 'head',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
 */
export const excel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})

excel.definition = {
    methods: ["get","head"],
    url: '/voting/admin/analytics/export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
 */
excel.url = (options?: RouteQueryOptions) => {
    return excel.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
 */
excel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: excel.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::excel
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:62
 * @route '/voting/admin/analytics/export/excel'
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