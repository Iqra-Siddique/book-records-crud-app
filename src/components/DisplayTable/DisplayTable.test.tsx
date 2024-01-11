import { act, render, waitFor, within } from '@testing-library/react'
import DisplayTable from './DisplayTable'
import userEvent from '@testing-library/user-event'

const mockData = [{
    title: "Book 1",
    author: "John",
    published_date: "2024-01-04",
    created_date: '',
    update_date: '',
},
{
    title: "Book 2",
    author: "Marry",
    published_date: "2024-02-04",
    created_date: "",
    update_date: "",
}]
const mockEditBookFn = jest.fn()
const mockDeleteBookeFn = jest.fn()

describe('DisplayTable Interface Testing', () => {
    test("Should render correct columns in the table.", () => {
        const screen = render(
            <DisplayTable bookData={mockData} editBook={mockEditBookFn} deleteBook={mockDeleteBookeFn} />
        )

        expect(screen.getByTestId('title-header')).toBeInTheDocument()
        expect(screen.getByTestId('author-header')).toBeInTheDocument()
        expect(screen.getByTestId('published-date-header')).toBeInTheDocument()
        expect(screen.getByTestId('created-date-header')).toBeInTheDocument()
        expect(screen.getByTestId('update-date-header')).toBeInTheDocument()
        expect(screen.getByTestId('actions-header')).toBeInTheDocument()
    })

    test("Should display correct headings of columns in the table.", () => {
        const screen = render(
            <DisplayTable bookData={mockData} editBook={mockEditBookFn} deleteBook={mockDeleteBookeFn} />
        )

        expect(screen.getByTestId('title-header')).toHaveTextContent('Title')
        expect(screen.getByTestId('author-header')).toHaveTextContent('Author')
        expect(screen.getByTestId('published-date-header')).toHaveTextContent('Published Date')
        expect(screen.getByTestId('created-date-header')).toHaveTextContent('Created Date')
        expect(screen.getByTestId('update-date-header')).toHaveTextContent('Update Date')
        expect(screen.getByTestId('actions-header')).toHaveTextContent('Actions')
    })

    test("Should display correct number of rows in the table.", () => {
        const screen = render(
            <DisplayTable bookData={mockData} editBook={mockEditBookFn} deleteBook={mockDeleteBookeFn} />
        )

        expect(screen.getAllByTestId('table-body-row').length).toBe(mockData.length)

    })

    test("Should display correct data in rows of the table.", () => {
        const screen = render(
            <DisplayTable bookData={mockData} editBook={mockEditBookFn} deleteBook={mockDeleteBookeFn} />
        )

        const rows = screen.getAllByTestId('table-body-row')

        expect(within(rows[0]).getByTestId('title-cell-0')).toHaveTextContent('Book 1')
        expect(within(rows[0]).getByTestId('author-cell-0')).toHaveTextContent('John')
        expect(within(rows[0]).getByTestId('published-date-cell-0')).toHaveTextContent('2024-01-04')
        expect(within(rows[0]).getByTestId('created-date-cell-0')).toHaveTextContent('')
        expect(within(rows[0]).getByTestId('update-date-cell-0')).toHaveTextContent('')
        expect(within(rows[0]).getByTestId('action-cell-0').children.length).toBe(2)
        expect(within(rows[0]).getByTestId('action-cell-0').children[0]).toHaveTextContent('Edit')
        expect(within(rows[0]).getByTestId('action-cell-0').children[1]).toHaveTextContent('Delete')

    })
})

describe('DisplayTable Interaction Testing', () => {
    test("Should able to click the Edit button in Actions column", async () => {
        const screen = render(
            <DisplayTable bookData={mockData} editBook={mockEditBookFn} deleteBook={mockDeleteBookeFn} />
        )
        const rows = screen.getAllByTestId('table-body-row')

        const editButton = within(rows[0]).getByTestId('action-cell-0').children[0]

        await act(() => {
            userEvent.click(editButton)
        })

        await waitFor(() => expect(mockEditBookFn).toBeCalledTimes(1)
        )

    })

    test("Should able to click the Delete button in Actions column", async () => {
        const screen = render(
            <DisplayTable bookData={mockData} editBook={mockEditBookFn} deleteBook={mockDeleteBookeFn} />
        )
        const rows = screen.getAllByTestId('table-body-row')

        const deleteButton = within(rows[0]).getByTestId('action-cell-0').children[1]

        await act(() => {
            userEvent.click(deleteButton)
        })

        await waitFor(() => expect(mockDeleteBookeFn).toBeCalledTimes(1)
        )

    })
})


describe('DisplayTable Modularity Testing', () => {
    test("Should able to Edit correct record index", async () => {
        const screen = render(
            <DisplayTable bookData={mockData} editBook={mockEditBookFn} deleteBook={mockDeleteBookeFn} />
        )
        const rows = screen.getAllByTestId('table-body-row')

        const editButton = within(rows[0]).getByTestId('action-cell-0').children[0]

        await act(() => {
            userEvent.click(editButton)
        })

        await waitFor(() => {expect(mockEditBookFn).toHaveBeenCalledWith(0)})

    })

    test("Should able to Delete correct record index", async () => {
        const screen = render(
            <DisplayTable bookData={mockData} editBook={mockEditBookFn} deleteBook={mockDeleteBookeFn} />
        )
        const rows = screen.getAllByTestId('table-body-row')

        const deleteButton = within(rows[0]).getByTestId('action-cell-0').children[1]

        await act(() => {
            userEvent.click(deleteButton)
        })

        await waitFor(() => {expect(mockDeleteBookeFn).toHaveBeenCalledWith(0)}
        )

    })
})