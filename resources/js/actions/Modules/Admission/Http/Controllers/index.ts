import Admin from './Admin'
import PageController from './PageController'
import ApplicationController from './ApplicationController'
import PayMongoWebhookController from './PayMongoWebhookController'
import Student from './Student'
const Controllers = {
    Admin: Object.assign(Admin, Admin),
PageController: Object.assign(PageController, PageController),
ApplicationController: Object.assign(ApplicationController, ApplicationController),
PayMongoWebhookController: Object.assign(PayMongoWebhookController, PayMongoWebhookController),
Student: Object.assign(Student, Student),
}

export default Controllers