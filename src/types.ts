import { Dispatch, SetStateAction } from "react"

export interface BookRecord {
    title: string,
    author: string,
    published_date: string,
    created_date: string,
    update_date: string
}

export interface AddUpdateModalProps {
    open: boolean
    action: string
    bookRecord: BookRecord
    setBookRecord: any
    onCloseModal: () => void
    updateBook: () => any
    addBook: () => any
}

export interface DisplayTableProps {
    bookData: BookRecord
    editBook: ({ index }: any) => any
    deleteBook: ({ index }: any) => any
}