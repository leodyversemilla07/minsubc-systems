import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import events from './events'
import admin from './admin'
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/alumni',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::index
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:12
 * @route '/alumni'
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
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
export const directory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: directory.url(options),
    method: 'get',
})

directory.definition = {
    methods: ["get","head"],
    url: '/alumni/directory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
directory.url = (options?: RouteQueryOptions) => {
    return directory.definition.url + queryParams(options)
}

/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
directory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: directory.url(options),
    method: 'get',
})
/**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
directory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: directory.url(options),
    method: 'head',
})

    /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
    const directoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: directory.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
 */
        directoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: directory.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Alumni\Http\Controllers\AlumniController::directory
 * @see Modules/Alumni/app/Http/Controllers/AlumniController.php:17
 * @route '/alumni/directory'
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
const alumni = {
    index: Object.assign(index, index),
directory: Object.assign(directory, directory),
events: Object.assign(events, events),
admin: Object.assign(admin, admin),
}

export default alumni