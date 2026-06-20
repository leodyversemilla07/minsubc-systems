import DashboardController from './DashboardController'
import TicketController from './TicketController'
import CategoryController from './CategoryController'
import ReportController from './ReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
TicketController: Object.assign(TicketController, TicketController),
CategoryController: Object.assign(CategoryController, CategoryController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Admin