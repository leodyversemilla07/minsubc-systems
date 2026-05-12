import DashboardController from './DashboardController'
import DepartmentController from './DepartmentController'
import PositionController from './PositionController'
import EmployeeController from './EmployeeController'
import AttendanceController from './AttendanceController'
import LeaveController from './LeaveController'
import EvaluationController from './EvaluationController'
import ReportController from './ReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
DepartmentController: Object.assign(DepartmentController, DepartmentController),
PositionController: Object.assign(PositionController, PositionController),
EmployeeController: Object.assign(EmployeeController, EmployeeController),
AttendanceController: Object.assign(AttendanceController, AttendanceController),
LeaveController: Object.assign(LeaveController, LeaveController),
EvaluationController: Object.assign(EvaluationController, EvaluationController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Admin