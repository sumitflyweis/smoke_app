const express = require('express');
const customerRouter = express.Router(); 

const {getUser,userProfile1,createUser,getUserById,updateUser,updateUser1,deleteUser,matchLocation,getAllcollege} = require('../controller/login');

//const {authentication,authorisationbyBId} = require('../middelware/middleware')

// //============================================================

// // USER
// customerRouter.post('/userProfile1', userProfile1);
customerRouter.get('/getUser', getUser);
customerRouter.post('/createUser', createUser)
customerRouter.get('/getUserById/:id', getUserById)
customerRouter.put('/updateUser/:id', updateUser)
customerRouter.put('/updateUser1/:id', updateUser1)
customerRouter.delete('/deleteUser/:id', deleteUser)
customerRouter.get('/matchCoordinates', matchLocation)
customerRouter.get('/getAllcollege/query', getAllcollege)

// ///////////////
// customerRouter.put('/educationLevel/:id', updateducationLevel)
// customerRouter.put('/grade/:id', updategrade)
// customerRouter.put('/city_state_district/:id', updatecity_state_district)
// customerRouter.post('/verify', verify)
// customerRouter.post('/login', login);
// customerRouter.put('/userUpdate', authentication,userUpdate)
// customerRouter.delete('/deleteUserById/:id', deleteUserById)
// customerRouter.post('/socialLogin', socialLogin)


 module.exports = customerRouter;