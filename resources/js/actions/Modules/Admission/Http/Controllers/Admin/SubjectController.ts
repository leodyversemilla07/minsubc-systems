import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
const index663c3e3bf0641252ae4c525384f02bf4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index663c3e3bf0641252ae4c525384f02bf4.url(options),
    method: 'get',
})

index663c3e3bf0641252ae4c525384f02bf4.definition = {
    methods: ["get","head"],
    url: '/api/admission/subjects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
index663c3e3bf0641252ae4c525384f02bf4.url = (options?: RouteQueryOptions) => {
    return index663c3e3bf0641252ae4c525384f02bf4.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
index663c3e3bf0641252ae4c525384f02bf4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index663c3e3bf0641252ae4c525384f02bf4.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
index663c3e3bf0641252ae4c525384f02bf4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index663c3e3bf0641252ae4c525384f02bf4.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
    const index663c3e3bf0641252ae4c525384f02bf4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index663c3e3bf0641252ae4c525384f02bf4.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
        index663c3e3bf0641252ae4c525384f02bf4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index663c3e3bf0641252ae4c525384f02bf4.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/api/admission/subjects'
 */
        index663c3e3bf0641252ae4c525384f02bf4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index663c3e3bf0641252ae4c525384f02bf4.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index663c3e3bf0641252ae4c525384f02bf4.form = index663c3e3bf0641252ae4c525384f02bf4Form
    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
const index4f701a71af904624fe696b1e3bf61565 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4f701a71af904624fe696b1e3bf61565.url(options),
    method: 'get',
})

