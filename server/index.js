import http from 'http';
import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose';
import { mongoUrl, port } from './config';

const debug = new Debug('platzioverflowbe:root');

async function start() {
    await mongoose.connect(mongoUrl, { useNewUrlParser: true });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));

    app.listen(port, () => {
        debug(`Server running at port: ${port} from Node.js`);
    });
}

start();