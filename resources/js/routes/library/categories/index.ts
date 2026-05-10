import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
export const show = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/library/categories/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
show.url = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return show.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
show.get = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Library\Http\Controllers\LibraryController::show
 * @see Modules/Library/app/Http/Controllers/LibraryController.php:58
 * @route '/library/categories/{category}'
 */
show.head = (args: { category: string | number | { id: string | number } } | [category: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const categories = {
    show: Object.assign(show, show),
}

export default categories