import GuidanceController from './GuidanceController'
import Student from './Student'
import Admin from './Admin'
import Counselor from './Counselor'
const Controllers = {
    GuidanceController: Object.assign(GuidanceController, GuidanceController),
Student: Object.assign(Student, Student),
Admin: Object.assign(Admin, Admin),
Counselor: Object.assign(Counselor, Counselor),
}

export default Controllers