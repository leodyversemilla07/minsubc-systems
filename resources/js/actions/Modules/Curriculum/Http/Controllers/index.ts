import CurriculumController from './CurriculumController'
import Admin from './Admin'
const Controllers = {
    CurriculumController: Object.assign(CurriculumController, CurriculumController),
Admin: Object.assign(Admin, Admin),
}

export default Controllers