import DashboardController from './DashboardController'
import AnalyticsController from './AnalyticsController'
import VMGOController from './VMGOController'
import OfficerController from './OfficerController'
import AnnouncementController from './AnnouncementController'
import EventController from './EventController'
import ResolutionController from './ResolutionController'
import DocumentController from './DocumentController'
import TransparencyReportController from './TransparencyReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
AnalyticsController: Object.assign(AnalyticsController, AnalyticsController),
VMGOController: Object.assign(VMGOController, VMGOController),
OfficerController: Object.assign(OfficerController, OfficerController),
AnnouncementController: Object.assign(AnnouncementController, AnnouncementController),
EventController: Object.assign(EventController, EventController),
ResolutionController: Object.assign(ResolutionController, ResolutionController),
DocumentController: Object.assign(DocumentController, DocumentController),
TransparencyReportController: Object.assign(TransparencyReportController, TransparencyReportController),
}

export default Admin