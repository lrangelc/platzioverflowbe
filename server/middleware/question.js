// import question from "../models/question";
import { question } from '../db-api';
import { handleError } from '../utils';


// const question = {
//     _id: 1,
//     title: 'fafa¿Cómo reutilizo un componente en Android?',
//     description: 'Miren esta es mi pregunta...',
//     createdAt: new Date(),
//     icon: 'devicon-android-plain',
//     answers: [],
//     user: {
//         email: 'luis@gmail.com',
//         password: '1234',
//         firstName: 'Luis',
//         lastName: 'Rangel',
//         _id: 999
//     }
// };

// export const questions = new Array(10).fill(question);

// export const questionsMiddleware = (req, res, next) => {
//     req.questions = questions;
//     next();
// }

// export const questionMiddleware = (req, res, next) => {
//     const { id } = req.params;
//     req.question = questions.find(({ _id }) => _id === +id);
//     next();
// }


export const questionMiddleware = async (req, res, next) => {
    try {
        req.question = await question.findById(req.params.id);
        next();
    }
    catch (err) {
        handleError(err, res)
    }
}