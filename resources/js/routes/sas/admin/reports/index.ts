import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
import scholarships from './scholarships'
import insurance from './insurance'
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
const reports = {
    index: Object.assign(index, index),
scholarships: Object.assign(scholarships, scholarships),
insurance: Object.assign(insurance, insurance),
}

export default reports