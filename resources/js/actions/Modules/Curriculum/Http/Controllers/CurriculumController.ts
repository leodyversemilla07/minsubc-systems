import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:13
 * @route '/curriculum'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/curriculum',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:13
 * @route '/curriculum'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:13
 * @route '/curriculum'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:13
 * @route '/curriculum'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:13
 * @route '/curriculum'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:13
 * @route '/curriculum'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::index
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:13
 * @route '/curriculum'
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
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::programs
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:23
 * @route '/curriculum/programs'
 */
export const programs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: programs.url(options),
    method: 'get',
})

programs.definition = {
    methods: ["get","head"],
    url: '/curriculum/programs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::programs
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:23
 * @route '/curriculum/programs'
 */
programs.url = (options?: RouteQueryOptions) => {
    return programs.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::programs
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:23
 * @route '/curriculum/programs'
 */
programs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: programs.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::programs
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:23
 * @route '/curriculum/programs'
 */
programs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: programs.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::programs
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:23
 * @route '/curriculum/programs'
 */
    const programsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: programs.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::programs
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:23
 * @route '/curriculum/programs'
 */
        programsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: programs.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::programs
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:23
 * @route '/curriculum/programs'
 */
        programsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: programs.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    programs.form = programsForm
/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::courses
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:29
 * @route '/curriculum/courses'
 */
export const courses = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: courses.url(options),
    method: 'get',
})

courses.definition = {
    methods: ["get","head"],
    url: '/curriculum/courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::courses
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:29
 * @route '/curriculum/courses'
 */
courses.url = (options?: RouteQueryOptions) => {
    return courses.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::courses
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:29
 * @route '/curriculum/courses'
 */
courses.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: courses.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::courses
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:29
 * @route '/curriculum/courses'
 */
courses.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: courses.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::courses
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:29
 * @route '/curriculum/courses'
 */
    const coursesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: courses.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::courses
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:29
 * @route '/curriculum/courses'
 */
        coursesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: courses.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::courses
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:29
 * @route '/curriculum/courses'
 */
        coursesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: courses.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    courses.form = coursesForm
/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::viewSyllabus
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
export const viewSyllabus = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewSyllabus.url(args, options),
    method: 'get',
})

viewSyllabus.definition = {
    methods: ["get","head"],
    url: '/curriculum/syllabi/{syllabus}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::viewSyllabus
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
viewSyllabus.url = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { syllabus: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { syllabus: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    syllabus: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        syllabus: typeof args.syllabus === 'object'
                ? args.syllabus.id
                : args.syllabus,
                }

    return viewSyllabus.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::viewSyllabus
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
viewSyllabus.get = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: viewSyllabus.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::viewSyllabus
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
viewSyllabus.head = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: viewSyllabus.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::viewSyllabus
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
    const viewSyllabusForm = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: viewSyllabus.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::viewSyllabus
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
        viewSyllabusForm.get = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewSyllabus.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::viewSyllabus
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
        viewSyllabusForm.head = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: viewSyllabus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    viewSyllabus.form = viewSyllabusForm
const CurriculumController = { index, programs, courses, viewSyllabus }

export default CurriculumController