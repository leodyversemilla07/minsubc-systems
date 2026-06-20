import AlumniController from './AlumniController'
import Admin from './Admin'
const Controllers = {
    AlumniController: Object.assign(AlumniController, AlumniController),
Admin: Object.assign(Admin, Admin),
}

export default Controllers