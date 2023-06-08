import { prisma } from "../database/db"
import { IBook } from "../types/book-interface"

export class BookRepositorie {
    async save(book: IBook): Promise<IBook>{
        const bookCreated = await prisma.book.create({
            data: {
               title: book.title,
               description: book.description,
               author: book.author,
               genre: book.genre,
               pages: book.pages
            },
        })
        
        return bookCreated 
    }

    async get(): Promise<Array<IBook>> {
        return await prisma.book.findMany()
    }
    
    async findByTitle(bookTitle: string): Promise<IBook | null> {
        const book = await prisma.book.findUnique({
            where: {
                title: bookTitle,
            }
        });

        return book
    }
    
    async update(bookTitle: string, newBookTitle: string): Promise<IBook> {
        const updateBook = await prisma.book.update({
            where: {
                title: bookTitle,
            },
            data: {
              title: newBookTitle,
            },
        })

        return updateBook
    }

    async delete(bookTitle: string): Promise<void> {
        await prisma.book.delete({
            where: {
              title: bookTitle,
            },
        })
    }
}