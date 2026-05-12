import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:12
 * @route '/accounting/admin/invoices'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/invoices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:12
 * @route '/accounting/admin/invoices'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:12
 * @route '/accounting/admin/invoices'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:12
 * @route '/accounting/admin/invoices'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:12
 * @route '/accounting/admin/invoices'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:12
 * @route '/accounting/admin/invoices'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::index
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:12
 * @route '/accounting/admin/invoices'
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
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:19
 * @route '/accounting/admin/invoices/{invoice}'
 */
export const show = (args: { invoice: number | { id: number } } | [invoice: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/invoices/{invoice}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:19
 * @route '/accounting/admin/invoices/{invoice}'
 */
show.url = (args: { invoice: number | { id: number } } | [invoice: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invoice: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { invoice: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    invoice: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invoice: typeof args.invoice === 'object'
                ? args.invoice.id
                : args.invoice,
                }

    return show.definition.url
            .replace('{invoice}', parsedArgs.invoice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:19
 * @route '/accounting/admin/invoices/{invoice}'
 */
show.get = (args: { invoice: number | { id: number } } | [invoice: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:19
 * @route '/accounting/admin/invoices/{invoice}'
 */
show.head = (args: { invoice: number | { id: number } } | [invoice: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:19
 * @route '/accounting/admin/invoices/{invoice}'
 */
    const showForm = (args: { invoice: number | { id: number } } | [invoice: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:19
 * @route '/accounting/admin/invoices/{invoice}'
 */
        showForm.get = (args: { invoice: number | { id: number } } | [invoice: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::show
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:19
 * @route '/accounting/admin/invoices/{invoice}'
 */
        showForm.head = (args: { invoice: number | { id: number } } | [invoice: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::send
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/send'
 */
export const send = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(args, options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/accounting/admin/invoices/{invoice}/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::send
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/send'
 */
send.url = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invoice: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    invoice: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invoice: args.invoice,
                }

    return send.definition.url
            .replace('{invoice}', parsedArgs.invoice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::send
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/send'
 */
send.post = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::send
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/send'
 */
    const sendForm = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: send.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::send
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/send'
 */
        sendForm.post = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: send.url(args, options),
            method: 'post',
        })
    
    send.form = sendForm
/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::downloadPdf
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/pdf'
 */
export const downloadPdf = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf.url(args, options),
    method: 'get',
})

downloadPdf.definition = {
    methods: ["get","head"],
    url: '/accounting/admin/invoices/{invoice}/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::downloadPdf
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/pdf'
 */
downloadPdf.url = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invoice: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    invoice: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        invoice: args.invoice,
                }

    return downloadPdf.definition.url
            .replace('{invoice}', parsedArgs.invoice.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::downloadPdf
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/pdf'
 */
downloadPdf.get = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPdf.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::downloadPdf
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/pdf'
 */
downloadPdf.head = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadPdf.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::downloadPdf
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/pdf'
 */
    const downloadPdfForm = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadPdf.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::downloadPdf
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/pdf'
 */
        downloadPdfForm.get = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadPdf.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Accounting\Http\Controllers\Admin\InvoiceController::downloadPdf
 * @see Modules/Accounting/app/Http/Controllers/Admin/InvoiceController.php:0
 * @route '/accounting/admin/invoices/{invoice}/pdf'
 */
        downloadPdfForm.head = (args: { invoice: string | number } | [invoice: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadPdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadPdf.form = downloadPdfForm
const InvoiceController = { index, show, send, downloadPdf }

export default InvoiceController