import express from 'express';
import { question, auth } from './routes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hola desde Express!'));

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.join(process.cwd(), 'dist/platzioverflowbe')));
    // app.use('/', express.static(path.join(process.cwd(), 'dist/platzioverflowbe')));
    app.use('/', express.static(process.cwd() + '/dist/platzioverflowbe'));
}

app.use('/api/questions', question);
app.use('/api/auth', auth);

export default app;