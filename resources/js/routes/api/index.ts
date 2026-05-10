import admission from './admission'
import registrar from './registrar'
import sas from './sas'
import usg from './usg'
const api = {
    admission: Object.assign(admission, admission),
registrar: Object.assign(registrar, registrar),
sas: Object.assign(sas, sas),
usg: Object.assign(usg, usg),
}

export default api