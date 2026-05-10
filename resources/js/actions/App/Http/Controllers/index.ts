import Auth from './Auth'
import Settings from './Settings'
import SuperAdminController from './SuperAdminController'
import NotificationController from './NotificationController'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
Settings: Object.assign(Settings, Settings),
SuperAdminController: Object.assign(SuperAdminController, SuperAdminController),
NotificationController: Object.assign(NotificationController, NotificationController),
}

export default Controllers