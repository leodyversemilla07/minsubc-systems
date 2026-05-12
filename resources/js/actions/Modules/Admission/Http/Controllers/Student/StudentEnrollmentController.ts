import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
const indexf97572db3e834353f51c60eadb3c770f = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf97572db3e834353f51c60eadb3c770f.url(options),
    method: 'get',
})

indexf97572db3e834353f51c60eadb3c770f.definition = {
    methods: ["get","head"],
    url: '/student/enrollment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
indexf97572db3e834353f51c60eadb3c770f.url = (options?: RouteQueryOptions) => {
    return indexf97572db3e834353f51c60eadb3c770f.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
indexf97572db3e834353f51c60eadb3c770f.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexf97572db3e834353f51c60eadb3c770f.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
indexf97572db3e834353f51c60eadb3c770f.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexf97572db3e834353f51c60eadb3c770f.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
    const indexf97572db3e834353f51c60eadb3c770fForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexf97572db3e834353f51c60eadb3c770f.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
        indexf97572db3e834353f51c60eadb3c770fForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexf97572db3e834353f51c60eadb3c770f.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/student/enrollment'
 */
        indexf97572db3e834353f51c60eadb3c770fForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexf97572db3e834353f51c60eadb3c770f.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexf97572db3e834353f51c60eadb3c770f.form = indexf97572db3e834353f51c60eadb3c770fForm
    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
const index1dd77f035d856d8a34d8fcefe7e4b470 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index1dd77f035d856d8a34d8fcefe7e4b470.url(options),
    method: 'get',
})

index1dd77f035d856d8a34d8fcefe7e4b470.definition = {
    methods: ["get","head"],
    url: '/my/enrollment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
index1dd77f035d856d8a34d8fcefe7e4b470.url = (options?: RouteQueryOptions) => {
    return index1dd77f035d856d8a34d8fcefe7e4b470.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
index1dd77f035d856d8a34d8fcefe7e4b470.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index1dd77f035d856d8a34d8fcefe7e4b470.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
index1dd77f035d856d8a34d8fcefe7e4b470.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index1dd77f035d856d8a34d8fcefe7e4b470.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
    const index1dd77f035d856d8a34d8fcefe7e4b470Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index1dd77f035d856d8a34d8fcefe7e4b470.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
        index1dd77f035d856d8a34d8fcefe7e4b470Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index1dd77f035d856d8a34d8fcefe7e4b470.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::index
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:31
 * @route '/my/enrollment'
 */
        index1dd77f035d856d8a34d8fcefe7e4b470Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index1dd77f035d856d8a34d8fcefe7e4b470.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index1dd77f035d856d8a34d8fcefe7e4b470.form = index1dd77f035d856d8a34d8fcefe7e4b470Form

export const index = {
    '/student/enrollment': indexf97572db3e834353f51c60eadb3c770f,
    '/my/enrollment': index1dd77f035d856d8a34d8fcefe7e4b470,
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
const created142f6bbb973c8744f3f4ec8d946bd12 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: created142f6bbb973c8744f3f4ec8d946bd12.url(options),
    method: 'get',
})

created142f6bbb973c8744f3f4ec8d946bd12.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/enroll',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
created142f6bbb973c8744f3f4ec8d946bd12.url = (options?: RouteQueryOptions) => {
    return created142f6bbb973c8744f3f4ec8d946bd12.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
created142f6bbb973c8744f3f4ec8d946bd12.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: created142f6bbb973c8744f3f4ec8d946bd12.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
created142f6bbb973c8744f3f4ec8d946bd12.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: created142f6bbb973c8744f3f4ec8d946bd12.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
    const created142f6bbb973c8744f3f4ec8d946bd12Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: created142f6bbb973c8744f3f4ec8d946bd12.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
        created142f6bbb973c8744f3f4ec8d946bd12Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: created142f6bbb973c8744f3f4ec8d946bd12.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/student/enrollment/enroll'
 */
        created142f6bbb973c8744f3f4ec8d946bd12Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: created142f6bbb973c8744f3f4ec8d946bd12.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    created142f6bbb973c8744f3f4ec8d946bd12.form = created142f6bbb973c8744f3f4ec8d946bd12Form
    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
const create0c40118cd453a5f8a992644fec09121a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create0c40118cd453a5f8a992644fec09121a.url(options),
    method: 'get',
})

