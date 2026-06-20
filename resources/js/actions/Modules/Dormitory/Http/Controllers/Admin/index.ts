import DashboardController from './DashboardController'
import HallController from './HallController'
import RoomController from './RoomController'
import AssignmentController from './AssignmentController'
import MaintenanceController from './MaintenanceController'
import ReportController from './ReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
HallController: Object.assign(HallController, HallController),
RoomController: Object.assign(RoomController, RoomController),
AssignmentController: Object.assign(AssignmentController, AssignmentController),
MaintenanceController: Object.assign(MaintenanceController, MaintenanceController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Admin