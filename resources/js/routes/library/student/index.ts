import borrowings from './borrowings'
import reservations from './reservations'
import books from './books'
import fines from './fines'
const student = {
    borrowings: Object.assign(borrowings, borrowings),
reservations: Object.assign(reservations, reservations),
books: Object.assign(books, books),
fines: Object.assign(fines, fines),
}

export default student