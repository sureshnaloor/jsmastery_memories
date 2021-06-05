import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import postRoute from './routes/posts.js'

const app = express()
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))
app.use(cors())

app.use('/api/posts', postRoute);

app.get('/', (req,res) => {
	res.status(200).json({message: "Hello from memories app root route"})
})

// mongodb connectino
const CONNECT_URL = 'mongodb://127.0.0.1:27017/memories';
mongoose.connect(CONNECT_URL, {useNewUrlParser: true, useUnifiedTopology:true}).then(()=> {
	console.log('db is connected')
})

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`server running in dev mode on port ${PORT}`
	)
);