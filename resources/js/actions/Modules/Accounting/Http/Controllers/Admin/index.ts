import DashboardController from './DashboardController'
import FeeCategoryController from './FeeCategoryController'
import FeeItemController from './FeeItemController'
import AssessmentController from './AssessmentController'
import PaymentController from './PaymentController'
import InvoiceController from './InvoiceController'
import ChartAccountController from './ChartAccountController'
import DiscountController from './DiscountController'
import ReportController from './ReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
FeeCategoryController: Object.assign(FeeCategoryController, FeeCategoryController),
FeeItemController: Object.assign(FeeItemController, FeeItemController),
AssessmentController: Object.assign(AssessmentController, AssessmentController),
PaymentController: Object.assign(PaymentController, PaymentController),
InvoiceController: Object.assign(InvoiceController, InvoiceController),
ChartAccountController: Object.assign(ChartAccountController, ChartAccountController),
DiscountController: Object.assign(DiscountController, DiscountController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Admin