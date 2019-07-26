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

function getQuestions (req, res) {
	res.status(200).json(questions);
}

function getQuestion (req, res) {
	res.status(200).json(question);
}

export default {
	getQuestions,
	getQuestion
}