create0c40118cd453a5f8a992644fec09121a.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/enroll',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
create0c40118cd453a5f8a992644fec09121a.url = (options?: RouteQueryOptions) => {
    return create0c40118cd453a5f8a992644fec09121a.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
create0c40118cd453a5f8a992644fec09121a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create0c40118cd453a5f8a992644fec09121a.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
create0c40118cd453a5f8a992644fec09121a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create0c40118cd453a5f8a992644fec09121a.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
    const create0c40118cd453a5f8a992644fec09121aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create0c40118cd453a5f8a992644fec09121a.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
        create0c40118cd453a5f8a992644fec09121aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create0c40118cd453a5f8a992644fec09121a.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::create
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:94
 * @route '/my/enrollment/enroll'
 */
        create0c40118cd453a5f8a992644fec09121aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create0c40118cd453a5f8a992644fec09121a.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create0c40118cd453a5f8a992644fec09121a.form = create0c40118cd453a5f8a992644fec09121aForm

export const create = {
    '/student/enrollment/enroll': created142f6bbb973c8744f3f4ec8d946bd12,
    '/my/enrollment/enroll': create0c40118cd453a5f8a992644fec09121a,
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/student/enrollment/enroll'
 */
const stored142f6bbb973c8744f3f4ec8d946bd12 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored142f6bbb973c8744f3f4ec8d946bd12.url(options),
    method: 'post',
})

stored142f6bbb973c8744f3f4ec8d946bd12.definition = {
    methods: ["post"],
    url: '/student/enrollment/enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/student/enrollment/enroll'
 */
stored142f6bbb973c8744f3f4ec8d946bd12.url = (options?: RouteQueryOptions) => {
    return stored142f6bbb973c8744f3f4ec8d946bd12.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/student/enrollment/enroll'
 */
stored142f6bbb973c8744f3f4ec8d946bd12.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: stored142f6bbb973c8744f3f4ec8d946bd12.url(options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/student/enrollment/enroll'
 */
    const stored142f6bbb973c8744f3f4ec8d946bd12Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: stored142f6bbb973c8744f3f4ec8d946bd12.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/student/enrollment/enroll'
 */
        stored142f6bbb973c8744f3f4ec8d946bd12Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: stored142f6bbb973c8744f3f4ec8d946bd12.url(options),
            method: 'post',
        })
    
    stored142f6bbb973c8744f3f4ec8d946bd12.form = stored142f6bbb973c8744f3f4ec8d946bd12Form
    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/my/enrollment/enroll'
 */
const store0c40118cd453a5f8a992644fec09121a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store0c40118cd453a5f8a992644fec09121a.url(options),
    method: 'post',
})

store0c40118cd453a5f8a992644fec09121a.definition = {
    methods: ["post"],
    url: '/my/enrollment/enroll',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/my/enrollment/enroll'
 */
store0c40118cd453a5f8a992644fec09121a.url = (options?: RouteQueryOptions) => {
    return store0c40118cd453a5f8a992644fec09121a.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/my/enrollment/enroll'
 */
store0c40118cd453a5f8a992644fec09121a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store0c40118cd453a5f8a992644fec09121a.url(options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/my/enrollment/enroll'
 */
    const store0c40118cd453a5f8a992644fec09121aForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store0c40118cd453a5f8a992644fec09121a.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::store
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:161
 * @route '/my/enrollment/enroll'
 */
        store0c40118cd453a5f8a992644fec09121aForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store0c40118cd453a5f8a992644fec09121a.url(options),
            method: 'post',
        })
    
    store0c40118cd453a5f8a992644fec09121a.form = store0c40118cd453a5f8a992644fec09121aForm

export const store = {
    '/student/enrollment/enroll': stored142f6bbb973c8744f3f4ec8d946bd12,
    '/my/enrollment/enroll': store0c40118cd453a5f8a992644fec09121a,
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
const show3b700bf2cfba44adf607a0a0530ed6a3 = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show3b700bf2cfba44adf607a0a0530ed6a3.url(args, options),
    method: 'get',
})

