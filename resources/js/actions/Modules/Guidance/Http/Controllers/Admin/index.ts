import DashboardController from './DashboardController'
import CounselorController from './CounselorController'
import AppointmentSlotController from './AppointmentSlotController'
import AppointmentController from './AppointmentController'
import CounselingSessionController from './CounselingSessionController'
import AssessmentController from './AssessmentController'
import ReferralController from './ReferralController'
import InterventionController from './InterventionController'
import IncidentReportController from './IncidentReportController'
import ReportController from './ReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
CounselorController: Object.assign(CounselorController, CounselorController),
AppointmentSlotController: Object.assign(AppointmentSlotController, AppointmentSlotController),
AppointmentController: Object.assign(AppointmentController, AppointmentController),
CounselingSessionController: Object.assign(CounselingSessionController, CounselingSessionController),
AssessmentController: Object.assign(AssessmentController, AssessmentController),
ReferralController: Object.assign(ReferralController, ReferralController),
InterventionController: Object.assign(InterventionController, InterventionController),
IncidentReportController: Object.assign(IncidentReportController, IncidentReportController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Admin