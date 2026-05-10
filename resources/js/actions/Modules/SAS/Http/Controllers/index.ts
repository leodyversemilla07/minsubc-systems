import SASController from './SASController'
import PageController from './PageController'
import Student from './Student'
import Adviser from './Adviser'
import Admin from './Admin'
import ReportController from './ReportController'
const Controllers = {
    SASController: Object.assign(SASController, SASController),
PageController: Object.assign(PageController, PageController),
Student: Object.assign(Student, Student),
Adviser: Object.assign(Adviser, Adviser),
Admin: Object.assign(Admin, Admin),
ReportController: Object.assign(ReportController, ReportController),
}

export default Controllers