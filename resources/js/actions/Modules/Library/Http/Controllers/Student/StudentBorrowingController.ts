import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/library/student/borrowings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::index
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:15
 * @route '/library/student/borrowings'
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
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
export const show = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/library/student/borrowings/{borrowing}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
show.url = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { borrowing: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { borrowing: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    borrowing: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        borrowing: typeof args.borrowing === 'object'
                ? args.borrowing.id
                : args.borrowing,
                }

    return show.definition.url
            .replace('{borrowing}', parsedArgs.borrowing.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
show.get = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
show.head = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
    const showForm = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
        showForm.get = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::show
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:36
 * @route '/library/student/borrowings/{borrowing}'
 */
        showForm.head = (args: { borrowing: number | { id: number } } | [borrowing: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reservations
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:46
 * @route '/library/student/reservations'
 */
export const reservations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reservations.url(options),
    method: 'get',
})

reservations.definition = {
    methods: ["get","head"],
    url: '/library/student/reservations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reservations
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:46
 * @route '/library/student/reservations'
 */
reservations.url = (options?: RouteQueryOptions) => {
    return reservations.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reservations
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:46
 * @route '/library/student/reservations'
 */
reservations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reservations.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reservations
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:46
 * @route '/library/student/reservations'
 */
reservations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reservations.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reservations
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:46
 * @route '/library/student/reservations'
 */
    const reservationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reservations.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reservations
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:46
 * @route '/library/student/reservations'
 */
        reservationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reservations.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reservations
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:46
 * @route '/library/student/reservations'
 */
        reservationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reservations.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reservations.form = reservationsForm
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reserve
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:56
 * @route '/library/student/books/{book}/reserve'
 */
export const reserve = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserve.url(args, options),
    method: 'post',
})

reserve.definition = {
    methods: ["post"],
    url: '/library/student/books/{book}/reserve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reserve
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:56
 * @route '/library/student/books/{book}/reserve'
 */
reserve.url = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { book: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { book: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    book: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        book: typeof args.book === 'object'
                ? args.book.id
                : args.book,
                }

    return reserve.definition.url
            .replace('{book}', parsedArgs.book.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reserve
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:56
 * @route '/library/student/books/{book}/reserve'
 */
reserve.post = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserve.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reserve
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:56
 * @route '/library/student/books/{book}/reserve'
 */
    const reserveForm = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reserve.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::reserve
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:56
 * @route '/library/student/books/{book}/reserve'
 */
        reserveForm.post = (args: { book: number | { id: number } } | [book: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reserve.url(args, options),
            method: 'post',
        })
    
    reserve.form = reserveForm
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::cancelReservation
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:83
 * @route '/library/student/reservations/{reservation}'
 */
export const cancelReservation = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: cancelReservation.url(args, options),
    method: 'delete',
})

cancelReservation.definition = {
    methods: ["delete"],
    url: '/library/student/reservations/{reservation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::cancelReservation
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:83
 * @route '/library/student/reservations/{reservation}'
 */
cancelReservation.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reservation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reservation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reservation: typeof args.reservation === 'object'
                ? args.reservation.id
                : args.reservation,
                }

    return cancelReservation.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::cancelReservation
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:83
 * @route '/library/student/reservations/{reservation}'
 */
cancelReservation.delete = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: cancelReservation.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::cancelReservation
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:83
 * @route '/library/student/reservations/{reservation}'
 */
    const cancelReservationForm = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancelReservation.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::cancelReservation
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:83
 * @route '/library/student/reservations/{reservation}'
 */
        cancelReservationForm.delete = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancelReservation.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    cancelReservation.form = cancelReservationForm
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::fines
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
export const fines = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fines.url(options),
    method: 'get',
})

fines.definition = {
    methods: ["get","head"],
    url: '/library/student/fines',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::fines
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
fines.url = (options?: RouteQueryOptions) => {
    return fines.definition.url + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::fines
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
fines.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fines.url(options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::fines
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
fines.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fines.url(options),
    method: 'head',
})

    /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::fines
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
    const finesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: fines.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::fines
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
        finesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fines.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Library\Http\Controllers\Student\StudentBorrowingController::fines
 * @see Modules/Library/app/Http/Controllers/Student/StudentBorrowingController.php:95
 * @route '/library/student/fines'
 */
        finesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fines.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    fines.form = finesForm
const StudentBorrowingController = { index, show, reservations, reserve, cancelReservation, fines }

export default StudentBorrowingController