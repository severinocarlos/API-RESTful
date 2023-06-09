import { prisma } from "../database/db";
import { BookRepositorie } from "../repositories/book-repositorie";
import { IBook } from "../types/book-interface";

export class BookService {
    async bookCreateService(book: IBook) {
        if (!book.title) {
            throw new Error('Dê um título para o seu livro')
        }
        
        const bookRepositorie = new BookRepositorie()
        const bookExist = await bookRepositorie.findByTitle(book.title)
        if (bookExist) {
            throw new Error('Livro já cadastrado')
        } else {
            const bookCreated = await bookRepositorie.save(book)
            return bookCreated
        }
    }

    async bookReadService(bookTitle: string) {
        
        const bookRepositorie = new BookRepositorie()
        const book = await bookRepositorie.findByTitle(bookTitle)

        if (!book) {
            throw new Error('Livro não existe')
        } else {
            return book
        }
    }

    async bookUpdateService(bookTitle: string, newBookTitle: string) {
        const bookRepositorie = new BookRepositorie()
        const book = await bookRepositorie.findByTitle(bookTitle)

        if (!book) {
            throw new Error('Livro não existe para que você possa atualizar')
        } else {
            const updatedBook = bookRepositorie.update(bookTitle, newBookTitle)
            return updatedBook
        }
    }

    async bookDeleteService(bookTitle: string) {
        const bookRepositorie = new BookRepositorie()
        const book = await bookRepositorie.findByTitle(bookTitle)

        if (!book) {
            throw new Error('Livro não existe para que você possa deletar')
        } else {
            bookRepositorie.delete(bookTitle)
            return 'Deleção feita com sucesso'
        }
    }

    async serviceReadAllBooks() {
        const bookRepositorie = new BookRepositorie()
        return await bookRepositorie.get()
    }
}