import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:22
 * @route '/sas/student/insurance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sas/student/insurance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:22
 * @route '/sas/student/insurance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:22
 * @route '/sas/student/insurance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::index
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:22
 * @route '/sas/student/insurance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::create
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:36
 * @route '/sas/student/insurance/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sas/student/insurance/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::create
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:36
 * @route '/sas/student/insurance/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::create
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:36
 * @route '/sas/student/insurance/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::create
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:36
 * @route '/sas/student/insurance/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::store
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:44
 * @route '/sas/student/insurance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sas/student/insurance',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::store
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:44
 * @route '/sas/student/insurance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::store
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:44
 * @route '/sas/student/insurance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:59
 * @route '/sas/student/insurance/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/sas/student/insurance/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:59
 * @route '/sas/student/insurance/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:59
 * @route '/sas/student/insurance/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Student\InsuranceController::show
 * @see Modules/SAS/app/Http/Controllers/Student/InsuranceController.php:59
 * @route '/sas/student/insurance/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const InsuranceController = { index, create, store, show }

export default InsuranceController