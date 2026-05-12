import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::view
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
export const view = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})

view.definition = {
    methods: ["get","head"],
    url: '/curriculum/syllabi/{syllabus}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::view
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
view.url = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return view.definition.url
            .replace('{syllabus}', parsedArgs.syllabus.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::view
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
view.get = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: view.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::view
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
view.head = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: view.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::view
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
    const viewForm = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: view.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::view
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
        viewForm.get = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\CurriculumController::view
 * @see Modules/Curriculum/app/Http/Controllers/CurriculumController.php:35
 * @route '/curriculum/syllabi/{syllabus}'
 */
        viewForm.head = (args: { syllabus: number | { id: number } } | [syllabus: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: view.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    view.form = viewForm
const syllabi = {
    view: Object.assign(view, view),
}

export default syllabi