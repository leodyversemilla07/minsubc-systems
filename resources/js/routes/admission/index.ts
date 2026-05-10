import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import application from './application'
import track5d0c32 from './track'
import admin from './admin'
import webhook from './webhook'
/**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\PageController::index
 * @see Modules/Admission/app/Http/Controllers/PageController.php:13
 * @route '/admission'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::track
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
export const track = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: track.url(options),
    method: 'get',
})

track.definition = {
    methods: ["get","head"],
    url: '/admission/track',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::track
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
track.url = (options?: RouteQueryOptions) => {
    return track.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::track
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
track.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: track.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\ApplicationController::track
 * @see Modules/Admission/app/Http/Controllers/ApplicationController.php:115
 * @route '/admission/track'
 */
track.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: track.url(options),
    method: 'head',
})
const admission = {
    index: Object.assign(index, index),
application: Object.assign(application, application),
track: Object.assign(track, track5d0c32),
admin: Object.assign(admin, admin),
webhook: Object.assign(webhook, webhook),
}

export default admission