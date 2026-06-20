import DashboardController from './DashboardController'
import FacilityController from './FacilityController'
import EquipmentController from './EquipmentController'
import ReservationController from './ReservationController'
import MaintenanceController from './MaintenanceController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
FacilityController: Object.assign(FacilityController, FacilityController),
EquipmentController: Object.assign(EquipmentController, EquipmentController),
ReservationController: Object.assign(ReservationController, ReservationController),
MaintenanceController: Object.assign(MaintenanceController, MaintenanceController),
}

export default Admin