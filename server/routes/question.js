import express from 'express';
import cors from 'cors';
// import { required, questionMiddleware, questionsMiddleware, questions } from '../middleware';
import { required } from '../middleware';
import { question } from '../db-api';
import {handleError} from '../utils';

const app = express.Router();

// const currentUser = {
//     email: 'luis@gmail.com',
//     password: '1234',
//     firstName: 'Luis',
//     lastName: 'Rangel',
//     _id: 999
// };

// function userMiddleware(req, res, next) {
//     req.user = currentUser;
//     next();
// }

app.use(cors());

// GET /api/questions
// READ QUESTIONS
// app.get('/', questionsMiddleware, (req, res) => {
app.get('/', async (req, res) => {
    // setTimeout(()=>{
    //     res.status(200).json(questions)
    // }, 1000);

    try {
        const questions = await question.findAll();
        res.status(200).json(questions);
    }
    catch (err) {
        res.status(500).json({
            message: 'An error ocurred',
            error: err
        })
    }
})

// GET /api/questions/:id
// READ question
app.get('/:id', async (req, res) => {
    // setTimeout(()=>{
    //     res.status(200).json(req.question)
    // }, 1000);

    try {
        const q = await question.findById(req.params.id);
        res.status(200).json(q);
    }
    catch (err) {
        // handleError(err,res);
        res.status(500).json({
            message: 'An error ocurred',
            error: err
        })
    }
})

// POST /api/questions
// CREATE question
app.post('/', required, (req, res) => {
    console.log('Add new Question');
    const question = req.body;
    question._id = +new Date();
    question.user = req.user;
    question.createdAt = new Date();
    question.answers = [];

    questions.push(question);
    res.status(201).json(question);
})

// POST /api/questions/:id/answers
// CREATE answer
app.post('/:id/answers', required, (req, res) => {
    const answer = req.body;
    const q = req.question;
    answer.createdAt = new Date();
    answer.user = req.user;
    q.answers.push(answer);
    res.status(201).json(answer);
})

export default app;