index4f701a71af904624fe696b1e3bf61565.definition = {
    methods: ["get","head"],
    url: '/admission/admin/subjects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
index4f701a71af904624fe696b1e3bf61565.url = (options?: RouteQueryOptions) => {
    return index4f701a71af904624fe696b1e3bf61565.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
index4f701a71af904624fe696b1e3bf61565.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index4f701a71af904624fe696b1e3bf61565.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
index4f701a71af904624fe696b1e3bf61565.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index4f701a71af904624fe696b1e3bf61565.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
    const index4f701a71af904624fe696b1e3bf61565Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index4f701a71af904624fe696b1e3bf61565.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
        index4f701a71af904624fe696b1e3bf61565Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index4f701a71af904624fe696b1e3bf61565.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:18
 * @route '/admission/admin/subjects'
 */
        index4f701a71af904624fe696b1e3bf61565Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index4f701a71af904624fe696b1e3bf61565.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index4f701a71af904624fe696b1e3bf61565.form = index4f701a71af904624fe696b1e3bf61565Form

export const index = {
    '/api/admission/subjects': index663c3e3bf0641252ae4c525384f02bf4,
    '/admission/admin/subjects': index4f701a71af904624fe696b1e3bf61565,
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
const byCourseec153e8aa66afc97b283fde150fd7424 = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourseec153e8aa66afc97b283fde150fd7424.url(args, options),
    method: 'get',
})

byCourseec153e8aa66afc97b283fde150fd7424.definition = {
    methods: ["get","head"],
    url: '/api/admission/subjects/by-course/{courseId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
byCourseec153e8aa66afc97b283fde150fd7424.url = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return byCourseec153e8aa66afc97b283fde150fd7424.definition.url
            .replace('{courseId}', parsedArgs.courseId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
byCourseec153e8aa66afc97b283fde150fd7424.get = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourseec153e8aa66afc97b283fde150fd7424.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
byCourseec153e8aa66afc97b283fde150fd7424.head = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byCourseec153e8aa66afc97b283fde150fd7424.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
    const byCourseec153e8aa66afc97b283fde150fd7424Form = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: byCourseec153e8aa66afc97b283fde150fd7424.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
        byCourseec153e8aa66afc97b283fde150fd7424Form.get = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourseec153e8aa66afc97b283fde150fd7424.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/api/admission/subjects/by-course/{courseId}'
 */
        byCourseec153e8aa66afc97b283fde150fd7424Form.head = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourseec153e8aa66afc97b283fde150fd7424.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    byCourseec153e8aa66afc97b283fde150fd7424.form = byCourseec153e8aa66afc97b283fde150fd7424Form
    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
const byCoursef27255e5bbc005ca15c26455833000c7 = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCoursef27255e5bbc005ca15c26455833000c7.url(args, options),
    method: 'get',
})

byCoursef27255e5bbc005ca15c26455833000c7.definition = {
    methods: ["get","head"],
    url: '/admission/admin/subjects/by-course/{courseId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
byCoursef27255e5bbc005ca15c26455833000c7.url = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return byCoursef27255e5bbc005ca15c26455833000c7.definition.url
            .replace('{courseId}', parsedArgs.courseId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
byCoursef27255e5bbc005ca15c26455833000c7.get = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCoursef27255e5bbc005ca15c26455833000c7.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
byCoursef27255e5bbc005ca15c26455833000c7.head = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byCoursef27255e5bbc005ca15c26455833000c7.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
    const byCoursef27255e5bbc005ca15c26455833000c7Form = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: byCoursef27255e5bbc005ca15c26455833000c7.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
        byCoursef27255e5bbc005ca15c26455833000c7Form.get = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCoursef27255e5bbc005ca15c26455833000c7.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourse
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:161
 * @route '/admission/admin/subjects/by-course/{courseId}'
 */
        byCoursef27255e5bbc005ca15c26455833000c7Form.head = (args: { courseId: string | number } | [courseId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCoursef27255e5bbc005ca15c26455833000c7.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    byCoursef27255e5bbc005ca15c26455833000c7.form = byCoursef27255e5bbc005ca15c26455833000c7Form

export const byCourse = {
    '/api/admission/subjects/by-course/{courseId}': byCourseec153e8aa66afc97b283fde150fd7424,
    '/admission/admin/subjects/by-course/{courseId}': byCoursef27255e5bbc005ca15c26455833000c7,
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
const byCourseAndLevelc198069b0eead1641b89a1fb2196b58e = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.url(options),
    method: 'get',
})

byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.definition = {
    methods: ["get","head"],
    url: '/api/admission/subjects/by-course-level',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.url = (options?: RouteQueryOptions) => {
    return byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
    const byCourseAndLevelc198069b0eead1641b89a1fb2196b58eForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
        byCourseAndLevelc198069b0eead1641b89a1fb2196b58eForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/api/admission/subjects/by-course-level'
 */
        byCourseAndLevelc198069b0eead1641b89a1fb2196b58eForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    byCourseAndLevelc198069b0eead1641b89a1fb2196b58e.form = byCourseAndLevelc198069b0eead1641b89a1fb2196b58eForm
    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
const byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.url(options),
    method: 'get',
})

byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.definition = {
    methods: ["get","head"],
    url: '/admission/admin/subjects/by-course-level',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.url = (options?: RouteQueryOptions) => {
    return byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.url(options),
    method: 'head',
})

    /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
    const byCourseAndLevelfd92ffe5e51cf9148612f9084c37055cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
        byCourseAndLevelfd92ffe5e51cf9148612f9084c37055cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::byCourseAndLevel
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:175
 * @route '/admission/admin/subjects/by-course-level'
 */
        byCourseAndLevelfd92ffe5e51cf9148612f9084c37055cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c.form = byCourseAndLevelfd92ffe5e51cf9148612f9084c37055cForm

export const byCourseAndLevel = {
    '/api/admission/subjects/by-course-level': byCourseAndLevelc198069b0eead1641b89a1fb2196b58e,
    '/admission/admin/subjects/by-course-level': byCourseAndLevelfd92ffe5e51cf9148612f9084c37055c,
}

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
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:45
 * @route '/admission/admin/subjects/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:45
 * @route '/admission/admin/subjects/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::create
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:45
 * @route '/admission/admin/subjects/create'
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
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:59
 * @route '/admission/admin/subjects'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::store
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:59
 * @route '/admission/admin/subjects'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
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
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:85
 * @route '/admission/admin/subjects/{subject}'
 */
    const showForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:85
 * @route '/admission/admin/subjects/{subject}'
 */
        showForm.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::show
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:85
 * @route '/admission/admin/subjects/{subject}'
 */
        showForm.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:101
 * @route '/admission/admin/subjects/{subject}/edit'
 */
    const editForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:101
 * @route '/admission/admin/subjects/{subject}/edit'
 */
        editForm.get = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::edit
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:101
 * @route '/admission/admin/subjects/{subject}/edit'
 */
        editForm.head = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
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
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:117
 * @route '/admission/admin/subjects/{subject}'
 */
    const updateForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:117
 * @route '/admission/admin/subjects/{subject}'
 */
        updateForm.patch = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
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
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:143
 * @route '/admission/admin/subjects/{subject}'
 */
    const destroyForm = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Admission\Http\Controllers\Admin\SubjectController::destroy
 * @see Modules/Admission/app/Http/Controllers/Admin/SubjectController.php:143
 * @route '/admission/admin/subjects/{subject}'
 */
        destroyForm.delete = (args: { subject: number | { id: number } } | [subject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const SubjectController = { index, byCourse, byCourseAndLevel, create, store, show, edit, update, destroy }

export default SubjectController