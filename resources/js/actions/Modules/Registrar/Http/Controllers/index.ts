import RegistrarController from './RegistrarController'
import DocumentRequestController from './DocumentRequestController'
import PaymentController from './PaymentController'
import AdminController from './AdminController'
import AnalyticsController from './AnalyticsController'
import BulkOperationsController from './BulkOperationsController'
import StudentController from './StudentController'
const Controllers = {
    RegistrarController: Object.assign(RegistrarController, RegistrarController),
DocumentRequestController: Object.assign(DocumentRequestController, DocumentRequestController),
PaymentController: Object.assign(PaymentController, PaymentController),
AdminController: Object.assign(AdminController, AdminController),
AnalyticsController: Object.assign(AnalyticsController, AnalyticsController),
BulkOperationsController: Object.assign(BulkOperationsController, BulkOperationsController),
StudentController: Object.assign(StudentController, StudentController),
}

export default Controllers