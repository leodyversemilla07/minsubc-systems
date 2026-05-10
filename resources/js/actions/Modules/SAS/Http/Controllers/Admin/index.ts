import DashboardController from './DashboardController'
import ScholarshipController from './ScholarshipController'
import ScholarshipRecipientController from './ScholarshipRecipientController'
import RenewalController from './RenewalController'
import InsuranceController from './InsuranceController'
import OrganizationController from './OrganizationController'
import ActivityController from './ActivityController'
import DocumentController from './DocumentController'
import BulkOperationsController from './BulkOperationsController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ScholarshipController: Object.assign(ScholarshipController, ScholarshipController),
ScholarshipRecipientController: Object.assign(ScholarshipRecipientController, ScholarshipRecipientController),
RenewalController: Object.assign(RenewalController, RenewalController),
InsuranceController: Object.assign(InsuranceController, InsuranceController),
OrganizationController: Object.assign(OrganizationController, OrganizationController),
ActivityController: Object.assign(ActivityController, ActivityController),
DocumentController: Object.assign(DocumentController, DocumentController),
BulkOperationsController: Object.assign(BulkOperationsController, BulkOperationsController),
}

export default Admin