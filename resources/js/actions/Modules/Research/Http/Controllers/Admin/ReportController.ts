import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/research/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/research/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/research/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/research/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/research/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/research/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/research/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::index
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/research/admin/reports'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::proposalsStatus
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/research/admin/reports/proposals-status'
 */
export const proposalsStatus = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proposalsStatus.url(options),
    method: 'get',
})

proposalsStatus.definition = {
    methods: ["get","head"],
    url: '/research/admin/reports/proposals-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::proposalsStatus
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/research/admin/reports/proposals-status'
 */
proposalsStatus.url = (options?: RouteQueryOptions) => {
    return proposalsStatus.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::proposalsStatus
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/research/admin/reports/proposals-status'
 */
proposalsStatus.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: proposalsStatus.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::proposalsStatus
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/research/admin/reports/proposals-status'
 */
proposalsStatus.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: proposalsStatus.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::proposalsStatus
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/research/admin/reports/proposals-status'
 */
    const proposalsStatusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: proposalsStatus.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::proposalsStatus
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/research/admin/reports/proposals-status'
 */
        proposalsStatusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: proposalsStatus.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::proposalsStatus
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/research/admin/reports/proposals-status'
 */
        proposalsStatusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: proposalsStatus.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    proposalsStatus.form = proposalsStatusForm
/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::panelSummary
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/research/admin/reports/panel-summary'
 */
export const panelSummary = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: panelSummary.url(options),
    method: 'get',
})

panelSummary.definition = {
    methods: ["get","head"],
    url: '/research/admin/reports/panel-summary',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::panelSummary
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/research/admin/reports/panel-summary'
 */
panelSummary.url = (options?: RouteQueryOptions) => {
    return panelSummary.definition.url + queryParams(options)
}

/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::panelSummary
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/research/admin/reports/panel-summary'
 */
panelSummary.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: panelSummary.url(options),
    method: 'get',
})
/**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::panelSummary
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/research/admin/reports/panel-summary'
 */
panelSummary.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: panelSummary.url(options),
    method: 'head',
})

    /**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::panelSummary
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/research/admin/reports/panel-summary'
 */
    const panelSummaryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: panelSummary.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::panelSummary
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/research/admin/reports/panel-summary'
 */
        panelSummaryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: panelSummary.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Research\Http\Controllers\Admin\ReportController::panelSummary
 * @see Modules/Research/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/research/admin/reports/panel-summary'
 */
        panelSummaryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: panelSummary.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    panelSummary.form = panelSummaryForm
const ReportController = { index, proposalsStatus, panelSummary }

export default ReportController