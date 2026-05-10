import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/usg/admin/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::index
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:21
 * @route '/usg/admin/analytics'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
export const exportPdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})

exportPdf.definition = {
    methods: ["get","head"],
    url: '/usg/admin/analytics/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
exportPdf.url = (options?: RouteQueryOptions) => {
    return exportPdf.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
exportPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::exportPdf
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:39
 * @route '/usg/admin/analytics/export/pdf'
 */
exportPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(options),
    method: 'head',
})

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
export const exportExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})

exportExcel.definition = {
    methods: ["get","head"],
    url: '/usg/admin/analytics/export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
exportExcel.url = (options?: RouteQueryOptions) => {
    return exportExcel.definition.url + queryParams(options)
}

/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
exportExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})
/**
* @see \Modules\USG\Http\Controllers\Admin\AnalyticsController::exportExcel
 * @see Modules/USG/app/Http/Controllers/Admin/AnalyticsController.php:60
 * @route '/usg/admin/analytics/export/excel'
 */
exportExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportExcel.url(options),
    method: 'head',
})
const AnalyticsController = { index, exportPdf, exportExcel }

export default AnalyticsController