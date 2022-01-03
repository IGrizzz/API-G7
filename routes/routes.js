const express = require('express')
const app = express()
const upload = require('../utils/multer')
const auth = require('../middleware/auth')
const cors = require('cors')
// const bcrypt = require('bcrypt')

const AmbulancesController = require('../controllers/ambulanceloc')
const VaccineController = require('../controllers/vaccineloc')
const OxygensController = require('../controllers/oxygenloc')
const UsersController = require('../controllers/usercontroller')
const BankController = require('../controllers/bank')



const router = express.Router()
app.use(cors());

//User

router.get('/', UsersController.homepage)
router.post('/register', UsersController.createNewUser)
router.post('/login', UsersController.login)
router.get('/users', UsersController.getUser)
router.get('/user', UsersController.getUserById)
router.patch('/user', [upload.single("picture"), auth], UsersController.updateUser)
router.delete('/user', auth, UsersController.deleteUser)


//Ambulance


router.post('/ambulance', [upload.single("picture"), auth], AmbulancesController.createNewAmbulance)
router.get('/ambulance', AmbulancesController.getAmbulance)
router.get('/ambulances', AmbulancesController.getAmbulancebyId)
router.put('/ambulance/:id', [upload.single("picture"), auth], AmbulancesController.updateAmbulance)
router.delete('/ambulance', auth, AmbulancesController.deleteAmbulance)


//Vaccine


router.post('/vaccine', [upload.single("picture"), auth], VaccineController.createNewVaccine)
router.get('/vaccine', VaccineController.getVaccine)
router.get('/vaccine', VaccineController.getVaccineById)
router.patch('/vaccine', [upload.single("picture"), auth], VaccineController.updateVaccine)
router.delete('/vaccine', auth, VaccineController.deleteVaccine)


//Oxygens


router.post('/oxygen', [upload.single("avatar"), auth], OxygensController.createNewOxygen)
router.get('/oxygens', OxygensController.getOxygen)
router.get('/oxygens', OxygensController.getOxygenbyId)
router.patch('/oxygen', [upload.single("avatar"),auth], OxygensController.updateOxygen)
router.delete('/oxygen', auth, OxygensController.deleteOxygen)


//Bank

router.post('/bankdata', auth, BankController.createNewBank )
router.get('/bankdata', auth, BankController.getBank)
router.get('/bankdata', auth, BankController.getbBankById)
router.delete('/bankdata', auth, BankController.deleteBank)
router.patch('/bankdata', auth, BankController.updateBank)


module.exports = router 