import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/my/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:17
 * @route '/guidance/my/dashboard'
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
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: '/guidance/my/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:32
 * @route '/guidance/my/appointments'
 */
        appointmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    appointments.form = appointmentsForm
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::createAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
export const createAppointment = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createAppointment.url(options),
    method: 'get',
})

createAppointment.definition = {
    methods: ["get","head"],
    url: '/guidance/my/appointments/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::createAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
createAppointment.url = (options?: RouteQueryOptions) => {
    return createAppointment.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::createAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
createAppointment.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createAppointment.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::createAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
createAppointment.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createAppointment.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::createAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
    const createAppointmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: createAppointment.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::createAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
        createAppointmentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createAppointment.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::createAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:41
 * @route '/guidance/my/appointments/create'
 */
        createAppointmentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: createAppointment.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    createAppointment.form = createAppointmentForm
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::storeAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:54
 * @route '/guidance/my/appointments'
 */
export const storeAppointment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAppointment.url(options),
    method: 'post',
})

storeAppointment.definition = {
    methods: ["post"],
    url: '/guidance/my/appointments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::storeAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:54
 * @route '/guidance/my/appointments'
 */
storeAppointment.url = (options?: RouteQueryOptions) => {
    return storeAppointment.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::storeAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:54
 * @route '/guidance/my/appointments'
 */
storeAppointment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAppointment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::storeAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:54
 * @route '/guidance/my/appointments'
 */
    const storeAppointmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeAppointment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::storeAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:54
 * @route '/guidance/my/appointments'
 */
        storeAppointmentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeAppointment.url(options),
            method: 'post',
        })
    
    storeAppointment.form = storeAppointmentForm
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::cancelAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:88
 * @route '/guidance/my/appointments/{appointment}/cancel'
 */
export const cancelAppointment = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelAppointment.url(args, options),
    method: 'post',
})

cancelAppointment.definition = {
    methods: ["post"],
    url: '/guidance/my/appointments/{appointment}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::cancelAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:88
 * @route '/guidance/my/appointments/{appointment}/cancel'
 */
cancelAppointment.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return cancelAppointment.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::cancelAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:88
 * @route '/guidance/my/appointments/{appointment}/cancel'
 */
cancelAppointment.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelAppointment.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::cancelAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:88
 * @route '/guidance/my/appointments/{appointment}/cancel'
 */
    const cancelAppointmentForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancelAppointment.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::cancelAppointment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:88
 * @route '/guidance/my/appointments/{appointment}/cancel'
 */
        cancelAppointmentForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancelAppointment.url(args, options),
            method: 'post',
        })
    
    cancelAppointment.form = cancelAppointmentForm
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
export const assessments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assessments.url(options),
    method: 'get',
})

assessments.definition = {
    methods: ["get","head"],
    url: '/guidance/my/assessments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
assessments.url = (options?: RouteQueryOptions) => {
    return assessments.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
assessments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: assessments.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
assessments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: assessments.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
    const assessmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: assessments.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
        assessmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assessments.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::assessments
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:99
 * @route '/guidance/my/assessments'
 */
        assessmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: assessments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    assessments.form = assessmentsForm
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::submitAssessment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:0
 * @route '/guidance/my/assessments/{assessment}/submit'
 */
export const submitAssessment = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitAssessment.url(args, options),
    method: 'post',
})

submitAssessment.definition = {
    methods: ["post"],
    url: '/guidance/my/assessments/{assessment}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::submitAssessment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:0
 * @route '/guidance/my/assessments/{assessment}/submit'
 */
submitAssessment.url = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assessment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assessment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assessment: args.assessment,
                }

    return submitAssessment.definition.url
            .replace('{assessment}', parsedArgs.assessment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::submitAssessment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:0
 * @route '/guidance/my/assessments/{assessment}/submit'
 */
submitAssessment.post = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitAssessment.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::submitAssessment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:0
 * @route '/guidance/my/assessments/{assessment}/submit'
 */
    const submitAssessmentForm = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submitAssessment.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::submitAssessment
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:0
 * @route '/guidance/my/assessments/{assessment}/submit'
 */
        submitAssessmentForm.post = (args: { assessment: string | number } | [assessment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submitAssessment.url(args, options),
            method: 'post',
        })
    
    submitAssessment.form = submitAssessmentForm
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
export const counselors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: counselors.url(options),
    method: 'get',
})

counselors.definition = {
    methods: ["get","head"],
    url: '/guidance/my/counselors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
counselors.url = (options?: RouteQueryOptions) => {
    return counselors.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
counselors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: counselors.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
counselors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: counselors.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
    const counselorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: counselors.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
        counselorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: counselors.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Student\StudentDashboardController::counselors
 * @see Modules/Guidance/app/Http/Controllers/Student/StudentDashboardController.php:106
 * @route '/guidance/my/counselors'
 */
        counselorsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: counselors.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    counselors.form = counselorsForm
const StudentDashboardController = { index, appointments, createAppointment, storeAppointment, cancelAppointment, assessments, submitAssessment, counselors }

export default StudentDashboardController