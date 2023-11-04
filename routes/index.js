const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');
// const authenticate = require('../middlewares/authenticate');
// const userService = require('../services/userService');


router.get('/', async (req, res, next) => {
    try {
        res.render('index', { title: 'Home' });
    } catch (err) {
        next(err);
    }
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

router.get('/resources', (req, res) => {
    res.render('resources');
});

router.get("/testimonials", (req, res)=>{
    res.render("testimonials")
    });

router.get('/partnership', (req, res) => {
    res.render('partnership');
});

router.get('/consultancy', (req, res) => {
    res.render('consultancy');
});

router.get('/tech-training', (req, res) => {
    res.render('tech-training');
});

router.get('/become-a-partner', (req, res) => {
    res.render('partnership-form');
});

router.get('/book-consultation', (req, res) => {
    res.render('consultancy-form');
});

router.get('/enroll', (req, res) => {
    res.render('tech-enroll');
});

router.get('/work-experience', (req, res) => {
    res.render('work-experience');
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

router.get('/faq', (req, res) => {
    res.render('faq', { title: 'Frequently Asked Questions' });
});


router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});


router.post('/send-email', (req, res, next) => {
    try {
        const subject = {
            enroll: 'I want to enroll for a course',
            consultancy: 'I want to consult on Tech',
            partnership: 'I want to partner with CBA'
        };
        const { email: sender_email, phone: sender_phone, fname, lname = '', message, category } = req.body;
        emailService.emailCBA({ sender_name: `${fname} ${lname}`, sender_email, sender_phone, subject: subject[category], message });
        //res.status(200).json({ status: 'success' });
        res.render('confirmation', { title: 'Message Sent' });
    } catch (err) {
        next(err);
    }
});

router.post('/send-contact-email', (req, res, next) => {
    try {
        const { email: sender_email, phone: sender_phone, name: sender_name, subject, message } = req.body;
        emailService.emailCBA({ sender_name, sender_email, sender_phone, subject, message });
        //res.status(200).json({ status: 'success' });
        res.render('confirmation', { title: 'Message Sent' });
    } catch (err) {
        next(err);
    }
});

// router.post('/login', async (req, res, next) => {
//     try {
//         req.session.user = await userService.login(req.body);
//         res.redirect('/users/dashboard');
//     } catch (err) {
//         next(err);
//     }
// });


module.exports = router;
