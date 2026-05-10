import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::dashboard
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:26
 * @route '/sas/adviser/organization'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/sas/adviser/organization',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::dashboard
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:26
 * @route '/sas/adviser/organization'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::dashboard
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:26
 * @route '/sas/adviser/organization'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::dashboard
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:26
 * @route '/sas/adviser/organization'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:42
 * @route '/sas/adviser/organization/edit'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sas/adviser/organization/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:42
 * @route '/sas/adviser/organization/edit'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:42
 * @route '/sas/adviser/organization/edit'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::edit
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:42
 * @route '/sas/adviser/organization/edit'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:56
 * @route '/sas/adviser/organization'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/sas/adviser/organization',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:56
 * @route '/sas/adviser/organization'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::update
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:56
 * @route '/sas/adviser/organization'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::officers
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:71
 * @route '/sas/adviser/organization/officers'
 */
export const officers = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: officers.url(options),
    method: 'get',
})

officers.definition = {
    methods: ["get","head"],
    url: '/sas/adviser/organization/officers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::officers
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:71
 * @route '/sas/adviser/organization/officers'
 */
officers.url = (options?: RouteQueryOptions) => {
    return officers.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::officers
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:71
 * @route '/sas/adviser/organization/officers'
 */
officers.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: officers.url(options),
    method: 'get',
})
/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::officers
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:71
 * @route '/sas/adviser/organization/officers'
 */
officers.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: officers.url(options),
    method: 'head',
})

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::storeOfficer
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:88
 * @route '/sas/adviser/organization/officers'
 */
export const storeOfficer = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeOfficer.url(options),
    method: 'post',
})

storeOfficer.definition = {
    methods: ["post"],
    url: '/sas/adviser/organization/officers',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::storeOfficer
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:88
 * @route '/sas/adviser/organization/officers'
 */
storeOfficer.url = (options?: RouteQueryOptions) => {
    return storeOfficer.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::storeOfficer
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:88
 * @route '/sas/adviser/organization/officers'
 */
storeOfficer.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeOfficer.url(options),
    method: 'post',
})

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::updateOfficer
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:98
 * @route '/sas/adviser/organization/officers/{id}'
 */
export const updateOfficer = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateOfficer.url(args, options),
    method: 'put',
})

updateOfficer.definition = {
    methods: ["put"],
    url: '/sas/adviser/organization/officers/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::updateOfficer
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:98
 * @route '/sas/adviser/organization/officers/{id}'
 */
updateOfficer.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateOfficer.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::updateOfficer
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:98
 * @route '/sas/adviser/organization/officers/{id}'
 */
updateOfficer.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateOfficer.url(args, options),
    method: 'put',
})

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::uploadDocument
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:110
 * @route '/sas/adviser/organization/documents'
 */
export const uploadDocument = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadDocument.url(options),
    method: 'post',
})

uploadDocument.definition = {
    methods: ["post"],
    url: '/sas/adviser/organization/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::uploadDocument
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:110
 * @route '/sas/adviser/organization/documents'
 */
uploadDocument.url = (options?: RouteQueryOptions) => {
    return uploadDocument.definition.url + queryParams(options)
}

/**
* @see \Modules\SAS\Http\Controllers\Adviser\OrganizationController::uploadDocument
 * @see Modules/SAS/app/Http/Controllers/Adviser/OrganizationController.php:110
 * @route '/sas/adviser/organization/documents'
 */
uploadDocument.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadDocument.url(options),
    method: 'post',
})
const OrganizationController = { dashboard, edit, update, officers, storeOfficer, updateOfficer, uploadDocument }

export default OrganizationController