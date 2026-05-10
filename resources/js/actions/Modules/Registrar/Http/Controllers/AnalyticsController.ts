import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::index
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:23
 * @route '/admin/analytics'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::index
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:23
 * @route '/admin/analytics'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::index
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:23
 * @route '/admin/analytics'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::index
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:23
 * @route '/admin/analytics'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::getData
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:40
 * @route '/admin/analytics/data'
 */
export const getData = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getData.url(options),
    method: 'get',
})

getData.definition = {
    methods: ["get","head"],
    url: '/admin/analytics/data',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::getData
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:40
 * @route '/admin/analytics/data'
 */
getData.url = (options?: RouteQueryOptions) => {
    return getData.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::getData
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:40
 * @route '/admin/analytics/data'
 */
getData.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getData.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::getData
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:40
 * @route '/admin/analytics/data'
 */
getData.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getData.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::dailyCollectionReport
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:53
 * @route '/admin/analytics/daily-collection'
 */
export const dailyCollectionReport = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dailyCollectionReport.url(options),
    method: 'get',
})

dailyCollectionReport.definition = {
    methods: ["get","head"],
    url: '/admin/analytics/daily-collection',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::dailyCollectionReport
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:53
 * @route '/admin/analytics/daily-collection'
 */
dailyCollectionReport.url = (options?: RouteQueryOptions) => {
    return dailyCollectionReport.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::dailyCollectionReport
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:53
 * @route '/admin/analytics/daily-collection'
 */
dailyCollectionReport.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dailyCollectionReport.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::dailyCollectionReport
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:53
 * @route '/admin/analytics/daily-collection'
 */
dailyCollectionReport.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dailyCollectionReport.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::exportPdf
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:63
 * @route '/admin/analytics/export/pdf'
 */
export const exportPdf = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})

exportPdf.definition = {
    methods: ["get","head"],
    url: '/admin/analytics/export/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::exportPdf
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:63
 * @route '/admin/analytics/export/pdf'
 */
exportPdf.url = (options?: RouteQueryOptions) => {
    return exportPdf.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::exportPdf
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:63
 * @route '/admin/analytics/export/pdf'
 */
exportPdf.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportPdf.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::exportPdf
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:63
 * @route '/admin/analytics/export/pdf'
 */
exportPdf.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportPdf.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::exportExcel
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:82
 * @route '/admin/analytics/export/excel'
 */
export const exportExcel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})

exportExcel.definition = {
    methods: ["get","head"],
    url: '/admin/analytics/export/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::exportExcel
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:82
 * @route '/admin/analytics/export/excel'
 */
exportExcel.url = (options?: RouteQueryOptions) => {
    return exportExcel.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::exportExcel
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:82
 * @route '/admin/analytics/export/excel'
 */
exportExcel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportExcel.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\AnalyticsController::exportExcel
 * @see Modules/Registrar/app/Http/Controllers/AnalyticsController.php:82
 * @route '/admin/analytics/export/excel'
 */
exportExcel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportExcel.url(options),
    method: 'head',
})
const AnalyticsController = { index, getData, dailyCollectionReport, exportPdf, exportExcel }

export default AnalyticsController