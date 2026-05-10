import DashboardController from './DashboardController'
import AnalyticsController from './AnalyticsController'
import ElectionController from './ElectionController'
import CandidateController from './CandidateController'
import PositionController from './PositionController'
import PartylistController from './PartylistController'
import VoterManagementController from './VoterManagementController'
import ActivityLogController from './ActivityLogController'
import FeedbackController from './FeedbackController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
AnalyticsController: Object.assign(AnalyticsController, AnalyticsController),
ElectionController: Object.assign(ElectionController, ElectionController),
CandidateController: Object.assign(CandidateController, CandidateController),
PositionController: Object.assign(PositionController, PositionController),
PartylistController: Object.assign(PartylistController, PartylistController),
VoterManagementController: Object.assign(VoterManagementController, VoterManagementController),
ActivityLogController: Object.assign(ActivityLogController, ActivityLogController),
FeedbackController: Object.assign(FeedbackController, FeedbackController),
}

export default Admin