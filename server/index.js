import http from 'http'
import Debug from 'debug'
import app from './app'

const PORT = 3000
const debug = new Debug('platzioverflowbe:root')

app.listen(PORT, ()=> {
    debug(`Server running at port: ${PORT} from Node.js`)
})