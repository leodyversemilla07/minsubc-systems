import ResearchController from './ResearchController'
import Admin from './Admin'
const Controllers = {
    ResearchController: Object.assign(ResearchController, ResearchController),
Admin: Object.assign(Admin, Admin),
}

export default Controllers