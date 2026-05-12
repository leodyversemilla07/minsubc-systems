import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/curriculum/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/curriculum/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/curriculum/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/curriculum/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/curriculum/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/curriculum/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::index
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:14
 * @route '/curriculum/admin/reports'
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
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::curriculumMap
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/curriculum/admin/reports/curriculum-map'
 */
export const curriculumMap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: curriculumMap.url(options),
    method: 'get',
})

curriculumMap.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/reports/curriculum-map',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::curriculumMap
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/curriculum/admin/reports/curriculum-map'
 */
curriculumMap.url = (options?: RouteQueryOptions) => {
    return curriculumMap.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::curriculumMap
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/curriculum/admin/reports/curriculum-map'
 */
curriculumMap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: curriculumMap.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::curriculumMap
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/curriculum/admin/reports/curriculum-map'
 */
curriculumMap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: curriculumMap.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::curriculumMap
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/curriculum/admin/reports/curriculum-map'
 */
    const curriculumMapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: curriculumMap.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::curriculumMap
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/curriculum/admin/reports/curriculum-map'
 */
        curriculumMapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: curriculumMap.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::curriculumMap
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:15
 * @route '/curriculum/admin/reports/curriculum-map'
 */
        curriculumMapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: curriculumMap.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    curriculumMap.form = curriculumMapForm
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::syllabusStatus
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:16
 * @route '/curriculum/admin/reports/syllabus-status'
 */
export const syllabusStatus = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: syllabusStatus.url(options),
    method: 'get',
})

syllabusStatus.definition = {
    methods: ["get","head"],
    url: '/curriculum/admin/reports/syllabus-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::syllabusStatus
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:16
 * @route '/curriculum/admin/reports/syllabus-status'
 */
syllabusStatus.url = (options?: RouteQueryOptions) => {
    return syllabusStatus.definition.url + queryParams(options)
}

/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::syllabusStatus
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:16
 * @route '/curriculum/admin/reports/syllabus-status'
 */
syllabusStatus.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: syllabusStatus.url(options),
    method: 'get',
})
/**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::syllabusStatus
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:16
 * @route '/curriculum/admin/reports/syllabus-status'
 */
syllabusStatus.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: syllabusStatus.url(options),
    method: 'head',
})

    /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::syllabusStatus
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:16
 * @route '/curriculum/admin/reports/syllabus-status'
 */
    const syllabusStatusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: syllabusStatus.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::syllabusStatus
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:16
 * @route '/curriculum/admin/reports/syllabus-status'
 */
        syllabusStatusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: syllabusStatus.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Curriculum\Http\Controllers\Admin\ReportController::syllabusStatus
 * @see Modules/Curriculum/app/Http/Controllers/Admin/ReportController.php:16
 * @route '/curriculum/admin/reports/syllabus-status'
 */
        syllabusStatusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: syllabusStatus.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    syllabusStatus.form = syllabusStatusForm
const ReportController = { index, curriculumMap, syllabusStatus }

export default ReportController