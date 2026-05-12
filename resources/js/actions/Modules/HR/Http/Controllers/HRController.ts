import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
/**
* @see \Modules\HR\Http\Controllers\HRController::show
 * @see Modules/HR/app/Http/Controllers/HRController.php:46
 * @route '/hr/employees/{employee}'
 */
export const show = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/hr/employees/{employee}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\HR\Http\Controllers\HRController::show
 * @see Modules/HR/app/Http/Controllers/HRController.php:46
 * @route '/hr/employees/{employee}'
 */
show.url = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { employee: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { employee: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    employee: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        employee: typeof args.employee === 'object'
                ? args.employee.id
                : args.employee,
                }

    return show.definition.url
            .replace('{employee}', parsedArgs.employee.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\HR\Http\Controllers\HRController::show
 * @see Modules/HR/app/Http/Controllers/HRController.php:46
 * @route '/hr/employees/{employee}'
 */
show.get = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\HR\Http\Controllers\HRController::show
 * @see Modules/HR/app/Http/Controllers/HRController.php:46
 * @route '/hr/employees/{employee}'
 */
show.head = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\HR\Http\Controllers\HRController::show
 * @see Modules/HR/app/Http/Controllers/HRController.php:46
 * @route '/hr/employees/{employee}'
 */
    const showForm = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\HR\Http\Controllers\HRController::show
 * @see Modules/HR/app/Http/Controllers/HRController.php:46
 * @route '/hr/employees/{employee}'
 */
        showForm.get = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\HR\Http\Controllers\HRController::show
 * @see Modules/HR/app/Http/Controllers/HRController.php:46
 * @route '/hr/employees/{employee}'
 */
        showForm.head = (args: { employee: number | { id: number } } | [employee: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const HRController = { index, directory, show }

export default HRController