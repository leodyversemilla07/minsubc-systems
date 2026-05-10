import LibraryController from './LibraryController'
import Student from './Student'
import Admin from './Admin'
const Controllers = {
    LibraryController: Object.assign(LibraryController, LibraryController),
Student: Object.assign(Student, Student),
Admin: Object.assign(Admin, Admin),
}

export default Controllers