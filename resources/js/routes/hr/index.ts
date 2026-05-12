import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import employees from './employees'
import my from './my'
import admin from './admin'
import api from './api'
/**
* @see \Modules\HR\Http\Controllers\HRController::index
 * @see Modules/HR/app/Http/Controllers/HRController.php:12
 * @route '/hr'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/hr',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\HRController::index
 * @see Modules/HR/app/Http/Controllers/HRController.php:12
 * @route '/hr'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\HRController::index
 * @see Modules/HR/app/Http/Controllers/HRController.php:12
 * @route '/hr'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\HRController::index
 * @see Modules/HR/app/Http/Controllers/HRController.php:12
 * @route '/hr'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\HRController::index
 * @see Modules/HR/app/Http/Controllers/HRController.php:12
 * @route '/hr'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\HRController::index
 * @see Modules/HR/app/Http/Controllers/HRController.php:12
 * @route '/hr'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\HRController::index
 * @see Modules/HR/app/Http/Controllers/HRController.php:12
 * @route '/hr'
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
* @see \Modules\HR\Http\Controllers\HRController::directory
 * @see Modules/HR/app/Http/Controllers/HRController.php:24
 * @route '/hr/directory'
 */
export const directory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: directory.url(options),
    method: 'get',
})

directory.definition = {
    methods: ["get","head"],
    url: '/hr/directory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\HRController::directory
 * @see Modules/HR/app/Http/Controllers/HRController.php:24
 * @route '/hr/directory'
 */
directory.url = (options?: RouteQueryOptions) => {
    return directory.definition.url + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\HRController::directory
 * @see Modules/HR/app/Http/Controllers/HRController.php:24
 * @route '/hr/directory'
 */
directory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: directory.url(options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\HRController::directory
 * @see Modules/HR/app/Http/Controllers/HRController.php:24
 * @route '/hr/directory'
 */
directory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: directory.url(options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\HRController::directory
 * @see Modules/HR/app/Http/Controllers/HRController.php:24
 * @route '/hr/directory'
 */
    const directoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: directory.url(options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\HRController::directory
 * @see Modules/HR/app/Http/Controllers/HRController.php:24
 * @route '/hr/directory'
 */
        directoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: directory.url(options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\HRController::directory
 * @see Modules/HR/app/Http/Controllers/HRController.php:24
 * @route '/hr/directory'
 */
        directoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: directory.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    directory.form = directoryForm
const hr = {
    index: Object.assign(index, index),
directory: Object.assign(directory, directory),
employees: Object.assign(employees, employees),
my: Object.assign(my, my),
admin: Object.assign(admin, admin),
api: Object.assign(api, api),
}

export default hr