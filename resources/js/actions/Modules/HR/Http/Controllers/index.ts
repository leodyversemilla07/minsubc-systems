import HRController from './HRController'
import Employee from './Employee'
import Admin from './Admin'
const Controllers = {
    HRController: Object.assign(HRController, HRController),
Employee: Object.assign(Employee, Employee),
Admin: Object.assign(Admin, Admin),
}

export default Controllers