show3b700bf2cfba44adf607a0a0530ed6a3.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/{enrollment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
show3b700bf2cfba44adf607a0a0530ed6a3.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show3b700bf2cfba44adf607a0a0530ed6a3.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
show3b700bf2cfba44adf607a0a0530ed6a3.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show3b700bf2cfba44adf607a0a0530ed6a3.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
show3b700bf2cfba44adf607a0a0530ed6a3.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show3b700bf2cfba44adf607a0a0530ed6a3.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
    const show3b700bf2cfba44adf607a0a0530ed6a3Form = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show3b700bf2cfba44adf607a0a0530ed6a3.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
        show3b700bf2cfba44adf607a0a0530ed6a3Form.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show3b700bf2cfba44adf607a0a0530ed6a3.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/student/enrollment/{enrollment}'
 */
        show3b700bf2cfba44adf607a0a0530ed6a3Form.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show3b700bf2cfba44adf607a0a0530ed6a3.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show3b700bf2cfba44adf607a0a0530ed6a3.form = show3b700bf2cfba44adf607a0a0530ed6a3Form
    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
const show1f605a29cd1eca8220b8e17cd11d5e22 = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1f605a29cd1eca8220b8e17cd11d5e22.url(args, options),
    method: 'get',
})

show1f605a29cd1eca8220b8e17cd11d5e22.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/{enrollment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
show1f605a29cd1eca8220b8e17cd11d5e22.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show1f605a29cd1eca8220b8e17cd11d5e22.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
show1f605a29cd1eca8220b8e17cd11d5e22.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show1f605a29cd1eca8220b8e17cd11d5e22.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
show1f605a29cd1eca8220b8e17cd11d5e22.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show1f605a29cd1eca8220b8e17cd11d5e22.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
    const show1f605a29cd1eca8220b8e17cd11d5e22Form = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show1f605a29cd1eca8220b8e17cd11d5e22.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
        show1f605a29cd1eca8220b8e17cd11d5e22Form.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show1f605a29cd1eca8220b8e17cd11d5e22.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::show
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:210
 * @route '/my/enrollment/{enrollment}'
 */
        show1f605a29cd1eca8220b8e17cd11d5e22Form.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show1f605a29cd1eca8220b8e17cd11d5e22.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show1f605a29cd1eca8220b8e17cd11d5e22.form = show1f605a29cd1eca8220b8e17cd11d5e22Form

export const show = {
    '/student/enrollment/{enrollment}': show3b700bf2cfba44adf607a0a0530ed6a3,
    '/my/enrollment/{enrollment}': show1f605a29cd1eca8220b8e17cd11d5e22,
}

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
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::updateSubjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:283
 * @route '/student/enrollment/{enrollment}/subjects'
 */
export const updateSubjects = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateSubjects.url(args, options),
    method: 'patch',
})

updateSubjects.definition = {
    methods: ["patch"],
    url: '/student/enrollment/{enrollment}/subjects',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::updateSubjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:283
 * @route '/student/enrollment/{enrollment}/subjects'
 */
updateSubjects.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateSubjects.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::updateSubjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:283
 * @route '/student/enrollment/{enrollment}/subjects'
 */
updateSubjects.patch = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateSubjects.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::updateSubjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:283
 * @route '/student/enrollment/{enrollment}/subjects'
 */
    const updateSubjectsForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateSubjects.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::updateSubjects
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:283
 * @route '/student/enrollment/{enrollment}/subjects'
 */
        updateSubjectsForm.patch = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateSubjects.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateSubjects.form = updateSubjectsForm
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
const paymentf7f2999a121c2abaa239355cd471e398 = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentf7f2999a121c2abaa239355cd471e398.url(args, options),
    method: 'get',
})

paymentf7f2999a121c2abaa239355cd471e398.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/{enrollment}/payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
paymentf7f2999a121c2abaa239355cd471e398.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return paymentf7f2999a121c2abaa239355cd471e398.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
paymentf7f2999a121c2abaa239355cd471e398.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentf7f2999a121c2abaa239355cd471e398.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
paymentf7f2999a121c2abaa239355cd471e398.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: paymentf7f2999a121c2abaa239355cd471e398.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
    const paymentf7f2999a121c2abaa239355cd471e398Form = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: paymentf7f2999a121c2abaa239355cd471e398.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
        paymentf7f2999a121c2abaa239355cd471e398Form.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paymentf7f2999a121c2abaa239355cd471e398.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/student/enrollment/{enrollment}/payment'
 */
        paymentf7f2999a121c2abaa239355cd471e398Form.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paymentf7f2999a121c2abaa239355cd471e398.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    paymentf7f2999a121c2abaa239355cd471e398.form = paymentf7f2999a121c2abaa239355cd471e398Form
    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
