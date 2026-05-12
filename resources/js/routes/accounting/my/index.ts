import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::assessments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:15
 * @route '/accounting/my/assessments'
 */
export const assessments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assessments.url(options),
    method: 'get',
})

assessments.definition = {
    methods: ["get","head"],
    url: '/accounting/my/assessments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::assessments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:15
 * @route '/accounting/my/assessments'
 */
assessments.url = (options?: RouteQueryOptions) => {
    return assessments.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::assessments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:15
 * @route '/accounting/my/assessments'
 */
assessments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assessments.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::assessments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:15
 * @route '/accounting/my/assessments'
 */
assessments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assessments.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::assessments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:15
 * @route '/accounting/my/assessments'
 */
    const assessmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assessments.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::assessments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:15
 * @route '/accounting/my/assessments'
 */
        assessmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assessments.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::assessments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:15
 * @route '/accounting/my/assessments'
 */
        assessmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assessments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assessments.form = assessmentsForm
/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::payments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:26
 * @route '/accounting/my/payments'
 */
export const payments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payments.url(options),
    method: 'get',
})

payments.definition = {
    methods: ["get","head"],
    url: '/accounting/my/payments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::payments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:26
 * @route '/accounting/my/payments'
 */
payments.url = (options?: RouteQueryOptions) => {
    return payments.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::payments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:26
 * @route '/accounting/my/payments'
 */
payments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payments.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::payments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:26
 * @route '/accounting/my/payments'
 */
payments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: payments.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::payments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:26
 * @route '/accounting/my/payments'
 */
    const paymentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: payments.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::payments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:26
 * @route '/accounting/my/payments'
 */
        paymentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: payments.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::payments
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:26
 * @route '/accounting/my/payments'
 */
        paymentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: payments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    payments.form = paymentsForm
/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::invoices
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:35
 * @route '/accounting/my/invoices'
 */
export const invoices = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invoices.url(options),
    method: 'get',
})

invoices.definition = {
    methods: ["get","head"],
    url: '/accounting/my/invoices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::invoices
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:35
 * @route '/accounting/my/invoices'
 */
invoices.url = (options?: RouteQueryOptions) => {
    return invoices.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::invoices
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:35
 * @route '/accounting/my/invoices'
 */
invoices.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: invoices.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::invoices
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:35
 * @route '/accounting/my/invoices'
 */
invoices.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: invoices.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::invoices
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:35
 * @route '/accounting/my/invoices'
 */
    const invoicesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: invoices.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::invoices
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:35
 * @route '/accounting/my/invoices'
 */
        invoicesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: invoices.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::invoices
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:35
 * @route '/accounting/my/invoices'
 */
        invoicesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: invoices.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    invoices.form = invoicesForm
/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:44
 * @route '/accounting/my/ledger'
 */
export const ledger = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger.url(options),
    method: 'get',
})

ledger.definition = {
    methods: ["get","head"],
    url: '/accounting/my/ledger',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:44
 * @route '/accounting/my/ledger'
 */
ledger.url = (options?: RouteQueryOptions) => {
    return ledger.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:44
 * @route '/accounting/my/ledger'
 */
ledger.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ledger.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:44
 * @route '/accounting/my/ledger'
 */
ledger.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ledger.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:44
 * @route '/accounting/my/ledger'
 */
    const ledgerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ledger.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:44
 * @route '/accounting/my/ledger'
 */
        ledgerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ledger.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Student\MyAccountController::ledger
 * @see Modules/Accounting/app/Http/Controllers/Student/MyAccountController.php:44
 * @route '/accounting/my/ledger'
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
const my = {
    assessments: Object.assign(assessments, assessments),
payments: Object.assign(payments, payments),
invoices: Object.assign(invoices, invoices),
ledger: Object.assign(ledger, ledger),
}

export default my