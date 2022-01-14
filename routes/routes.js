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
const RegisController = require('../controllers/registrationcontroller')
const CommunityController = require('../controllers/community')
const DonateController = require('../controllers/donateform')



const router = express.Router()
app.use(cors());



//Registration

//for User Registration request
router.post('/register', [upload.single("doc"), auth], RegisController.createRegis)
router.get('/registration', auth, RegisController.getRegis)
router.get('/registration', auth, RegisController.getRegisById)
router.patch('/registration',[upload.single("doc"), auth], RegisController.updateRegis)
router.delete('/registration', auth, RegisController.deleteRegis)

//User

router.get('/', UsersController.homepage)

//for admin to register new user after accept user registartion request
router.post('/users/register', UsersController.createNewUser)
router.post('/users/login', UsersController.login)
router.get('/users', UsersController.getUser)
router.get('/user/:id', UsersController.getUserById)
router.patch('/user/:id', [upload.single("picture"), auth], UsersController.updateUser)
router.delete('/user/:id', auth, UsersController.deleteUser)


//Ambulance

router.post('/ambulance/a', AmbulancesController.searchAmbulance)
router.post('/ambulance', [upload.single("picture"), auth], AmbulancesController.createNewAmbulance)
router.get('/ambulance', AmbulancesController.getAmbulance)
router.get('/ambulance/:id', AmbulancesController.getAmbulancebyId)
router.put('/ambulance/:id', [upload.single("picture"), auth], AmbulancesController.updateAmbulance)
router.delete('/ambulance/:id', auth, AmbulancesController.deleteAmbulance)


//Vaccine

router.post('/vaccine/a', VaccineController.searchVaccine)
router.post('/vaccine', [upload.single("picture"), auth], VaccineController.createNewVaccine)
router.get('/vaccine', VaccineController.getVaccine)
router.get('/vaccine/:id', VaccineController.getVaccineById)
router.patch('/vaccine/:id', [upload.single("picture"), auth], VaccineController.updateVaccine)
router.delete('/vaccine/:id', auth, VaccineController.deleteVaccine)


//Oxygens

router.post('/oxygen/a', OxygensController.searchOxygen)
router.post('/oxygen', [upload.single("avatar"), auth], OxygensController.createNewOxygen)
router.get('/oxygens', OxygensController.getOxygen)
router.get('/oxygens/:id', OxygensController.getOxygenbyId)
router.patch('/oxygen/:id', [upload.single("avatar"),auth], OxygensController.updateOxygen)
router.delete('/oxygen/:id', auth, OxygensController.deleteOxygen)


//Bank

router.post('/bankdata', auth, BankController.createNewBank )
router.get('/bankdata', auth, BankController.getBank)
router.get('/bankdata/:id', auth, BankController.getbBankById)
router.delete('/bankdata/:id', auth, BankController.deleteBank)
router.patch('/bankdata/:id', auth, BankController.updateBank)



//community

router.post('/community/a', CommunityController.searchCommunity)
router.post('/community', [upload.single("picture"), auth], CommunityController.createNewCommunity)
router.get('/community', CommunityController.getCommunity)
router.get('/community/:id', CommunityController.getCommunityById)
router.patch('/community/:id', [upload.single('picture'), auth], CommunityController.updateCommunity)
router.delete('/community/:id', auth, CommunityController.deleteCommunity)


//donate form

router.post('/community/donateform', DonateController.createNewDonations)
router.get('/community/donateform', DonateController.getDonate)
router.get('/community/donateform/:id', DonateController.getDonateById)
router.patch('/community/donateform/:id', DonateController.updateDonate)
router.delete('/community/donateform/:id', DonateController.deleteDonate)


module.exports = router 