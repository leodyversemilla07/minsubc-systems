import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\DashboardController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/admission/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const DashboardController = { index }

export default DashboardController