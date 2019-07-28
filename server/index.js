import http from 'http';
import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose';
import { mongoUrl } from './config';

const PORT = 3000;
const debug = new Debug('platzioverflowbe:root');

async function start() {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));

    app.listen(PORT, () => {
        debug(`Server running at port: ${PORT} from Node.js`);
    });
}

start();