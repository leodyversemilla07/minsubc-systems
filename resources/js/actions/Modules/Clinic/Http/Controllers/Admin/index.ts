import ClinicDashboardController from './ClinicDashboardController'
import MedicalRecordController from './MedicalRecordController'
import ConsultationController from './ConsultationController'
import ImmunizationController from './ImmunizationController'
import DentalRecordController from './DentalRecordController'
import PhysicalExamController from './PhysicalExamController'
import AppointmentController from './AppointmentController'
import ReferralController from './ReferralController'
const Admin = {
    ClinicDashboardController: Object.assign(ClinicDashboardController, ClinicDashboardController),
MedicalRecordController: Object.assign(MedicalRecordController, MedicalRecordController),
ConsultationController: Object.assign(ConsultationController, ConsultationController),
ImmunizationController: Object.assign(ImmunizationController, ImmunizationController),
DentalRecordController: Object.assign(DentalRecordController, DentalRecordController),
PhysicalExamController: Object.assign(PhysicalExamController, PhysicalExamController),
AppointmentController: Object.assign(AppointmentController, AppointmentController),
ReferralController: Object.assign(ReferralController, ReferralController),
}

export default Admin