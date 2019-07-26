import express from 'express';
import api from './routes'

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-Width,Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PATCH,DELETE,OPTIONS');
        next();
    });
}
else {
    console.log(process.env.NODE_ENV);
}

app.get('/', (req, res) => res.send('Hola desde Express!'));

app.use('/api', api);

export default app;