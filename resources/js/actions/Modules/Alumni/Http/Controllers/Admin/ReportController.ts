import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/alumni/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/alumni/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/alumni/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/alumni/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/alumni/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/alumni/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::index
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/alumni/admin/reports'
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
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::employment
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:20
 * @route '/alumni/admin/reports/employment'
 */
export const employment = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employment.url(options),
    method: 'get',
})

employment.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/reports/employment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::employment
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:20
 * @route '/alumni/admin/reports/employment'
 */
employment.url = (options?: RouteQueryOptions) => {
    return employment.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::employment
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:20
 * @route '/alumni/admin/reports/employment'
 */
employment.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: employment.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::employment
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:20
 * @route '/alumni/admin/reports/employment'
 */
employment.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: employment.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::employment
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:20
 * @route '/alumni/admin/reports/employment'
 */
    const employmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: employment.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::employment
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:20
 * @route '/alumni/admin/reports/employment'
 */
        employmentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employment.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::employment
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:20
 * @route '/alumni/admin/reports/employment'
 */
        employmentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: employment.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    employment.form = employmentForm
/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::donations
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:26
 * @route '/alumni/admin/reports/donations'
 */
export const donations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: donations.url(options),
    method: 'get',
})

donations.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/reports/donations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::donations
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:26
 * @route '/alumni/admin/reports/donations'
 */
donations.url = (options?: RouteQueryOptions) => {
    return donations.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::donations
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:26
 * @route '/alumni/admin/reports/donations'
 */
donations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: donations.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::donations
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:26
 * @route '/alumni/admin/reports/donations'
 */
donations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: donations.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::donations
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:26
 * @route '/alumni/admin/reports/donations'
 */
    const donationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: donations.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::donations
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:26
 * @route '/alumni/admin/reports/donations'
 */
        donationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: donations.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::donations
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:26
 * @route '/alumni/admin/reports/donations'
 */
        donationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: donations.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    donations.form = donationsForm
/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::tracer
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:32
 * @route '/alumni/admin/reports/tracer'
 */
export const tracer = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tracer.url(options),
    method: 'get',
})

tracer.definition = {
    methods: ["get","head"],
    url: '/alumni/admin/reports/tracer',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::tracer
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:32
 * @route '/alumni/admin/reports/tracer'
 */
tracer.url = (options?: RouteQueryOptions) => {
    return tracer.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::tracer
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:32
 * @route '/alumni/admin/reports/tracer'
 */
tracer.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tracer.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::tracer
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:32
 * @route '/alumni/admin/reports/tracer'
 */
tracer.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tracer.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::tracer
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:32
 * @route '/alumni/admin/reports/tracer'
 */
    const tracerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: tracer.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::tracer
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:32
 * @route '/alumni/admin/reports/tracer'
 */
        tracerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tracer.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\Admin\ReportController::tracer
 * @see Modules/Alumni/app/Http/Controllers/Admin/ReportController.php:32
 * @route '/alumni/admin/reports/tracer'
 */
        tracerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: tracer.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    tracer.form = tracerForm
const ReportController = { index, employment, donations, tracer }

export default ReportController