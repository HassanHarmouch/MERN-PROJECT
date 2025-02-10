const express = require('express');
const { connectToDatabase } = require('./database');
const app = express();
const DB = require('./database').connectToDatabase;
const userRouter = require("./routes/userRouter");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const orderRoutes = require('./routes/orderRouter');
const dotenv = require("dotenv"); 
const passport = require('passport');
const BundlesRoutes = require('./routes/bundleRouter');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');
const { google } = require('googleapis');
require('./passport-setup');

dotenv.config();

// Run the database connection
connectToDatabase();

// Add necessary middleware
app.use(express.json());
app.use(cookieParser()); // ✅ Middleware to handle cookies

// TODO: Check the below 
/*app.use(express.urlencoded({extended:true})) Was used in project setup */

app.use(cors({
    origin: "http://localhost:3001", // Allow your frontend domain
    credentials: true, // Allow credentials like cookies
}));

// Additional CORS setup to allow all origins
app.use(cors());

app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', require('./routes/auth'));

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    res.render('home');
});

app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('profile', { user: req.user });
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(400).send('Error logging out');
        }
        res.redirect('/');
    });
});

app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRoutes);
app.use("/api/bundles", BundlesRoutes);

app.get("/", (req, res) => { res.send("hello") });

app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Set up port
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
