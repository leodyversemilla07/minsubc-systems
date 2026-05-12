import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/guidance/counselor/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::index
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:14
 * @route '/guidance/counselor/dashboard'
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
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: '/guidance/counselor/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::appointments
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:34
 * @route '/guidance/counselor/appointments'
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
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
export const students = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(options),
    method: 'get',
})

students.definition = {
    methods: ["get","head"],
    url: '/guidance/counselor/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
students.url = (options?: RouteQueryOptions) => {
    return students.definition.url + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
students.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: students.url(options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
students.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: students.url(options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
    const studentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: students.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
        studentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::students
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:43
 * @route '/guidance/counselor/students'
 */
        studentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: students.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    students.form = studentsForm
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::studentProfile
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
export const studentProfile = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentProfile.url(args, options),
    method: 'get',
})

studentProfile.definition = {
    methods: ["get","head"],
    url: '/guidance/counselor/students/{student}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::studentProfile
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
studentProfile.url = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'student_id' in args) {
            args = { student: args.student_id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    student: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        student: typeof args.student === 'object'
                ? args.student.student_id
                : args.student,
                }

    return studentProfile.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::studentProfile
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
studentProfile.get = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentProfile.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::studentProfile
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
studentProfile.head = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: studentProfile.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::studentProfile
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
    const studentProfileForm = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: studentProfile.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::studentProfile
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
        studentProfileForm.get = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: studentProfile.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Guidance\Http\Controllers\Counselor\CounselorDashboardController::studentProfile
 * @see Modules/Guidance/app/Http/Controllers/Counselor/CounselorDashboardController.php:52
 * @route '/guidance/counselor/students/{student}'
 */
        studentProfileForm.head = (args: { student: string | { student_id: string } } | [student: string | { student_id: string } ] | string | { student_id: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: studentProfile.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    studentProfile.form = studentProfileForm
const CounselorDashboardController = { index, appointments, students, studentProfile }

export default CounselorDashboardController