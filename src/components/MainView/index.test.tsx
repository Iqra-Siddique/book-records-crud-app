import { act, render, waitFor, within } from '@testing-library/react'
import DisplayTable from '../DisplayTable/DisplayTable'
import AddUpdateModal from '../AddUpdate/AddUpdateModal'
import userEvent from '@testing-library/user-event'


const mockData = {
    title: "Book 1",
    author: "John",
    published_date: "2024-01-04",
    created_date: '',
    update_date: '',
}

const mockBookData: any[] = [{
    title: "Book 1",
    author: "John",
    published_date: "2024-01-04",
    created_date: '',
    update_date: '',
}]

let mockAddFn = jest.fn();
let mockUpdateFn = jest.fn();
let mockCloseFn = jest.fn();
let mockOpenFn = jest.fn();
let mockSetBookRecord = jest.fn();
const mockEditBookFn = jest.fn()
const mockDeleteBookeFn = jest.fn()

mockOpenFn.mockReturnValueOnce(true)

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
                <AddUpdateModal open={mockOpenFn} addBook={mockAddFn} updateBook={mockUpdateFn} action={'Add'} bookRecord={mockData} setBookRecord={mockSetBookRecord} onCloseModal={mockCloseFn} />
            </div>
        );

        expect(screen.baseElement).toBeTruthy()
    })

    test('component should add record and display in table', async () => {
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
                <AddUpdateModal open={mockOpenFn} addBook={mockAddFn} updateBook={mockUpdateFn} action={'Add'} bookRecord={mockData} setBookRecord={mockSetBookRecord} onCloseModal={mockCloseFn} />
            </div>
        );

        expect(screen.baseElement).toBeTruthy()

        const addButton = screen.getByTestId('add-button')

        expect(addButton).toBeInTheDocument()
        act(() => {
            userEvent.click(addButton)
        })
        await waitFor(() => expect(mockOpenFn).toHaveBeenCalled())

        const addModalTitle = screen.getByText(/add book/i)

        expect(addModalTitle).toBeInTheDocument()

        const titleField = screen.getByTestId("title");
        const authorField = screen.getByTestId("author");
        const publishedDateField = screen.getByTestId("published_date");
        const submitButton = screen.getByTestId('submit')
    
        await act(() => {
          userEvent.type(titleField, mockData?.title)
          userEvent.type(authorField, mockData?.author)
          userEvent.type(publishedDateField, mockData?.published_date)
        })
        expect(titleField).toHaveValue(mockData?.title)
        expect(authorField).toHaveValue(mockData?.author)
        expect(publishedDateField).toHaveValue(mockData?.published_date)
    
        await act(() => {
          userEvent.click(submitButton)
        })
    
        await waitFor(()=>{
          expect(mockAddFn).toHaveBeenCalled()
        })

        const tableDataRows = screen.getAllByTestId('table-body-row')
      
        expect(tableDataRows.length).toBe(mockBookData.length)

        expect(within(tableDataRows[0]).getByTestId('title-cell-0')).toHaveTextContent('Book 1')
        expect(within(tableDataRows[0]).getByTestId('author-cell-0')).toHaveTextContent('John')
        expect(within(tableDataRows[0]).getByTestId('published-date-cell-0')).toHaveTextContent('2024-01-04')
        expect(within(tableDataRows[0]).getByTestId('created-date-cell-0')).toHaveTextContent('')
        expect(within(tableDataRows[0]).getByTestId('update-date-cell-0')).toHaveTextContent('')
        expect(within(tableDataRows[0]).getByTestId('action-cell-0').children.length).toBe(2)
        expect(within(tableDataRows[0]).getByTestId('action-cell-0').children[0]).toHaveTextContent('Edit')
        expect(within(tableDataRows[0]).getByTestId('action-cell-0').children[1]).toHaveTextContent('Delete')

    })
})