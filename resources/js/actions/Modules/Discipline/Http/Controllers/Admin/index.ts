import DashboardController from './DashboardController'
import OffenseCategoryController from './OffenseCategoryController'
import OffenseController from './OffenseController'
import IncidentController from './IncidentController'
import SanctionController from './SanctionController'
import AppealController from './AppealController'
import ReportController from './ReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
OffenseCategoryController: Object.assign(OffenseCategoryController, OffenseCategoryController),
OffenseController: Object.assign(OffenseController, OffenseController),
IncidentController: Object.assign(IncidentController, IncidentController),
SanctionController: Object.assign(SanctionController, SanctionController),
AppealController: Object.assign(AppealController, AppealController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Admin