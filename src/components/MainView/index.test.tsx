import {render } from '@testing-library/react'
import DisplayTable from '../DisplayTable/DisplayTable'
import AddUpdateModal from '../AddUpdate/AddUpdateModal'


const mockData = {
    title: "Book 1",
    author: "John",
    published_date: "2024-01-04",
    created_date: '',
    update_date: '',
}

const mockBookData: any[] =[]

let mockAddFn = jest.fn();
let mockUpdateFn = jest.fn();
let mockCloseFn = jest.fn();
let mockOpenFn = jest.fn();
let mockSetBookRecord = jest.fn();
const mockEditBookFn = jest.fn()
const mockDeleteBookeFn = jest.fn()

jest.mock("react-bootstrap", () => {
    // get the original boostrap library
    const orgBootstrap = jest.requireActual("react-bootstrap");
    // mock the Modal component
    const mockModal = ({ children }: any) => {
        return <div>{children}</div>;
    };

    // mock the sub-components of the Modal
    mockModal.Header = (props: any) => <div>{props.children}</div>;
    mockModal.Title = (props: any) => <div>{props.children}</div>;
    mockModal.Body = (props: any) => <div>{props.children}</div>;

    // return your modified boostrap library instance with mocked Modal
    const mockBoostrap = { __esModule: true, ...orgBootstrap, Modal: mockModal };
    return mockBoostrap;
});


describe('MainView', () => {
    test('component should renders correctly', () => {
        const screen = render(
            <div className="container mt-5">
            <div className="d-flex">
                <h1>Book Records</h1>
            </div>
            <div className="toolbar">
                <button className='btn btn-p' onClick={mockOpenFn} data-testid='add-button'><span>Add</span></button>
            </div>
            <hr />
            <DisplayTable bookData={mockBookData} deleteBook={mockDeleteBookeFn} editBook={mockEditBookFn} />
            <AddUpdateModal open={false} addBook={mockAddFn} updateBook={mockUpdateFn} action={'Add'} bookRecord={mockData} setBookRecord={mockSetBookRecord} onCloseModal={mockCloseFn} />
        </div>
        );

        expect(screen.baseElement).toBeTruthy()
    })
})