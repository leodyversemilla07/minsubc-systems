import AccountingController from './AccountingController'
import Student from './Student'
import Admin from './Admin'
const Controllers = {
    AccountingController: Object.assign(AccountingController, AccountingController),
Student: Object.assign(Student, Student),
Admin: Object.assign(Admin, Admin),
}

export default Controllers