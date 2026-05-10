import ScholarshipController from './ScholarshipController'
import InsuranceController from './InsuranceController'
const Student = {
    ScholarshipController: Object.assign(ScholarshipController, ScholarshipController),
InsuranceController: Object.assign(InsuranceController, InsuranceController),
}

export default Student