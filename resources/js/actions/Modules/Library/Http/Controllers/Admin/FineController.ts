import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Admin\FineController::index
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:13
 * @route '/library/admin/fines'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library/admin/fines',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\FineController::index
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:13
 * @route '/library/admin/fines'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\FineController::index
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:13
 * @route '/library/admin/fines'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\FineController::index
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:13
 * @route '/library/admin/fines'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\FineController::index
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:13
 * @route '/library/admin/fines'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\FineController::index
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:13
 * @route '/library/admin/fines'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\FineController::index
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:13
 * @route '/library/admin/fines'
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
* @see \Modules\Library\Http\Controllers\Admin\FineController::pay
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:34
 * @route '/library/admin/fines/{fine}/pay'
 */
export const pay = (args: { fine: number | { id: number } } | [fine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pay.url(args, options),
    method: 'post',
})

pay.definition = {
    methods: ["post"],
    url: '/library/admin/fines/{fine}/pay',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\FineController::pay
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:34
 * @route '/library/admin/fines/{fine}/pay'
 */
pay.url = (args: { fine: number | { id: number } } | [fine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fine: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { fine: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    fine: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fine: typeof args.fine === 'object'
                ? args.fine.id
                : args.fine,
                }

    return pay.definition.url
            .replace('{fine}', parsedArgs.fine.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\FineController::pay
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:34
 * @route '/library/admin/fines/{fine}/pay'
 */
pay.post = (args: { fine: number | { id: number } } | [fine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pay.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\FineController::pay
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:34
 * @route '/library/admin/fines/{fine}/pay'
 */
    const payForm = (args: { fine: number | { id: number } } | [fine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: pay.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\FineController::pay
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:34
 * @route '/library/admin/fines/{fine}/pay'
 */
        payForm.post = (args: { fine: number | { id: number } } | [fine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: pay.url(args, options),
            method: 'post',
        })
    
    pay.form = payForm
/**
* @see \Modules\Library\Http\Controllers\Admin\FineController::waive
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:50
 * @route '/library/admin/fines/{fine}/waive'
 */
export const waive = (args: { fine: number | { id: number } } | [fine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: waive.url(args, options),
    method: 'post',
})

waive.definition = {
    methods: ["post"],
    url: '/library/admin/fines/{fine}/waive',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\FineController::waive
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:50
 * @route '/library/admin/fines/{fine}/waive'
 */
waive.url = (args: { fine: number | { id: number } } | [fine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fine: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { fine: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    fine: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fine: typeof args.fine === 'object'
                ? args.fine.id
                : args.fine,
                }

    return waive.definition.url
            .replace('{fine}', parsedArgs.fine.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\FineController::waive
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:50
 * @route '/library/admin/fines/{fine}/waive'
 */
waive.post = (args: { fine: number | { id: number } } | [fine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: waive.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\FineController::waive
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:50
 * @route '/library/admin/fines/{fine}/waive'
 */
    const waiveForm = (args: { fine: number | { id: number } } | [fine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: waive.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\FineController::waive
 * @see Modules/Library/app/Http/Controllers/Admin/FineController.php:50
 * @route '/library/admin/fines/{fine}/waive'
 */
        waiveForm.post = (args: { fine: number | { id: number } } | [fine: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: waive.url(args, options),
            method: 'post',
        })
    
    waive.form = waiveForm
const FineController = { index, pay, waive }

export default FineController