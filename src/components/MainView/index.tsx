import React, { FC, useState } from 'react'
import { BookRecord } from '../../types'
import AddUpdateModal from '../AddUpdate/AddUpdateModal'
import '../../App.css'
import DisplayTable from '../DisplayTable/DisplayTable'

const MainView: FC<any> = () => {
    const book: BookRecord = {
        "title": "",
        "author": "",
        "published_date": "",
        "created_date": "",
        "update_date": ""
    }

    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('Add');
    const [bookData, setBookData] = useState<Array<any>>([]);
    const [bookRecord, setBookRecord] = useState(book);
    const [editIndex, setEditIndex] = useState(null);


    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => {
        setOpen(false);
        setAction('Add')
    }

    const addBook = () => {
        setBookData([...bookData, {...bookRecord, created_date: new Date().toISOString(), update_date: new Date().toISOString()}]);
        setBookRecord(book);
        onCloseModal();
    }

    const editBook = (index: any) => {
        console.log("index", index);
        setAction('Edit');
        const selectedBook = bookData?.find((x, i) => i === index);
        setBookRecord(selectedBook);
        setEditIndex(index);
        onOpenModal();
    }

    const updateBook = () => {
        const newbooks = bookData.map((x, i) => {
            if (i === editIndex) {
                x = {...bookRecord, update_date: new Date().toISOString()}
            }
            return x
        });
        setBookData(newbooks);
        setBookRecord(book);
        setEditIndex(null);
        onCloseModal();
    }

    const deleteBook = (index: any) => {
        const newbooks = bookData.filter((x, i) => { return i !== index });
        setBookData(newbooks);
    }
    return (
        <div className="container mt-5">
            <div className="d-flex">
                <h1>Book Records</h1>
            </div>
            <div className="toolbar">
                <button className='btn btn-p' onClick={onOpenModal} data-testid='add-button'><span>Add</span></button>
            </div>
            <hr />
            <DisplayTable bookData={bookData} deleteBook={deleteBook} editBook={editBook} />
            <AddUpdateModal open={open} addBook={addBook} updateBook={updateBook} action={action} bookRecord={bookRecord} setBookRecord={setBookRecord} onCloseModal={onCloseModal} />
        </div>
    )
}

export default MainView