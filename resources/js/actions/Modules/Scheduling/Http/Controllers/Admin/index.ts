import DashboardController from './DashboardController'
import EventController from './EventController'
import AcademicScheduleController from './AcademicScheduleController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
EventController: Object.assign(EventController, EventController),
AcademicScheduleController: Object.assign(AcademicScheduleController, AcademicScheduleController),
}

export default Admin