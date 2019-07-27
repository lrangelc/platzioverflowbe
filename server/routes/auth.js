import express from 'express';;
import Debug from 'debug';
import jwt from 'jsonwebtoken';

const app = express.Router();
const debug = new Debug('platzioverflowbe:auth');

const secret = 'miclavesecreta';

const users = [
    {
        email: 'aaaa@aaa.com',
        password: '1234',
        firstName: 'Sacha',
        lastName: 'Lifszyc',
        _id: 123
    }
];

// const findUserByEmail = e => users.find({email} => email === e)

function findUserByEmail(email) {
    return users.find(user => user.email === email)
}

function comparePasswords(providedPassword, userPassword) {
    return providedPassword === userPassword;
}

app.post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    const user = new findUserByEmail(email);

    if (!user) {
        debug(`User with email ${email} not found`);
        return handleLoginFailde(res);
    }

    if (!comparePasswords(password, user.password)) {
        debug(`Password do not match: ${password} != ${user.password}`);
        return handleLoginFailde(res);
    }

    //crear token
    const token = jwt.sign(({ user }), secret, { expiresIn: 86400 });

    res.status(200).json({
        message: 'Login succeded',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    });
})

function handleLoginFailde(res) {
    return res.status(401).json({
        message: 'Login faildes',
        error: 'Email and password don\'t match'
    })
}

export default app;