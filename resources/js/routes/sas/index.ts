import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import organizations from './organizations'
import activities from './activities'
import scholarships from './scholarships'
import student from './student'
import adviser from './adviser'
import admin from './admin'
/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:32
 * @route '/sas'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:32
 * @route '/sas'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:32
 * @route '/sas'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\PageController::index
 * @see Modules/SAS/app/Http/Controllers/PageController.php:32
 * @route '/sas'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})
const sas = {
    index: Object.assign(index, index),
organizations: Object.assign(organizations, organizations),
activities: Object.assign(activities, activities),
scholarships: Object.assign(scholarships, scholarships),
student: Object.assign(student, student),
adviser: Object.assign(adviser, adviser),
admin: Object.assign(admin, admin),
}

export default sas