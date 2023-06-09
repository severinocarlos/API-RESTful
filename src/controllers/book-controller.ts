import { create } from "domain";
import { BookService } from "../service/book-service";
import { Request, Response } from 'express'



export class BookController {
    async readAllBooks(req: Request, res: Response) {
        const bookService = new BookService()
        const allBooks = await bookService.serviceReadAllBooks()
        
        return res.status(200).json(allBooks)

    }

    async createBook(req: Request, res: Response) {
        const book = req.body

        try {
            const bookService = new BookService()
            const createdBook = await bookService.bookCreateService(book)
            return res.status(201).json(createdBook)

        } catch(err) {
            return res.status(400).json({ERROR: `${err}`})
        }
        
    }

    async readBook(req: Request, res: Response) {
        const title: string = req.params.title

        try {
            const bookService = new BookService()
            const book = await bookService.bookReadService(title)
            return res.status(200).json(book)

        } catch (err) {
            return res.status(400).json({ERROR: `${err}`})
        }
       
    }

    async updateBook(req: Request, res: Response) {
        const title: string = req.params.title
        const newTitle: string = req.body.title

        try {
            const bookService = new BookService()
            const book = await bookService.bookUpdateService(title, newTitle)
            return res.status(200).json(book)
        } catch (err) {
            return res.status(400).json({ERROR: `${err}`})
        }
    }

    async deleteBook(req: Request, res: Response) {
        const title: string = req.params.title

        try {
            const bookService = new BookService()
            const message = await bookService.bookDeleteService(title)
            return res.status(200).json({
                message: message
            })

        } catch (err) {
            return res.status(400).json({ERROR: `${err}`})
        }
    }
}