const paymentb7e41a0245c4ec88f5c98ce14cc1de8e = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentb7e41a0245c4ec88f5c98ce14cc1de8e.url(args, options),
    method: 'get',
})

paymentb7e41a0245c4ec88f5c98ce14cc1de8e.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/{enrollment}/payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
paymentb7e41a0245c4ec88f5c98ce14cc1de8e.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return paymentb7e41a0245c4ec88f5c98ce14cc1de8e.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
paymentb7e41a0245c4ec88f5c98ce14cc1de8e.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paymentb7e41a0245c4ec88f5c98ce14cc1de8e.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
paymentb7e41a0245c4ec88f5c98ce14cc1de8e.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: paymentb7e41a0245c4ec88f5c98ce14cc1de8e.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
    const paymentb7e41a0245c4ec88f5c98ce14cc1de8eForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: paymentb7e41a0245c4ec88f5c98ce14cc1de8e.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
        paymentb7e41a0245c4ec88f5c98ce14cc1de8eForm.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paymentb7e41a0245c4ec88f5c98ce14cc1de8e.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::payment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:310
 * @route '/my/enrollment/{enrollment}/payment'
 */
        paymentb7e41a0245c4ec88f5c98ce14cc1de8eForm.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paymentb7e41a0245c4ec88f5c98ce14cc1de8e.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    paymentb7e41a0245c4ec88f5c98ce14cc1de8e.form = paymentb7e41a0245c4ec88f5c98ce14cc1de8eForm

export const payment = {
    '/student/enrollment/{enrollment}/payment': paymentf7f2999a121c2abaa239355cd471e398,
    '/my/enrollment/{enrollment}/payment': paymentb7e41a0245c4ec88f5c98ce14cc1de8e,
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submitPayment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/student/enrollment/{enrollment}/payment'
 */
const submitPaymentf7f2999a121c2abaa239355cd471e398 = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitPaymentf7f2999a121c2abaa239355cd471e398.url(args, options),
    method: 'post',
})

submitPaymentf7f2999a121c2abaa239355cd471e398.definition = {
    methods: ["post"],
    url: '/student/enrollment/{enrollment}/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submitPayment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/student/enrollment/{enrollment}/payment'
 */
submitPaymentf7f2999a121c2abaa239355cd471e398.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return submitPaymentf7f2999a121c2abaa239355cd471e398.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submitPayment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/student/enrollment/{enrollment}/payment'
 */
submitPaymentf7f2999a121c2abaa239355cd471e398.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitPaymentf7f2999a121c2abaa239355cd471e398.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submitPayment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/student/enrollment/{enrollment}/payment'
 */
    const submitPaymentf7f2999a121c2abaa239355cd471e398Form = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitPaymentf7f2999a121c2abaa239355cd471e398.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submitPayment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/student/enrollment/{enrollment}/payment'
 */
        submitPaymentf7f2999a121c2abaa239355cd471e398Form.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitPaymentf7f2999a121c2abaa239355cd471e398.url(args, options),
            method: 'post',
        })
    
    submitPaymentf7f2999a121c2abaa239355cd471e398.form = submitPaymentf7f2999a121c2abaa239355cd471e398Form
    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submitPayment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/my/enrollment/{enrollment}/payment'
 */
const submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e.url(args, options),
    method: 'post',
})

submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e.definition = {
    methods: ["post"],
    url: '/my/enrollment/{enrollment}/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submitPayment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/my/enrollment/{enrollment}/payment'
 */
submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submitPayment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/my/enrollment/{enrollment}/payment'
 */
submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submitPayment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/my/enrollment/{enrollment}/payment'
 */
    const submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8eForm = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::submitPayment
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:353
 * @route '/my/enrollment/{enrollment}/payment'
 */
        submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8eForm.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e.url(args, options),
            method: 'post',
        })
    
    submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e.form = submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8eForm

export const submitPayment = {
    '/student/enrollment/{enrollment}/payment': submitPaymentf7f2999a121c2abaa239355cd471e398,
    '/my/enrollment/{enrollment}/payment': submitPaymentb7e41a0245c4ec88f5c98ce14cc1de8e,
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
const history8c16b9cb0ba6db1e731cb166efc7dcfe = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history8c16b9cb0ba6db1e731cb166efc7dcfe.url(options),
    method: 'get',
})

