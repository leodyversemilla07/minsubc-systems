import Auth from './Auth'
import Settings from './Settings'
import SuperAdminController from './SuperAdminController'
import NotificationController from './NotificationController'
import GlobalSearchController from './GlobalSearchController'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
Settings: Object.assign(Settings, Settings),
SuperAdminController: Object.assign(SuperAdminController, SuperAdminController),
NotificationController: Object.assign(NotificationController, NotificationController),
GlobalSearchController: Object.assign(GlobalSearchController, GlobalSearchController),
}

export default Controllers