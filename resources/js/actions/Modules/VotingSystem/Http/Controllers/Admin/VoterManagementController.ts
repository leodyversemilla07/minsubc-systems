import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:19
 * @route '/voting/admin/voters'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/voting/admin/voters',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:19
 * @route '/voting/admin/voters'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:19
 * @route '/voting/admin/voters'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::index
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:19
 * @route '/voting/admin/voters'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:41
 * @route '/voting/admin/voters/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/voting/admin/voters/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:41
 * @route '/voting/admin/voters/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:41
 * @route '/voting/admin/voters/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::create
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:41
 * @route '/voting/admin/voters/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:64
 * @route '/voting/admin/voters'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/voting/admin/voters',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:64
 * @route '/voting/admin/voters'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::store
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:64
 * @route '/voting/admin/voters'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:104
 * @route '/voting/admin/voters/{voter}'
 */
export const show = (args: { voter: number | { id: number } } | [voter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/voting/admin/voters/{voter}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:104
 * @route '/voting/admin/voters/{voter}'
 */
show.url = (args: { voter: number | { id: number } } | [voter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { voter: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { voter: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    voter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        voter: typeof args.voter === 'object'
                ? args.voter.id
                : args.voter,
                }

    return show.definition.url
            .replace('{voter}', parsedArgs.voter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:104
 * @route '/voting/admin/voters/{voter}'
 */
show.get = (args: { voter: number | { id: number } } | [voter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::show
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:104
 * @route '/voting/admin/voters/{voter}'
 */
show.head = (args: { voter: number | { id: number } } | [voter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:0
 * @route '/voting/admin/voters/{voter}'
 */
export const update = (args: { voter: string | number } | [voter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/voting/admin/voters/{voter}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:0
 * @route '/voting/admin/voters/{voter}'
 */
update.url = (args: { voter: string | number } | [voter: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { voter: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    voter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        voter: args.voter,
                }

    return update.definition.url
            .replace('{voter}', parsedArgs.voter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::update
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:0
 * @route '/voting/admin/voters/{voter}'
 */
update.put = (args: { voter: string | number } | [voter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:128
 * @route '/voting/admin/voters/{voter}'
 */
export const destroy = (args: { voter: number | { id: number } } | [voter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/voting/admin/voters/{voter}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:128
 * @route '/voting/admin/voters/{voter}'
 */
destroy.url = (args: { voter: number | { id: number } } | [voter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { voter: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { voter: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    voter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        voter: typeof args.voter === 'object'
                ? args.voter.id
                : args.voter,
                }

    return destroy.definition.url
            .replace('{voter}', parsedArgs.voter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::destroy
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:128
 * @route '/voting/admin/voters/{voter}'
 */
destroy.delete = (args: { voter: number | { id: number } } | [voter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::resetVote
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:114
 * @route '/voting/admin/voters/{voter}/reset-vote'
 */
export const resetVote = (args: { voter: number | { id: number } } | [voter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetVote.url(args, options),
    method: 'post',
})

resetVote.definition = {
    methods: ["post"],
    url: '/voting/admin/voters/{voter}/reset-vote',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::resetVote
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:114
 * @route '/voting/admin/voters/{voter}/reset-vote'
 */
resetVote.url = (args: { voter: number | { id: number } } | [voter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { voter: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { voter: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    voter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        voter: typeof args.voter === 'object'
                ? args.voter.id
                : args.voter,
                }

    return resetVote.definition.url
            .replace('{voter}', parsedArgs.voter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::resetVote
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:114
 * @route '/voting/admin/voters/{voter}/reset-vote'
 */
resetVote.post = (args: { voter: number | { id: number } } | [voter: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetVote.url(args, options),
    method: 'post',
})

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::exportMethod
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:140
 * @route '/voting/admin/voters/{election}/export'
 */
export const exportMethod = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/voting/admin/voters/{election}/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::exportMethod
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:140
 * @route '/voting/admin/voters/{election}/export'
 */
exportMethod.url = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { election: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { election: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    election: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        election: typeof args.election === 'object'
                ? args.election.id
                : args.election,
                }

    return exportMethod.definition.url
            .replace('{election}', parsedArgs.election.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::exportMethod
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:140
 * @route '/voting/admin/voters/{election}/export'
 */
exportMethod.get = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(args, options),
    method: 'get',
})
/**
* @see \Modules\VotingSystem\Http\Controllers\Admin\VoterManagementController::exportMethod
 * @see Modules/VotingSystem/app/Http/Controllers/Admin/VoterManagementController.php:140
 * @route '/voting/admin/voters/{election}/export'
 */
exportMethod.head = (args: { election: number | { id: number } } | [election: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(args, options),
    method: 'head',
})
const VoterManagementController = { index, create, store, show, update, destroy, resetVote, exportMethod, export: exportMethod }

export default VoterManagementController