import React, { FC } from 'react'
import { AddUpdateModalProps } from '../../types'
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddUpdateModal: FC<any> = (props) => {
  const { open, onCloseModal, action, bookRecord, setBookRecord, addBook, updateBook } = props

  return (

    <Modal show={open} onHide={onCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title" data-testid='modal-title'>
          {action} Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='form'>
          <label htmlFor="">Title</label>
          <input type="text" data-testid='title' value={bookRecord?.title} onChange={(e) => { setBookRecord({ ...bookRecord, "title": e.target.value }) }} />
          <label htmlFor="">Author</label>
          <input type="text" data-testid='author' value={bookRecord?.author} onChange={(e) => { setBookRecord({ ...bookRecord, "author": e.target.value }) }} />
          <label htmlFor="">Published Date</label>
          <input name="" data-testid='published_date' type='date' value={bookRecord?.published_date} onChange={(e) => setBookRecord({ ...bookRecord, "published_date": e.target.value })} />
          {action === 'Add' && <button className='btn' onClick={() => addBook()} data-testid='submit'>Submit</button>}
          {action === 'Edit' && <button className='btn' onClick={() => updateBook()} data-testid='update'>Update</button>}
        </div>
       </Modal.Body>
     </Modal>

  )
}

export default AddUpdateModal
