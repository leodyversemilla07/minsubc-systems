import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import analytics72d765 from './analytics'
import elections from './elections'
import candidates from './candidates'
import positions from './positions'
import partylists from './partylists'
import voters from './voters'
import activityLogs from './activity-logs'
import feedback from './feedback'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/voting/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\DashboardController::dashboard
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/DashboardController.php:20
 * @route '/voting/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/voting/admin/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

    /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
    const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(options),
        method: 'get',
    })

            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
        analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(options),
            method: 'get',
        })
            /**
* @see \Modules\VotingSystem\Http\Controllers\Admin\AnalyticsController::analytics
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/AnalyticsController.php:23
 * @route '/voting/admin/analytics'
 */
        analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    analytics.form = analyticsForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
analytics: Object.assign(analytics, analytics72d765),
elections: Object.assign(elections, elections),
candidates: Object.assign(candidates, candidates),
positions: Object.assign(positions, positions),
partylists: Object.assign(partylists, partylists),
voters: Object.assign(voters, voters),
activityLogs: Object.assign(activityLogs, activityLogs),
feedback: Object.assign(feedback, feedback),
}

export default admin