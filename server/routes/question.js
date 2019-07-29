import express from 'express';
import cors from 'cors';
import { required, questionMiddleware } from '../middleware';
import { question } from '../db-api';
import { handleError } from '../utils';
import Debug from 'debug';
// import { required, questionMiddleware, questionsMiddleware, questions } from '../middleware';

const app = express.Router();

const debug = new Debug('platzioverflowbe:routes:question');

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
app.get('/:id', questionMiddleware, async (req, res) => {
    // setTimeout(()=>{
    //     res.status(200).json(req.question)
    // }, 1000);

    try {
        // const q = await question.findById(req.params.id);
        res.status(200).json(req.question);
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
app.post('/', required, async (req, res) => {
    console.log('Add new Question');
    // const question = req.body;
    // question._id = +new Date();
    // question.user = req.user;
    // question.createdAt = new Date();
    // question.answers = [];

    // questions.push(question);

    const { title, description, icon } = req.body;
    const q = {
        title,
        description,
        icon,
        user: req.user._id
    };

    try {
        const savedQuestion = await question.create(q);
        res.status(201).json(savedQuestion);
    }
    catch (err) {
        handleError(err, res);
    }
})

// POST /api/questions/:id/answers
// CREATE answer
app.post('/:id/answers', required, questionMiddleware, async (req, res) => {
    const a = req.body;
    const q = req.question;
    a.createdAt = new Date();
    a.user = req.user._id;
    // a.user = new User(req.user);

    try {
        const saveAnswer = await question.createAnswer(q, a);
        res.status(201).json(saveAnswer);
    }
    catch (err) {
        handleError(err, res);
    }
})

export default app;