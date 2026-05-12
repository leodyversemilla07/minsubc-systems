import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::search
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
export const search = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})

search.definition = {
    methods: ["get","head"],
    url: '/api/guidance/students/search',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::search
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
search.url = (options?: RouteQueryOptions) => {
    return search.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::search
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
search.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: search.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::search
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
search.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: search.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::search
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
    const searchForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: search.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::search
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
        searchForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Admin\CounselingSessionController::search
 * @see Modules/Guidance/app/Http/Controllers/Admin/DashboardController.php:254
 * @route '/api/guidance/students/search'
 */
        searchForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: search.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    search.form = searchForm
const students = {
    search: Object.assign(search, search),
}

export default students