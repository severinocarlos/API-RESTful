import express, { Request, Response } from 'express'


const app = express()

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello world')
})


app.listen(3333, () =>  {
    console.log("🚀Server is running in http://localhost:3000")
})