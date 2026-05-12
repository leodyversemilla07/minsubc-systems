import Accounting from './Accounting'
import Admission from './Admission'
import Curriculum from './Curriculum'
import Guidance from './Guidance'
import HR from './HR'
import Library from './Library'
import Registrar from './Registrar'
import SAS from './SAS'
import USG from './USG'
import VotingSystem from './VotingSystem'
const Modules = {
    Accounting: Object.assign(Accounting, Accounting),
Admission: Object.assign(Admission, Admission),
Curriculum: Object.assign(Curriculum, Curriculum),
Guidance: Object.assign(Guidance, Guidance),
HR: Object.assign(HR, HR),
Library: Object.assign(Library, Library),
Registrar: Object.assign(Registrar, Registrar),
SAS: Object.assign(SAS, SAS),
USG: Object.assign(USG, USG),
VotingSystem: Object.assign(VotingSystem, VotingSystem),
}

export default Modules