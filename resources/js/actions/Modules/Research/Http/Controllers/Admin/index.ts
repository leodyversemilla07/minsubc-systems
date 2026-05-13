import DashboardController from './DashboardController'
import ResearchTypeController from './ResearchTypeController'
import ProposalController from './ProposalController'
import PanelController from './PanelController'
import DefenseController from './DefenseController'
import GradeReportController from './GradeReportController'
import PublicationController from './PublicationController'
import JournalController from './JournalController'
import JournalIssueController from './JournalIssueController'
import ReportController from './ReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ResearchTypeController: Object.assign(ResearchTypeController, ResearchTypeController),
ProposalController: Object.assign(ProposalController, ProposalController),
PanelController: Object.assign(PanelController, PanelController),
DefenseController: Object.assign(DefenseController, DefenseController),
GradeReportController: Object.assign(GradeReportController, GradeReportController),
PublicationController: Object.assign(PublicationController, PublicationController),
JournalController: Object.assign(JournalController, JournalController),
JournalIssueController: Object.assign(JournalIssueController, JournalIssueController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Admin