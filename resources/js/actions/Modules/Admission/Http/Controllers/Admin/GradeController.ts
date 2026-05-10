import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
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
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::sectionGrades
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:66
 * @route '/admission/admin/grades/section/{section}'
 */
export const sectionGrades = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sectionGrades.url(args, options),
    method: 'get',
})

sectionGrades.definition = {
    methods: ["get","head"],
    url: '/admission/admin/grades/section/{section}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::sectionGrades
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:66
 * @route '/admission/admin/grades/section/{section}'
 */
sectionGrades.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return sectionGrades.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::sectionGrades
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:66
 * @route '/admission/admin/grades/section/{section}'
 */
sectionGrades.get = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sectionGrades.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::sectionGrades
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:66
 * @route '/admission/admin/grades/section/{section}'
 */
sectionGrades.head = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sectionGrades.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::submitGrades
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:126
 * @route '/admission/admin/grades/{enrollment}'
 */
export const submitGrades = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitGrades.url(args, options),
    method: 'post',
})

submitGrades.definition = {
    methods: ["post"],
    url: '/admission/admin/grades/{enrollment}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::submitGrades
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:126
 * @route '/admission/admin/grades/{enrollment}'
 */
submitGrades.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return submitGrades.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::submitGrades
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:126
 * @route '/admission/admin/grades/{enrollment}'
 */
submitGrades.post = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitGrades.url(args, options),
    method: 'post',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::updateGrade
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:161
 * @route '/admission/admin/grades/{enrollmentSubject}'
 */
export const updateGrade = (args: { enrollmentSubject: number | { id: number } } | [enrollmentSubject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateGrade.url(args, options),
    method: 'patch',
})

updateGrade.definition = {
    methods: ["patch"],
    url: '/admission/admin/grades/{enrollmentSubject}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::updateGrade
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:161
 * @route '/admission/admin/grades/{enrollmentSubject}'
 */
updateGrade.url = (args: { enrollmentSubject: number | { id: number } } | [enrollmentSubject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateGrade.definition.url
            .replace('{enrollmentSubject}', parsedArgs.enrollmentSubject.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::updateGrade
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:161
 * @route '/admission/admin/grades/{enrollmentSubject}'
 */
updateGrade.patch = (args: { enrollmentSubject: number | { id: number } } | [enrollmentSubject: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateGrade.url(args, options),
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
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::calculateGPA
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:228
 * @route '/admission/admin/grades/{enrollment}/gpa'
 */
export const calculateGPA = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calculateGPA.url(args, options),
    method: 'get',
})

calculateGPA.definition = {
    methods: ["get","head"],
    url: '/admission/admin/grades/{enrollment}/gpa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::calculateGPA
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:228
 * @route '/admission/admin/grades/{enrollment}/gpa'
 */
calculateGPA.url = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return calculateGPA.definition.url
            .replace('{enrollment}', parsedArgs.enrollment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::calculateGPA
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:228
 * @route '/admission/admin/grades/{enrollment}/gpa'
 */
calculateGPA.get = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: calculateGPA.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::calculateGPA
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:228
 * @route '/admission/admin/grades/{enrollment}/gpa'
 */
calculateGPA.head = (args: { enrollment: number | { id: number } } | [enrollment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: calculateGPA.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::gradeSheet
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:242
 * @route '/admission/admin/grades/sheet/{section}'
 */
export const gradeSheet = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gradeSheet.url(args, options),
    method: 'get',
})

gradeSheet.definition = {
    methods: ["get","head"],
    url: '/admission/admin/grades/sheet/{section}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::gradeSheet
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:242
 * @route '/admission/admin/grades/sheet/{section}'
 */
gradeSheet.url = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return gradeSheet.definition.url
            .replace('{section}', parsedArgs.section.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::gradeSheet
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:242
 * @route '/admission/admin/grades/sheet/{section}'
 */
gradeSheet.get = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gradeSheet.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\GradeController::gradeSheet
 * @see Modules/Admission/app/Http/Controllers/Admin/GradeController.php:242
 * @route '/admission/admin/grades/sheet/{section}'
 */
gradeSheet.head = (args: { section: number | { id: number } } | [section: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: gradeSheet.url(args, options),
    method: 'head',
})
const GradeController = { index, sectionGrades, submitGrades, updateGrade, bulkUpload, exportMethod, calculateGPA, gradeSheet, export: exportMethod }

export default GradeController