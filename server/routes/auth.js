import express from 'express';
import cors from 'cors';
import Debug from 'debug';
import jwt from 'jsonwebtoken';

const app = express.Router();
const debug = new Debug('platzioverflowbe:auth');

const secret = 'miclavesecreta';

const users = [
    {
        email: 'luis@gmail.com',
        password: '1234',
        firstName: 'Luis',
        lastName: 'Rangel',
        _id: 999
    }
];

// const findUserByEmail = e => users.find({email} => email === e)

function findUserByEmail(email) {
    return users.find(user => user.email === email)
}

function comparePasswords(providedPassword, userPassword) {
    return providedPassword === userPassword;
}

app.use(cors());

app.post('/signin', (req, res, next) => {
    debug(`Login user Try!`);

    const { email, password } = req.body;
    const user = new findUserByEmail(email);

    if (!user) {
        debug(`User with email ${email} not found`);
        return handleLoginFailde(res);
    }

    if (!comparePasswords(password, user.password)) {
        debug(`Password do not match: ${password} != ${user.password}`);
        return handleLoginFailde(res, 'Password don\'t match');
    }

    //crear token
    const token = createToken(user);

    res.status(200).json({
        message: 'Login succeded',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
})


app.post('/signup', (req, res, next) => {    
    debug(`Creating new user Try!`);

    const { firstName, lastName, email, password } = req.body;
    const user = {
        _id: +new Date(),
        firstName,
        lastName,
        email,
        password
    };
    debug(`Creating new user: ${user}`);
    users.push(user);

    //crear token
    const token = createToken(user);

    res.status(201).json({
        message: 'User created',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
})

const createToken = (user) => jwt.sign(({ user }), secret, { expiresIn: 86400 });

function handleLoginFailde(res, message) {
    return res.status(401).json({
        message: 'Login fails',
        error: message || 'Email and password don\'t match'
    });
}

export default app;