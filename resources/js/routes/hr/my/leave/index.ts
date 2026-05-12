import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::requests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
export const requests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requests.url(options),
    method: 'get',
})

requests.definition = {
    methods: ["get","head"],
    url: '/hr/my/leave',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::requests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
requests.url = (options?: RouteQueryOptions) => {
    return requests.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::requests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
requests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: requests.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::requests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
requests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: requests.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::requests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
    const requestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: requests.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::requests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
        requestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: requests.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::requests
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:79
 * @route '/hr/my/leave'
 */
        requestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: requests.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    requests.form = requestsForm
/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::submit
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:87
 * @route '/hr/my/leave'
 */
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/hr/my/leave',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::submit
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:87
 * @route '/hr/my/leave'
 */
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::submit
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:87
 * @route '/hr/my/leave'
 */
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

    /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::submit
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:87
 * @route '/hr/my/leave'
 */
    const submitForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(options),
        method: 'post',
    })

            /**
* @see \Modules\HR\Http\Controllers\Employee\MyDashboardController::submit
 * @see Modules/HR/app/Http/Controllers/Employee/MyDashboardController.php:87
 * @route '/hr/my/leave'
 */
        submitForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(options),
            method: 'post',
        })
    
    submit.form = submitForm
const leave = {
    requests: Object.assign(requests, requests),
submit: Object.assign(submit, submit),
}

export default leave