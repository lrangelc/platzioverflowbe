import Debug from 'debug';
import { secret } from '../config';
import jwt from 'jsonwebtoken';
import { declareVariable } from '@babel/types';

const debug = new Debug('platzioverflowbe:auth-middleware');

export const users = [
    {
        email: 'luis@gmail.com',
        password: '1234',
        firstName: 'Luis',
        lastName: 'Rangel',
        _id: 999
    }
];

export const findUserByEmail = e => users.find(({email}) => email === e)

// function findUserByEmail(email) {
//     return users.find(user => user.email === email)
// }

export const required = (req,res,next) => {
    jwt.verify(req.query.token,secret,(err,token) => {
        if (err) {
            debug('JWT was not encrypted with our secret');
            return res.status(401).json({
                message: 'Unauthorized',
                error: err
            })
        }

        debug(`Token verified ${token}`);
        req.user = token.user;
        next();
    })
}