import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:26
 * @route '/admission/admin/transcripts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admission/admin/transcripts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:26
 * @route '/admission/admin/transcripts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:26
 * @route '/admission/admin/transcripts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::index
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:26
 * @route '/admission/admin/transcripts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::verify
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:117
 * @route '/admission/admin/transcripts/verify'
 */
export const verify = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/admission/admin/transcripts/verify',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::verify
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:117
 * @route '/admission/admin/transcripts/verify'
 */
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::verify
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:117
 * @route '/admission/admin/transcripts/verify'
 */
verify.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::verify
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:117
 * @route '/admission/admin/transcripts/verify'
 */
verify.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::preview
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:74
 * @route '/admission/admin/transcripts/{studentId}'
 */
export const preview = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/admission/admin/transcripts/{studentId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::preview
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:74
 * @route '/admission/admin/transcripts/{studentId}'
 */
preview.url = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    studentId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentId: args.studentId,
                }

    return preview.definition.url
            .replace('{studentId}', parsedArgs.studentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::preview
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:74
 * @route '/admission/admin/transcripts/{studentId}'
 */
preview.get = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::preview
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:74
 * @route '/admission/admin/transcripts/{studentId}'
 */
preview.head = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::download
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:55
 * @route '/admission/admin/transcripts/{studentId}/download'
 */
export const download = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/admission/admin/transcripts/{studentId}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::download
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:55
 * @route '/admission/admin/transcripts/{studentId}/download'
 */
download.url = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    studentId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentId: args.studentId,
                }

    return download.definition.url
            .replace('{studentId}', parsedArgs.studentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::download
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:55
 * @route '/admission/admin/transcripts/{studentId}/download'
 */
download.get = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::download
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:55
 * @route '/admission/admin/transcripts/{studentId}/download'
 */
download.head = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::trueCopy
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:98
 * @route '/admission/admin/transcripts/{studentId}/tcos'
 */
export const trueCopy = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trueCopy.url(args, options),
    method: 'get',
})

trueCopy.definition = {
    methods: ["get","head"],
    url: '/admission/admin/transcripts/{studentId}/tcos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::trueCopy
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:98
 * @route '/admission/admin/transcripts/{studentId}/tcos'
 */
trueCopy.url = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { studentId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    studentId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        studentId: args.studentId,
                }

    return trueCopy.definition.url
            .replace('{studentId}', parsedArgs.studentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::trueCopy
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:98
 * @route '/admission/admin/transcripts/{studentId}/tcos'
 */
trueCopy.get = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: trueCopy.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::trueCopy
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:98
 * @route '/admission/admin/transcripts/{studentId}/tcos'
 */
trueCopy.head = (args: { studentId: string | number } | [studentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: trueCopy.url(args, options),
    method: 'head',
})

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::batchPrint
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:141
 * @route '/admission/admin/transcripts/batch-print'
 */
export const batchPrint = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batchPrint.url(options),
    method: 'post',
})

batchPrint.definition = {
    methods: ["post"],
    url: '/admission/admin/transcripts/batch-print',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::batchPrint
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:141
 * @route '/admission/admin/transcripts/batch-print'
 */
batchPrint.url = (options?: RouteQueryOptions) => {
    return batchPrint.definition.url + queryParams(options)
}

/**
* @see \Modules\Admission\Http\Controllers\Admin\TranscriptController::batchPrint
 * @see Modules/Admission/app/Http/Controllers/Admin/TranscriptController.php:141
 * @route '/admission/admin/transcripts/batch-print'
 */
batchPrint.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: batchPrint.url(options),
    method: 'post',
})
const TranscriptController = { index, verify, preview, download, trueCopy, batchPrint }

export default TranscriptController