history8c16b9cb0ba6db1e731cb166efc7dcfe.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
history8c16b9cb0ba6db1e731cb166efc7dcfe.url = (options?: RouteQueryOptions) => {
    return history8c16b9cb0ba6db1e731cb166efc7dcfe.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
history8c16b9cb0ba6db1e731cb166efc7dcfe.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history8c16b9cb0ba6db1e731cb166efc7dcfe.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
history8c16b9cb0ba6db1e731cb166efc7dcfe.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history8c16b9cb0ba6db1e731cb166efc7dcfe.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
    const history8c16b9cb0ba6db1e731cb166efc7dcfeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history8c16b9cb0ba6db1e731cb166efc7dcfe.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
        history8c16b9cb0ba6db1e731cb166efc7dcfeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history8c16b9cb0ba6db1e731cb166efc7dcfe.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/student/enrollment/history'
 */
        history8c16b9cb0ba6db1e731cb166efc7dcfeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history8c16b9cb0ba6db1e731cb166efc7dcfe.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history8c16b9cb0ba6db1e731cb166efc7dcfe.form = history8c16b9cb0ba6db1e731cb166efc7dcfeForm
    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
const history4a6e928d5639e839139b333fd199bf5c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history4a6e928d5639e839139b333fd199bf5c.url(options),
    method: 'get',
})

history4a6e928d5639e839139b333fd199bf5c.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
history4a6e928d5639e839139b333fd199bf5c.url = (options?: RouteQueryOptions) => {
    return history4a6e928d5639e839139b333fd199bf5c.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
history4a6e928d5639e839139b333fd199bf5c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history4a6e928d5639e839139b333fd199bf5c.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
history4a6e928d5639e839139b333fd199bf5c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history4a6e928d5639e839139b333fd199bf5c.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
    const history4a6e928d5639e839139b333fd199bf5cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history4a6e928d5639e839139b333fd199bf5c.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
        history4a6e928d5639e839139b333fd199bf5cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history4a6e928d5639e839139b333fd199bf5c.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::history
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:377
 * @route '/my/enrollment/history'
 */
        history4a6e928d5639e839139b333fd199bf5cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history4a6e928d5639e839139b333fd199bf5c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history4a6e928d5639e839139b333fd199bf5c.form = history4a6e928d5639e839139b333fd199bf5cForm

export const history = {
    '/student/enrollment/history': history8c16b9cb0ba6db1e731cb166efc7dcfe,
    '/my/enrollment/history': history4a6e928d5639e839139b333fd199bf5c,
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
const grades9780f51a692bc9e4cc0f0b58ab105b36 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: grades9780f51a692bc9e4cc0f0b58ab105b36.url(options),
    method: 'get',
})

grades9780f51a692bc9e4cc0f0b58ab105b36.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
grades9780f51a692bc9e4cc0f0b58ab105b36.url = (options?: RouteQueryOptions) => {
    return grades9780f51a692bc9e4cc0f0b58ab105b36.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
grades9780f51a692bc9e4cc0f0b58ab105b36.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: grades9780f51a692bc9e4cc0f0b58ab105b36.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
grades9780f51a692bc9e4cc0f0b58ab105b36.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: grades9780f51a692bc9e4cc0f0b58ab105b36.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
    const grades9780f51a692bc9e4cc0f0b58ab105b36Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: grades9780f51a692bc9e4cc0f0b58ab105b36.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
        grades9780f51a692bc9e4cc0f0b58ab105b36Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: grades9780f51a692bc9e4cc0f0b58ab105b36.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/student/enrollment/grades'
 */
        grades9780f51a692bc9e4cc0f0b58ab105b36Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: grades9780f51a692bc9e4cc0f0b58ab105b36.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    grades9780f51a692bc9e4cc0f0b58ab105b36.form = grades9780f51a692bc9e4cc0f0b58ab105b36Form
    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
const grades4071faa3ea2d72317d29ea4e2ac02665 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: grades4071faa3ea2d72317d29ea4e2ac02665.url(options),
    method: 'get',
})

