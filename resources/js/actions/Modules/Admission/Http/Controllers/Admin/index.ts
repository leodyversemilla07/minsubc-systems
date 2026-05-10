import SubjectController from './SubjectController'
import EnrollmentController from './EnrollmentController'
import DashboardController from './DashboardController'
import ApplicantController from './ApplicantController'
import EvaluationController from './EvaluationController'
import ProgramController from './ProgramController'
import AcademicTermController from './AcademicTermController'
import SectionController from './SectionController'
import ScheduleController from './ScheduleController'
import GradeController from './GradeController'
import TranscriptController from './TranscriptController'
const Admin = {
    SubjectController: Object.assign(SubjectController, SubjectController),
EnrollmentController: Object.assign(EnrollmentController, EnrollmentController),
DashboardController: Object.assign(DashboardController, DashboardController),
ApplicantController: Object.assign(ApplicantController, ApplicantController),
EvaluationController: Object.assign(EvaluationController, EvaluationController),
ProgramController: Object.assign(ProgramController, ProgramController),
AcademicTermController: Object.assign(AcademicTermController, AcademicTermController),
SectionController: Object.assign(SectionController, SectionController),
ScheduleController: Object.assign(ScheduleController, ScheduleController),
GradeController: Object.assign(GradeController, GradeController),
TranscriptController: Object.assign(TranscriptController, TranscriptController),
}

export default Admin