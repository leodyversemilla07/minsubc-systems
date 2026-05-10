import DashboardController from './DashboardController'
import BookController from './BookController'
import BookCategoryController from './BookCategoryController'
import BorrowingController from './BorrowingController'
import FineController from './FineController'
import ReportController from './ReportController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
BookController: Object.assign(BookController, BookController),
BookCategoryController: Object.assign(BookCategoryController, BookCategoryController),
BorrowingController: Object.assign(BorrowingController, BorrowingController),
FineController: Object.assign(FineController, FineController),
ReportController: Object.assign(ReportController, ReportController),
}

export default Admin