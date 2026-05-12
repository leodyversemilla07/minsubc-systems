import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::index
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/library/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::index
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/library/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::index
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/library/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::index
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/library/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::index
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/library/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::index
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/library/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::index
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:13
 * @route '/library/admin/reports'
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
* @see \Modules\Library\Http\Controllers\Admin\ReportController::popularBooks
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/library/admin/reports/popular-books'
 */
export const popularBooks = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: popularBooks.url(options),
    method: 'get',
})

popularBooks.definition = {
    methods: ["get","head"],
    url: '/library/admin/reports/popular-books',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::popularBooks
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/library/admin/reports/popular-books'
 */
popularBooks.url = (options?: RouteQueryOptions) => {
    return popularBooks.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::popularBooks
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/library/admin/reports/popular-books'
 */
popularBooks.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: popularBooks.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::popularBooks
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/library/admin/reports/popular-books'
 */
popularBooks.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: popularBooks.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::popularBooks
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/library/admin/reports/popular-books'
 */
    const popularBooksForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: popularBooks.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::popularBooks
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/library/admin/reports/popular-books'
 */
        popularBooksForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: popularBooks.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::popularBooks
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:18
 * @route '/library/admin/reports/popular-books'
 */
        popularBooksForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: popularBooks.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    popularBooks.form = popularBooksForm
/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::borrowingTrends
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:29
 * @route '/library/admin/reports/borrowing-trends'
 */
export const borrowingTrends = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: borrowingTrends.url(options),
    method: 'get',
})

borrowingTrends.definition = {
    methods: ["get","head"],
    url: '/library/admin/reports/borrowing-trends',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::borrowingTrends
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:29
 * @route '/library/admin/reports/borrowing-trends'
 */
borrowingTrends.url = (options?: RouteQueryOptions) => {
    return borrowingTrends.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::borrowingTrends
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:29
 * @route '/library/admin/reports/borrowing-trends'
 */
borrowingTrends.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: borrowingTrends.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::borrowingTrends
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:29
 * @route '/library/admin/reports/borrowing-trends'
 */
borrowingTrends.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: borrowingTrends.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::borrowingTrends
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:29
 * @route '/library/admin/reports/borrowing-trends'
 */
    const borrowingTrendsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: borrowingTrends.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::borrowingTrends
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:29
 * @route '/library/admin/reports/borrowing-trends'
 */
        borrowingTrendsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: borrowingTrends.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Admin\ReportController::borrowingTrends
 * @see Modules/Library/app/Http/Controllers/Admin/ReportController.php:29
 * @route '/library/admin/reports/borrowing-trends'
 */
        borrowingTrendsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: borrowingTrends.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    borrowingTrends.form = borrowingTrendsForm
const reports = {
    index: Object.assign(index, index),
popularBooks: Object.assign(popularBooks, popularBooks),
borrowingTrends: Object.assign(borrowingTrends, borrowingTrends),
}

export default reports