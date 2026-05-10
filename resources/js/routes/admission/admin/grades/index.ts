import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:24
 * @route '/admission/admin/grades'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission/admin/grades',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:24
 * @route '/admission/admin/grades'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:24
 * @route '/admission/admin/grades'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:24
 * @route '/admission/admin/grades'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::section
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:66
 * @route '/admission/admin/grades/section/{section}'
 */
export const section = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: section.url(args, options),
    method: 'get',
})

section.definition = {
    methods: ["get","head"],
    url: '/admission/admin/grades/section/{section}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::section
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:66
 * @route '/admission/admin/grades/section/{section}'
 */
section.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return section.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::section
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:66
 * @route '/admission/admin/grades/section/{section}'
 */
section.get = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: section.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::section
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:66
 * @route '/admission/admin/grades/section/{section}'
 */
section.head = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: section.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::submit
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:126
 * @route '/admission/admin/grades/{enrollment}'
 */
export const submit = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/admission/admin/grades/{enrollment}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::submit
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:126
 * @route '/admission/admin/grades/{enrollment}'
 */
submit.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return submit.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::submit
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:126
 * @route '/admission/admin/grades/{enrollment}'
 */
submit.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:161
 * @route '/admission/admin/grades/{enrollmentSubject}'
 */
export const update = (args: { enrollmentSubject: number | { id: number } } | [enrollmentSubject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admission/admin/grades/{enrollmentSubject}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:161
 * @route '/admission/admin/grades/{enrollmentSubject}'
 */
update.url = (args: { enrollmentSubject: number | { id: number } } | [enrollmentSubject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { enrollmentSubject: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { enrollmentSubject: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    enrollmentSubject: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        enrollmentSubject: typeof args.enrollmentSubject === 'object'
                ? args.enrollmentSubject.id
                : args.enrollmentSubject,
                }

    return update.definition.url
            .replace('{enrollmentSubject}', parsedArgs.enrollmentSubject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::update
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:161
 * @route '/admission/admin/grades/{enrollmentSubject}'
 */
update.patch = (args: { enrollmentSubject: number | { id: number } } | [enrollmentSubject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::bulkUpload
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:184
 * @route '/admission/admin/grades/bulk-upload'
 */
export const bulkUpload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpload.url(options),
    method: 'post',
})

bulkUpload.definition = {
    methods: ["post"],
    url: '/admission/admin/grades/bulk-upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::bulkUpload
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:184
 * @route '/admission/admin/grades/bulk-upload'
 */
bulkUpload.url = (options?: RouteQueryOptions) => {
    return bulkUpload.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::bulkUpload
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:184
 * @route '/admission/admin/grades/bulk-upload'
 */
bulkUpload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bulkUpload.url(options),
    method: 'post',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::exportMethod
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:209
 * @route '/admission/admin/grades/export'
 */
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admission/admin/grades/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::exportMethod
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:209
 * @route '/admission/admin/grades/export'
 */
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::exportMethod
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:209
 * @route '/admission/admin/grades/export'
 */
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::exportMethod
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:209
 * @route '/admission/admin/grades/export'
 */
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::gpa
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:228
 * @route '/admission/admin/grades/{enrollment}/gpa'
 */
export const gpa = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gpa.url(args, options),
    method: 'get',
})

gpa.definition = {
    methods: ["get","head"],
    url: '/admission/admin/grades/{enrollment}/gpa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::gpa
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:228
 * @route '/admission/admin/grades/{enrollment}/gpa'
 */
gpa.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return gpa.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::gpa
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:228
 * @route '/admission/admin/grades/{enrollment}/gpa'
 */
gpa.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gpa.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::gpa
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:228
 * @route '/admission/admin/grades/{enrollment}/gpa'
 */
gpa.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: gpa.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::sheet
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:242
 * @route '/admission/admin/grades/sheet/{section}'
 */
export const sheet = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sheet.url(args, options),
    method: 'get',
})

sheet.definition = {
    methods: ["get","head"],
    url: '/admission/admin/grades/sheet/{section}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::sheet
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:242
 * @route '/admission/admin/grades/sheet/{section}'
 */
sheet.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { section: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        section: typeof args.section === 'object'
                ? args.section.id
                : args.section,
                }

    return sheet.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::sheet
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:242
 * @route '/admission/admin/grades/sheet/{section}'
 */
sheet.get = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sheet.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::sheet
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:242
 * @route '/admission/admin/grades/sheet/{section}'
 */
sheet.head = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sheet.url(args, options),
    method: 'head',
})
const grades = {
    index: Object.assign(index, index),
section: Object.assign(section, section),
submit: Object.assign(submit, submit),
update: Object.assign(update, update),
bulkUpload: Object.assign(bulkUpload, bulkUpload),
export: Object.assign(exportMethod, exportMethod),
gpa: Object.assign(gpa, gpa),
sheet: Object.assign(sheet, sheet),
}

export default grades