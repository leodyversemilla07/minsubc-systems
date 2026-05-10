import VoterAuthController from './VoterAuthController'
import BallotController from './BallotController'
import FeedbackController from './FeedbackController'
import ResultsController from './ResultsController'
import Admin from './Admin'
const Controllers = {
    VoterAuthController: Object.assign(VoterAuthController, VoterAuthController),
BallotController: Object.assign(BallotController, BallotController),
FeedbackController: Object.assign(FeedbackController, FeedbackController),
ResultsController: Object.assign(ResultsController, ResultsController),
Admin: Object.assign(Admin, Admin),
}

export default Controllers