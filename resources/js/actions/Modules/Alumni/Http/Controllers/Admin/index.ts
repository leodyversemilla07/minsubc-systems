import DashboardController from './DashboardController'
import AlumnusController from './AlumnusController'
import EventController from './EventController'
import DonationController from './DonationController'
import EmploymentRecordController from './EmploymentRecordController'
import SurveyController from './SurveyController'
import ReportController from './ReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
AlumnusController: Object.assign(AlumnusController, AlumnusController),
EventController: Object.assign(EventController, EventController),
DonationController: Object.assign(DonationController, DonationController),
EmploymentRecordController: Object.assign(EmploymentRecordController, EmploymentRecordController),
SurveyController: Object.assign(SurveyController, SurveyController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Admin