grades4071faa3ea2d72317d29ea4e2ac02665.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
grades4071faa3ea2d72317d29ea4e2ac02665.url = (options?: RouteQueryOptions) => {
    return grades4071faa3ea2d72317d29ea4e2ac02665.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
grades4071faa3ea2d72317d29ea4e2ac02665.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: grades4071faa3ea2d72317d29ea4e2ac02665.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
grades4071faa3ea2d72317d29ea4e2ac02665.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: grades4071faa3ea2d72317d29ea4e2ac02665.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
    const grades4071faa3ea2d72317d29ea4e2ac02665Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: grades4071faa3ea2d72317d29ea4e2ac02665.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
        grades4071faa3ea2d72317d29ea4e2ac02665Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: grades4071faa3ea2d72317d29ea4e2ac02665.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::grades
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:394
 * @route '/my/enrollment/grades'
 */
        grades4071faa3ea2d72317d29ea4e2ac02665Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: grades4071faa3ea2d72317d29ea4e2ac02665.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    grades4071faa3ea2d72317d29ea4e2ac02665.form = grades4071faa3ea2d72317d29ea4e2ac02665Form

export const grades = {
    '/student/enrollment/grades': grades9780f51a692bc9e4cc0f0b58ab105b36,
    '/my/enrollment/grades': grades4071faa3ea2d72317d29ea4e2ac02665,
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
const schedulee1cb81507712254d305e5c773adfbffb = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedulee1cb81507712254d305e5c773adfbffb.url(options),
    method: 'get',
})

schedulee1cb81507712254d305e5c773adfbffb.definition = {
    methods: ["get","head"],
    url: '/student/enrollment/schedule',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
schedulee1cb81507712254d305e5c773adfbffb.url = (options?: RouteQueryOptions) => {
    return schedulee1cb81507712254d305e5c773adfbffb.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
schedulee1cb81507712254d305e5c773adfbffb.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedulee1cb81507712254d305e5c773adfbffb.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
schedulee1cb81507712254d305e5c773adfbffb.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedulee1cb81507712254d305e5c773adfbffb.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
    const schedulee1cb81507712254d305e5c773adfbffbForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedulee1cb81507712254d305e5c773adfbffb.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
        schedulee1cb81507712254d305e5c773adfbffbForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedulee1cb81507712254d305e5c773adfbffb.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/student/enrollment/schedule'
 */
        schedulee1cb81507712254d305e5c773adfbffbForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedulee1cb81507712254d305e5c773adfbffb.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedulee1cb81507712254d305e5c773adfbffb.form = schedulee1cb81507712254d305e5c773adfbffbForm
    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
const schedule78d8db35483ac9af4955e5a7919f71c5 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule78d8db35483ac9af4955e5a7919f71c5.url(options),
    method: 'get',
})

schedule78d8db35483ac9af4955e5a7919f71c5.definition = {
    methods: ["get","head"],
    url: '/my/enrollment/schedule',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
schedule78d8db35483ac9af4955e5a7919f71c5.url = (options?: RouteQueryOptions) => {
    return schedule78d8db35483ac9af4955e5a7919f71c5.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
schedule78d8db35483ac9af4955e5a7919f71c5.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedule78d8db35483ac9af4955e5a7919f71c5.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
schedule78d8db35483ac9af4955e5a7919f71c5.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedule78d8db35483ac9af4955e5a7919f71c5.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
    const schedule78d8db35483ac9af4955e5a7919f71c5Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedule78d8db35483ac9af4955e5a7919f71c5.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
        schedule78d8db35483ac9af4955e5a7919f71c5Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule78d8db35483ac9af4955e5a7919f71c5.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Student\StudentEnrollmentController::schedule
 * @see Modules/Admission/app/Http/Controllers/Student/StudentEnrollmentController.php:448
 * @route '/my/enrollment/schedule'
 */
        schedule78d8db35483ac9af4955e5a7919f71c5Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedule78d8db35483ac9af4955e5a7919f71c5.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedule78d8db35483ac9af4955e5a7919f71c5.form = schedule78d8db35483ac9af4955e5a7919f71c5Form

export const schedule = {
    '/student/enrollment/schedule': schedulee1cb81507712254d305e5c773adfbffb,
    '/my/enrollment/schedule': schedule78d8db35483ac9af4955e5a7919f71c5,
}

const StudentEnrollmentController = { index, create, store, show, subjects, updateSubjects, payment, submitPayment, history, grades, schedule }

export default StudentEnrollmentController