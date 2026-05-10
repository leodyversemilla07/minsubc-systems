import Admission from './Admission'
import Library from './Library'
import Registrar from './Registrar'
import SAS from './SAS'
import USG from './USG'
import VotingSystem from './VotingSystem'
const Modules = {
    Admission: Object.assign(Admission, Admission),
Library: Object.assign(Library, Library),
Registrar: Object.assign(Registrar, Registrar),
SAS: Object.assign(SAS, SAS),
USG: Object.assign(USG, USG),
VotingSystem: Object.assign(VotingSystem, VotingSystem),
}

export default Modules