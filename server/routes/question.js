import express from 'express';
import cors from 'cors';

const app = express.Router();

const currentUser = {
    email: 'aaaa@aaa.com',
    password: '1234',
    firstName: 'Sacha',
    lastName: 'Lifszyc'
};

const question = {
    _id: 1,
    title: 'fafa¿Cómo reutilizo un componente en Android?',
    description: 'Miren esta es mi pregunta...',
    createdAt: new Date(),
    icon: 'devicon-android-plain',
    answers: [],
    user: {
        email: 'aaaa@aaa.com',
        password: '1234',
        firstName: 'Sacha',
        lastName: 'Lifszyc'
    }
};

const questions = new Array(10).fill(question);

function questionMiddleware(req, res, next) {
    const { id } = req.params;
    req.question = questions.find(({ _id }) => _id === +id);
    next();
}

function userMiddleware(req, res, next) {
    req.user = currentUser;
    next();
}


app.use(cors());


// GET /api/questions
app.get('/', (req,res)=>{
    // setTimeout(()=>{
    //     res.status(200).json(questions)
    // }, 1000);

    res.status(200).json(questions);
})

// GET /api/questions/:id
app.get('/:id', questionMiddleware, (req, res) => {    
    // setTimeout(()=>{
    //     res.status(200).json(req.question)
    // }, 1000);

    res.status(200).json(req.question);
})

// POST /api/questions
app.post('/', userMiddleware, (req, res) => {
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
app.post('/:id/answers', questionMiddleware, userMiddleware, (req, res) => {
    const answer = req.body;
    const q = req.question;
    answer.createdAt = new Date();
    answer.user = req.user;
    q.answers.push(answer);
    res.status(201).json(answer);
})

export default app;