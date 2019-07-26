import { EWOULDBLOCK } from "constants";

const question = {
	_id: 1,
	title: '¿Cómo reutilizo un componente en Android?',
	description: 'Miren esta es mi pregunta',
	createdAt: new Date(),
	icon: 'devicon-android-plain',
	answers: [],
	user: {
		firstName: 'David',
		lastName: 'Castillo',
		email: 'davecas26@gmail.com',
		password: '123456'
	}
}

const questions = new Array(10).fill(question);

function getQuestions(req, res) {
	// setTimeout(() => {
	// 	res.status(200).json(questions);
	// }, 2000);

	res.status(200).json(questions);
}

function getQuestion(req, res) {
	// setTimeout(() => {
	// 	res.status(200).json(question);
	// }, 2000);
	const {id} = req.params;
	const aux_question = questions.find(question => question._id === +id)

	res.status(200).json(aux_question);
}

function addQuestion(req, res) {
	const aux_question = req.body;
	aux_question._id = +new Date();
	aux_question.user = {
		email: 'luis@gmail.com',
		password: '12345',
		firstName: 'Luis',
		lastName: 'Rangel'
	}
	aux_question.createdAt = new Date();
	aux_question.answers = [];
	questions.push(aux_question);
	res.status(201).json(aux_question);
};

export default {
	getQuestions,
	getQuestion,
	addQuestion
}