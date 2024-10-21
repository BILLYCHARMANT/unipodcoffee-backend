import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import routes from './routers/index'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
    origin:process.env.FRONTEND_UrL,
    credentials:true,
}

app.use(cors(corsOptions));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})
