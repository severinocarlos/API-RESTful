import express, { Request, Response } from 'express'
import { BookController } from './controllers/book-controller'


const app = express()
app.use(express.json())
const bookCrontoller = new BookController()

app.get('/book', bookCrontoller.readAllBooks)
app.post('/book', bookCrontoller.createBook)
app.get('/book/:title', bookCrontoller.readBook)
app.delete('/book/:title', bookCrontoller.deleteBook)
app.put('/book/:title', bookCrontoller.updateBook)


app.listen(3333, () =>  {
    console.log("🚀Server is running on http://localhost:3000")
})