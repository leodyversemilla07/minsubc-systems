import documentRequests from './document-requests'
import payments from './payments'
import cashier from './cashier'
import admin from './admin'
import students from './students'
const registrar = {
    documentRequests: Object.assign(documentRequests, documentRequests),
payments: Object.assign(payments, payments),
cashier: Object.assign(cashier, cashier),
admin: Object.assign(admin, admin),
students: Object.assign(students, students),
}

export default registrar