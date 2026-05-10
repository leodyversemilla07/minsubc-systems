import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Registrar\Http\Controllers\StudentController::index
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:18
 * @route '/students'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::index
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:18
 * @route '/students'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::index
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:18
 * @route '/students'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\StudentController::index
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:18
 * @route '/students'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::create
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:47
 * @route '/students/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/students/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::create
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:47
 * @route '/students/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::create
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:47
 * @route '/students/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\StudentController::create
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:47
 * @route '/students/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::store
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:55
 * @route '/students'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/students',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::store
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:55
 * @route '/students'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::store
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:55
 * @route '/students'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::show
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:66
 * @route '/students/{student}'
 */
export const show = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/students/{student}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::show
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:66
 * @route '/students/{student}'
 */
show.url = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return show.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::show
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:66
 * @route '/students/{student}'
 */
show.get = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\StudentController::show
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:66
 * @route '/students/{student}'
 */
show.head = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::edit
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:80
 * @route '/students/{student}/edit'
 */
export const edit = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/students/{student}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::edit
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:80
 * @route '/students/{student}/edit'
 */
edit.url = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return edit.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::edit
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:80
 * @route '/students/{student}/edit'
 */
edit.get = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Registrar\Http\Controllers\StudentController::edit
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:80
 * @route '/students/{student}/edit'
 */
edit.head = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::update
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:90
 * @route '/students/{student}'
 */
export const update = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/students/{student}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::update
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:90
 * @route '/students/{student}'
 */
update.url = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return update.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::update
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:90
 * @route '/students/{student}'
 */
update.put = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Registrar\Http\Controllers\StudentController::update
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:90
 * @route '/students/{student}'
 */
update.patch = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::destroy
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:101
 * @route '/students/{student}'
 */
export const destroy = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/students/{student}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::destroy
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:101
 * @route '/students/{student}'
 */
destroy.url = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { student: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.id
                : args.student,
                }

    return destroy.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Registrar\Http\Controllers\StudentController::destroy
 * @see Modules/Registrar/app/Http/Controllers/StudentController.php:101
 * @route '/students/{student}'
 */
destroy.delete = (args: { student: string | number | { id: string | number } } | [student: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const StudentController = { index, create, store, show, edit, update, destroy }

export default StudentController