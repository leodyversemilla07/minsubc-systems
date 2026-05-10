import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission/admin/subjects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:45
 * @route '/admission/admin/subjects/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admission/admin/subjects/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:45
 * @route '/admission/admin/subjects/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:45
 * @route '/admission/admin/subjects/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:45
 * @route '/admission/admin/subjects/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:59
 * @route '/admission/admin/subjects'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admission/admin/subjects',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:59
 * @route '/admission/admin/subjects'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:59
 * @route '/admission/admin/subjects'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:85
 * @route '/admission/admin/subjects/{subject}'
 */
export const show = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admission/admin/subjects/{subject}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:85
 * @route '/admission/admin/subjects/{subject}'
 */
show.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subject: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subject: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subject: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subject: typeof args.subject === 'object'
                ? args.subject.id
                : args.subject,
                }

    return show.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:85
 * @route '/admission/admin/subjects/{subject}'
 */
show.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:85
 * @route '/admission/admin/subjects/{subject}'
 */
show.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:101
 * @route '/admission/admin/subjects/{subject}/edit'
 */
export const edit = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admission/admin/subjects/{subject}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:101
 * @route '/admission/admin/subjects/{subject}/edit'
 */
edit.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subject: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subject: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subject: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subject: typeof args.subject === 'object'
                ? args.subject.id
                : args.subject,
                }

    return edit.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:101
 * @route '/admission/admin/subjects/{subject}/edit'
 */
edit.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:101
 * @route '/admission/admin/subjects/{subject}/edit'
 */
edit.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:117
 * @route '/admission/admin/subjects/{subject}'
 */
export const update = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admission/admin/subjects/{subject}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:117
 * @route '/admission/admin/subjects/{subject}'
 */
update.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subject: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subject: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subject: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subject: typeof args.subject === 'object'
                ? args.subject.id
                : args.subject,
                }

    return update.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:117
 * @route '/admission/admin/subjects/{subject}'
 */
update.patch = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:143
 * @route '/admission/admin/subjects/{subject}'
 */
export const destroy = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admission/admin/subjects/{subject}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:143
 * @route '/admission/admin/subjects/{subject}'
 */
destroy.url = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { subject: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { subject: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    subject: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        subject: typeof args.subject === 'object'
                ? args.subject.id
                : args.subject,
                }

    return destroy.definition.url
            .replace('{subject}', parsedArgs.subject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:143
 * @route '/admission/admin/subjects/{subject}'
 */
destroy.delete = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
export const byCourse = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourse.url(args, options),
    method: 'get',
})

byCourse.definition = {
    methods: ["get","head"],
    url: '/admission/admin/subjects/by-course/{courseId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
byCourse.url = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { courseId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    courseId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        courseId: args.courseId,
                }

    return byCourse.definition.url
            .replace('{courseId}', parsedArgs.courseId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
byCourse.get = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourse.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
byCourse.head = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byCourse.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
export const byCourseLevel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourseLevel.url(options),
    method: 'get',
})

byCourseLevel.definition = {
    methods: ["get","head"],
    url: '/admission/admin/subjects/by-course-level',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
byCourseLevel.url = (options?: RouteQueryOptions) => {
    return byCourseLevel.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
byCourseLevel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourseLevel.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
byCourseLevel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byCourseLevel.url(options),
    method: 'head',
})
const subjects = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
byCourse: Object.assign(byCourse, byCourse),
byCourseLevel: Object.assign(byCourseLevel, byCourseLevel),
}

export default subjects