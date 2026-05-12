import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import subjectsC258ee from './subjects'
import payment44796b from './payment'
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/enrollment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
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
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/enroll',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/student/enrollment/enroll'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/enrollment/enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/student/enrollment/enroll'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/student/enrollment/enroll'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/student/enrollment/enroll'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/student/enrollment/enroll'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
export const show = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/{enrollment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
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
 * @route '/student/enrollment/{enrollment}'
 */
show.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
show.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
    const showForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
        showForm.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
        showForm.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::subjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:249
 * @route '/student/enrollment/{enrollment}/subjects'
 */
export const subjects = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subjects.url(args, options),
    method: 'get',
})

subjects.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/{enrollment}/subjects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::subjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:249
 * @route '/student/enrollment/{enrollment}/subjects'
 */
subjects.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return subjects.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::subjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:249
 * @route '/student/enrollment/{enrollment}/subjects'
 */
subjects.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: subjects.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::subjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:249
 * @route '/student/enrollment/{enrollment}/subjects'
 */
subjects.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: subjects.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::subjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:249
 * @route '/student/enrollment/{enrollment}/subjects'
 */
    const subjectsForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: subjects.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::subjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:249
 * @route '/student/enrollment/{enrollment}/subjects'
 */
        subjectsForm.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subjects.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::subjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:249
 * @route '/student/enrollment/{enrollment}/subjects'
 */
        subjectsForm.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: subjects.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    subjects.form = subjectsForm
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
export const payment = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payment.url(args, options),
    method: 'get',
})

payment.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/{enrollment}/payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
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
 * @route '/student/enrollment/{enrollment}/payment'
 */
payment.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payment.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
payment.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: payment.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
    const paymentForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: payment.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
        paymentForm.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: payment.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
        paymentForm.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: payment.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    payment.form = paymentForm
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
    const historyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
        historyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
        historyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
export const grades = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: grades.url(options),
    method: 'get',
})

grades.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
grades.url = (options?: RouteQueryOptions) => {
    return grades.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
grades.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: grades.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
grades.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: grades.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
    const gradesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: grades.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
        gradesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: grades.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
        gradesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: grades.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    grades.form = gradesForm
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
export const schedule = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(options),
    method: 'get',
})

schedule.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/schedule',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
schedule.url = (options?: RouteQueryOptions) => {
    return schedule.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
schedule.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
schedule.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedule.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
    const scheduleForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedule.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
        scheduleForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
        scheduleForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedule.form = scheduleForm
const enrollment = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
subjects: Object.assign(subjects, subjectsC258ee),
payment: Object.assign(payment, payment44796b),
history: Object.assign(history, history),
grades: Object.assign(grades, grades),
schedule: Object.assign(schedule, schedule),
}

export default enrollment