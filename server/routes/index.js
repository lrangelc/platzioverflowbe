import express from 'express';
import questionCtrl from '../controller/question';

const api = express.Router();

api.get('/questions', questionCtrl.getQuestions);
api.get('/question/:id', questionCtrl.getQuestion);

// POST /api/questions
api.post('/questions/:id', questionCtrl.addQuestion);

export default api;