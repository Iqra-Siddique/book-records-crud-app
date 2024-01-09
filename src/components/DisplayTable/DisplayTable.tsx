import { FC } from 'react'
import { BookRecord } from '../../types'
import '../../App.css'

const DisplayTable: FC<any> = (props: any) => {
    const { bookData, editBook, deleteBook } = props
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th data-testid = 'title-header'>Title</th>
                    <th data-testid = 'author-header'>Author</th>
                    <th data-testid = 'published-date-header'>Published Date</th>
                    <th data-testid = 'created-date-header'>Created Date</th>
                    <th data-testid = 'update-date-header'>Update Date</th>
                    <th data-testid = 'actions-header'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookData.length > 0 && bookData.map((book: BookRecord, index: any) => {
                    return (<tr data-testid='table-body-row' key={index}>
                        <td data-testid ='title-cell'>{book.title}</td>
                        <td data-testid = 'author-cell'>{book.author}</td>
                        <td data-testid = 'published-date-cell'>{book.published_date}</td>
                        <td data-testid = 'created-date-cell'>{book.created_date}</td>
                        <td data-testid = 'update-date-cell'>{book.update_date}</td>
                        <td data-testid = 'actions-cell'>
                            <button className='btn ml2' onClick={() => editBook(index)} data-testid={`edit-button-${index}`}><span>Edit</span></button>
                            <button className='btn ml2' onClick={() => deleteBook(index)} data-testid={`delete-button-${index}`}><span>Delete</span></button>
                        </td>
                    </tr>)
                })
                }
            </tbody>
        </table>
    )
}

export default DisplayTable
