import DashboardController from './DashboardController'
import ProgramController from './ProgramController'
import ProgramOutcomeController from './ProgramOutcomeController'
import CurriculumController from './CurriculumController'
import CourseController from './CourseController'
import SyllabusController from './SyllabusController'
import TextbookController from './TextbookController'
import ReportController from './ReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ProgramController: Object.assign(ProgramController, ProgramController),
ProgramOutcomeController: Object.assign(ProgramOutcomeController, ProgramOutcomeController),
CurriculumController: Object.assign(CurriculumController, CurriculumController),
CourseController: Object.assign(CourseController, CourseController),
SyllabusController: Object.assign(SyllabusController, SyllabusController),
TextbookController: Object.assign(TextbookController, TextbookController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Admin