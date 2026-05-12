import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:17
 * @route '/accounting/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:17
 * @route '/accounting/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:17
 * @route '/accounting/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:17
 * @route '/accounting/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:17
 * @route '/accounting/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:17
 * @route '/accounting/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:17
 * @route '/accounting/admin/reports'
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
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::collections
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:22
 * @route '/accounting/admin/reports/collections'
 */
export const collections = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: collections.url(options),
    method: 'get',
})

collections.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/reports/collections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::collections
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:22
 * @route '/accounting/admin/reports/collections'
 */
collections.url = (options?: RouteQueryOptions) => {
    return collections.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::collections
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:22
 * @route '/accounting/admin/reports/collections'
 */
collections.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: collections.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::collections
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:22
 * @route '/accounting/admin/reports/collections'
 */
collections.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: collections.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::collections
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:22
 * @route '/accounting/admin/reports/collections'
 */
    const collectionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: collections.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::collections
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:22
 * @route '/accounting/admin/reports/collections'
 */
        collectionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: collections.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::collections
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:22
 * @route '/accounting/admin/reports/collections'
 */
        collectionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: collections.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    collections.form = collectionsForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::aging
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:28
 * @route '/accounting/admin/reports/aging'
 */
export const aging = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: aging.url(options),
    method: 'get',
})

aging.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/reports/aging',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::aging
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:28
 * @route '/accounting/admin/reports/aging'
 */
aging.url = (options?: RouteQueryOptions) => {
    return aging.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::aging
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:28
 * @route '/accounting/admin/reports/aging'
 */
aging.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: aging.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::aging
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:28
 * @route '/accounting/admin/reports/aging'
 */
aging.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: aging.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::aging
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:28
 * @route '/accounting/admin/reports/aging'
 */
    const agingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: aging.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::aging
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:28
 * @route '/accounting/admin/reports/aging'
 */
        agingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: aging.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::aging
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:28
 * @route '/accounting/admin/reports/aging'
 */
        agingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: aging.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    aging.form = agingForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:34
 * @route '/accounting/admin/reports/ledger'
 */
export const ledger = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger.url(options),
    method: 'get',
})

ledger.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/reports/ledger',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:34
 * @route '/accounting/admin/reports/ledger'
 */
ledger.url = (options?: RouteQueryOptions) => {
    return ledger.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:34
 * @route '/accounting/admin/reports/ledger'
 */
ledger.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:34
 * @route '/accounting/admin/reports/ledger'
 */
ledger.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ledger.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:34
 * @route '/accounting/admin/reports/ledger'
 */
    const ledgerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ledger.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:34
 * @route '/accounting/admin/reports/ledger'
 */
        ledgerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledger.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:34
 * @route '/accounting/admin/reports/ledger'
 */
        ledgerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledger.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ledger.form = ledgerForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::journal
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:40
 * @route '/accounting/admin/reports/journal'
 */
export const journal = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: journal.url(options),
    method: 'get',
})

journal.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/reports/journal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::journal
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:40
 * @route '/accounting/admin/reports/journal'
 */
journal.url = (options?: RouteQueryOptions) => {
    return journal.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::journal
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:40
 * @route '/accounting/admin/reports/journal'
 */
journal.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: journal.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::journal
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:40
 * @route '/accounting/admin/reports/journal'
 */
journal.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: journal.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::journal
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:40
 * @route '/accounting/admin/reports/journal'
 */
    const journalForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: journal.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::journal
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:40
 * @route '/accounting/admin/reports/journal'
 */
        journalForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: journal.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::journal
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:40
 * @route '/accounting/admin/reports/journal'
 */
        journalForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: journal.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    journal.form = journalForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::trialBalance
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:0
 * @route '/accounting/admin/reports/trial-balance'
 */
export const trialBalance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trialBalance.url(options),
    method: 'get',
})

trialBalance.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/reports/trial-balance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::trialBalance
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:0
 * @route '/accounting/admin/reports/trial-balance'
 */
trialBalance.url = (options?: RouteQueryOptions) => {
    return trialBalance.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::trialBalance
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:0
 * @route '/accounting/admin/reports/trial-balance'
 */
trialBalance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trialBalance.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::trialBalance
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:0
 * @route '/accounting/admin/reports/trial-balance'
 */
trialBalance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trialBalance.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::trialBalance
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:0
 * @route '/accounting/admin/reports/trial-balance'
 */
    const trialBalanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: trialBalance.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::trialBalance
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:0
 * @route '/accounting/admin/reports/trial-balance'
 */
        trialBalanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trialBalance.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\ReportController::trialBalance
 * @see Modules/Accounting/app/Http/Controllers/Admin/ReportController.php:0
 * @route '/accounting/admin/reports/trial-balance'
 */
        trialBalanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: trialBalance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    trialBalance.form = trialBalanceForm
const reports = {
    index: Object.assign(index, index),
collections: Object.assign(collections, collections),
aging: Object.assign(aging, aging),
ledger: Object.assign(ledger, ledger),
journal: Object.assign(journal, journal),
trialBalance: Object.assign(trialBalance, trialBalance),
}

export default reports