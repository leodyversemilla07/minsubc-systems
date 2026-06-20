import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import medicalRecords from './medical-records'
import consultations from './consultations'
import immunizations from './immunizations'
import dentalRecords from './dental-records'
import physicalExams from './physical-exams'
import appointments from './appointments'
import referrals from './referrals'
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::dashboard
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/clinic/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::dashboard
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::dashboard
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::dashboard
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::dashboard
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::dashboard
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Clinic\Http\Controllers\Admin\ClinicDashboardController::dashboard
 * @see Modules/Clinic/app/Http/Controllers/Admin/ClinicDashboardController.php:19
 * @route '/clinic/admin'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
medicalRecords: Object.assign(medicalRecords, medicalRecords),
consultations: Object.assign(consultations, consultations),
immunizations: Object.assign(immunizations, immunizations),
dentalRecords: Object.assign(dentalRecords, dentalRecords),
physicalExams: Object.assign(physicalExams, physicalExams),
appointments: Object.assign(appointments, appointments),
referrals: Object.assign(referrals, referrals),
}

export default admin