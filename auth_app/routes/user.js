const express = require('express')

const router = express.Router()

const {login, signup} = require('../controllers/auth')
const {auth, isStudent, isAdmin} = require('../middleware/auth')

router.post('/login', login);
router.post('/signup', signup);

//just for testing routes for single middleware
router.get('/test', auth, (req, res)=>{
    res.json({
        success: true,
        message: "Welcome to protected route for test"
    })
})

// writing protected routes means-->> it checks authorization and only allow the user can access their routes with their matched roles like... admin, student, visitors etc.
router.get('/student', auth, isStudent, (req, res)=>{
    res.json({
        success: true,
        message: "Welcome to student portal"
    })
});

router.get('/admin', auth, isAdmin, (req, res)=>{
    res.json({
        success: true,
        message: "Welcome to admin portal"
    })
})

module.exports = router;