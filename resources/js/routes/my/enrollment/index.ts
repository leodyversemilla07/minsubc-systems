import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import payment44796b from './payment'
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/my/enrollment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/enroll',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/my/enrollment/enroll'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/my/enrollment/enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/my/enrollment/enroll'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/my/enrollment/enroll'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
export const show = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/{enrollment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
show.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return show.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
show.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
show.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
export const payment = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payment.url(args, options),
    method: 'get',
})

payment.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/{enrollment}/payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
payment.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollment: typeof args.enrollment === 'object'
                ? args.enrollment.id
                : args.enrollment,
                }

    return payment.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
payment.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payment.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
payment.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: payment.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
export const schedule = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(options),
    method: 'get',
})

schedule.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/schedule',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
schedule.url = (options?: RouteQueryOptions) => {
    return schedule.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
schedule.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
schedule.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedule.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
export const grades = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: grades.url(options),
    method: 'get',
})

grades.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
grades.url = (options?: RouteQueryOptions) => {
    return grades.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
grades.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: grades.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
grades.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: grades.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})
const enrollment = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
payment: Object.assign(payment, payment44796b),
schedule: Object.assign(schedule, schedule),
grades: Object.assign(grades, grades),
history: Object.assign(history, history),
}

export default enrollment