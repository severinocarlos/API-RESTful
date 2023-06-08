import { create } from "domain";
import { BookService } from "../service/book-service";
import { Request, Response } from 'express'



export class BookController {
    async readAllBooks(req: Request, res: Response) {
        const bookService = new BookService()
        const allBooks = await bookService.readAllBooksService()
        
        return res.status(200).json(allBooks)

    }

    async createBook(req: Request, res: Response) {
        const book = req.body

        try {
            const bookService = new BookService()
            const bookCreated = await bookService.createBookService(book)
            return res.status(201).json(bookCreated)

        } catch(err) {
            return res.status(400).json({ERROR: `${err}`})
        }
        
    }

    async readBook(req: Request, res: Response) {
        const title: string = req.params.title

        try {
            const bookService = new BookService()
            const book = await bookService.readBookService(title)
            return res.status(200).json(book)

        } catch (err) {
            return res.status(400).json({ERROR: `${err}`})
        }
       
    }

    async updateBook(req: Request, res: Response) {
        const title: string = req.params.title
        console.log(title)
        const newTitle: string = req.body.title

        try {
            const bookService = new BookService()
            const book = await bookService.updateBookService(title, newTitle)
            return res.status(200).json(book)
        } catch (err) {
            return res.status(400).json({ERROR: `${err}`})
        }
    }

    async deleteBook(req: Request, res: Response) {
        const title: string = req.params.title

        try {
            const bookService = new BookService()
            const message = await bookService.deleteBookService(title)
            return res.status(200).json({
                message: message
            })

        } catch (err) {
            return res.status(400).json({ERROR: `${err}`})
        }
    }
}