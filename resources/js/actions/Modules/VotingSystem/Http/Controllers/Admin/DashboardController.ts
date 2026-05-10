import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const DashboardController = { index }

export default DashboardController