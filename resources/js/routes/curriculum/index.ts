import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import syllabi from './syllabi'
import admin from './admin'
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
const curriculum = {
    index: Object.assign(index, index),
programs: Object.assign(programs, programs),
courses: Object.assign(courses, courses),
syllabi: Object.assign(syllabi, syllabi),
admin: Object.assign(admin, admin),
}

export default curriculum