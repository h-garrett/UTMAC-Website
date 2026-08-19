require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Album = require('./models/album');
const Settings = require('./models/settings');
const {
    VotingPhase,
    getCurrentVotingPhase
} = require('./utils/schedule');
const session = require('express-session');
const bcrypt = require('bcrypt');

// connect to mongodb
const dburi = process.env.MONGODB_URI;
mongoose.connect(dburi)
    .then((result) => app.listen(3000, () => {
        console.log("connected to db");
    }))
    .catch((err) => console.log("Mongo connection error: ", err));

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');


// static files
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // CHANGE TO TRUE LATER
        sameSite: 'lax'
    }
}));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

function requireAdmin(req, res, next) {
    if (req.session.isAdmin) {
        return next();
    }

    res.redirect('/login');
}



app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/albums', async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Could not load albums' });
    }
});

app.get('/api/current-phase', async (req, res) => {
    try {
        const settings = await Settings.findOne();
        const currentPhase = getCurrentVotingPhase(settings);
        let buttonLink = "";
        if (currentPhase === VotingPhase.NOMINATIONS) {
            buttonLink = settings.nominationLink;
        }
        if (currentPhase === VotingPhase.VOTING) {
            buttonLink = settings.votingLink;
        }
        res.json({
            phase: currentPhase,
            buttonLink: buttonLink
        });
    } catch {
        console.log(err);
    }
});

app.get('/api/genre', async (req, res) => {
    const settings = await Settings.findOne();
    res.json({
        genre: settings.setGenre
    });
});


app.post('/api/settings/nomination', requireAdmin, async (req, res) => {
    try {
        await Settings.findOneAndUpdate(
            {},             // find the first settings document
            {
                nominationLink: req.body.nominationLink
            },       // update it with the submitted form data
            { upsert: true } // create one if none exists
        );

        res.redirect('/admin');

    } catch (err) {
        console.log(err);
    }
});

app.post('/api/settings/voting', requireAdmin, async (req, res) => {
    try {
        await Settings.findOneAndUpdate(
            {},             // find the first settings document
            {
                votingLink: req.body.votingLink
            },       // update it with the submitted form data
            { upsert: true } // create one if none exists
        );

        res.redirect('/admin');

    } catch (err) {
        console.log(err);
    }
});

app.post('/api/settings/phase', requireAdmin, async (req, res) => {
    try {
        await Settings.findOneAndUpdate(
            {},             // find the first settings document
            {
                phaseOverride: req.body.phaseOverride === "on",
                setPhase: req.body.setPhase
            },       // update it with the submitted form data
            { upsert: true } // create one if none exists
        );

        res.redirect('/admin');

    } catch (err) {
        console.log(err);
    }
});

app.post('/api/settings/genre', requireAdmin, async (req, res) => {
    try {
        await Settings.findOneAndUpdate(
            {},             // find the first settings document
            {
                setGenre: req.body.setGenre
            },       // update it with the submitted form data
            { upsert: true } // create one if none exists
        );

        res.redirect('/admin');

    } catch (err) {
        console.log(err);
    }
});


app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/admin', requireAdmin, (req, res, next) => {
    res.render('admin');
});

app.get('/login', (req, res) => {
    res.render('login');
})


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const usernameMatches =
        username === process.env.ADMIN_USERNAME;

    const passwordMatches =
        await bcrypt.compare(
            password,
            process.env.ADMIN_PASSWORD_HASH
        );

    if (usernameMatches && passwordMatches) {
        req.session.isAdmin = true;
        return res.redirect('/admin');
    }

    res.status(401).send('Invalid username or password');
});


// 404
app.use((req, res) => {
    res.status(404).render('404');
});