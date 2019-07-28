import express from 'express';
import Debug from 'debug';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { secret } from '../config';
import { User } from '../models';
import {
    hashSync as hash,
    compareSync as comparePasswords
} from 'bcryptjs';
// import { users, findUserByEmail } from '../middleware';

const app = express.Router();

const debug = new Debug('platzioverflowbe:auth');

// function comparePasswords(providedPassword, userPassword) {
//     return providedPassword === userPassword;
// }

app.use(cors());

app.post('/signin', async (req, res, next) => {
    debug(`Login user Try!`);

    const { email, password } = req.body;
    // const user = new findUserByEmail(email);
    const user = await User.findOne({ email });

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


app.post('/signup', async (req, res, next) => {
    debug(`Creating new user Try!`);

    const { firstName, lastName, email, password } = req.body;
    // const user = {
    //     _id: +new Date(),
    //     firstName,
    //     lastName,
    //     email,
    //     password
    // };
    const u = new User({
        firstName,
        lastName,
        email,
        password: hash(password, 10)
    });
    debug(`Creating new user: ${u}`);
    const user = await u.save();
    // users.push(user);

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