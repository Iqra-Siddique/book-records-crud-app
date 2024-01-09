import userEvent from "@testing-library/user-event";
import AddUpdateModal from "./AddUpdateModal";
import { render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import React from "react";
const mockData = {
  title: "Book 1",
  author: "John",
  published_date: "2024-01-04",
  created_date: '',
  update_date: '',
};
let mockAddFn = jest.fn();
let mockUpdateFn = jest.fn();
let mockCloseFn = jest.fn();
let mockSetBookRecord = jest.fn();

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

//  Interface Testing.
describe("AddUpdateModal Interface Testing", () => {
  test("component should render the correct input field", () => {
    const screen = render(
      <AddUpdateModal
        updateBook={mockUpdateFn}
        open={true}
        action={"Add"}
        bookRecord={mockData}
        setBookRecord={mockSetBookRecord}
        onCloseModal={mockCloseFn}
        addBook={mockAddFn}
      />
    );
    const titleField = screen.getByTestId("title");
    expect(titleField).toBeInTheDocument();
    const authorField = screen.getByTestId("author");
    expect(authorField).toBeInTheDocument();
    const publishedDateField = screen.getByTestId("published_date");
    expect(publishedDateField).toBeInTheDocument();



  });

  test("component should render the Submit button when action is Add", () => {
    const screen = render(
      <AddUpdateModal
        updateBook={mockUpdateFn}
        open={true}
        action={"Add"}
        bookRecord={mockData}
        setBookRecord={mockSetBookRecord}
        onCloseModal={mockCloseFn}
        addBook={mockAddFn}
      />
    );
    const submitButton = screen.getByTestId("submit");
    expect(submitButton).toBeInTheDocument();

  });


  test("component should render the Update button when action is Edit", () => {
    const screen = render(
      <AddUpdateModal
        updateBook={mockUpdateFn}
        open={true}
        action={"Edit"}
        bookRecord={mockData}
        setBookRecord={mockSetBookRecord}
        onCloseModal={mockCloseFn}
        addBook={mockAddFn}
      />
    );
    const submitButton = screen.getByTestId("update");
    expect(submitButton).toBeInTheDocument();

  });

  test("component should render the with record data when action is Edit", () => {
    const screen = render(
      <AddUpdateModal
        updateBook={mockUpdateFn}
        open={true}
        action={"Edit"}
        bookRecord={mockData}
        setBookRecord={mockSetBookRecord}
        onCloseModal={mockCloseFn}
        addBook={mockAddFn}
      />
    );
    const titleField = screen.getByTestId("title");
    const authorField = screen.getByTestId("author");
    const publishedDateField = screen.getByTestId("published_date");


    expect(titleField).toHaveValue(mockData.title)
    expect(authorField).toHaveValue(mockData.author)
    expect(publishedDateField).toHaveValue(mockData.published_date)


  });
});


// Interaction Testing.

describe('AddUpdateModal Interaction Testing', () => {
  test("Should type the correct inputs in the fields", async () => {
    const screen = render(
      <AddUpdateModal
        updateBook={mockUpdateFn}
        open={true}
        action={"Add"}
        bookRecord={mockData}
        setBookRecord={jest.fn()}
        onCloseModal={mockCloseFn}
        addBook={mockAddFn}
      />
    );
    const titleField = screen.getByTestId("title");
    expect(titleField).toBeInTheDocument();
    const authorField = screen.getByTestId("author");
    expect(authorField).toBeInTheDocument();
    const publishedDateField = screen.getByTestId("published_date");
    expect(publishedDateField).toBeInTheDocument();

    await act(() => {
      userEvent.type(titleField, `${mockData.title}`)
      userEvent.type(authorField, `${mockData.author}`)
      userEvent.type(publishedDateField, `${mockData.published_date}`)
    })
    expect(titleField).toHaveValue(`${mockData.title}`)
    expect(authorField).toHaveValue(`${mockData.author}`)
    expect(publishedDateField).toHaveValue(`${mockData.published_date}`)
  });

  test("When action is Add then Submit button should be clickable", async () => {
    const screen = render(
      <AddUpdateModal
        updateBook={mockUpdateFn}
        open={true}
        action={"Add"}
        bookRecord={mockData}
        setBookRecord={mockSetBookRecord}
        onCloseModal={mockCloseFn}
        addBook={mockAddFn}
      />
    );
    const submitButton = screen.getByTestId("submit");
    await act(() => {
      userEvent.click(submitButton)
    })

    await waitFor(() => expect(mockAddFn).toBeCalledTimes(1)
    )

  });

  test("When action is Edit then Update button should be clickable", async () => {
    const screen = render(
      <AddUpdateModal
        updateBook={mockUpdateFn}
        open={true}
        action={"Edit"}
        bookRecord={mockData}
        setBookRecord={mockSetBookRecord}
        onCloseModal={mockCloseFn}
        addBook={mockAddFn}
      />
    );
    const updateButton = screen.getByTestId("update");
    await act(() => {
      userEvent.click(updateButton)
    })

    await waitFor(() => expect(mockUpdateFn).toHaveBeenCalled())

  });
})


describe('AddUpdateModal Modularity Testing', () => {
  test("Should able to submit record with values.", async () => {
    const screen = render(
      <AddUpdateModal
        updateBook={mockUpdateFn}
        open={true}
        action={"Add"}
        bookRecord={mockData}
        setBookRecord={mockSetBookRecord}
        onCloseModal={mockCloseFn}
        addBook={mockAddFn}
      />
    );
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
  
  });

  // commented because not able to find the way to update the values and test.

  // test("Should able to Update record with new values.", async () => {
  //   const newData = {
  //     title: "1",
  //     author: "Marry",
  //     published_date: "2024-02-04",
  //     created_date: '',
  //     update_date: '',
  //   };
  //   const screen = render(
  //     <AddUpdateModal
  //       updateBook={mockUpdateFn}
  //       open={true}
  //       action={"Edit"}
  //       bookRecord={mockData}
  //       setBookRecord={mockSetBookRecord}
  //       onCloseModal={mockCloseFn}
  //       addBook={mockAddFn}
  //     />
  //   );
  //   const titleField = screen.getByTestId("title");
  //   const authorField = screen.getByTestId("author");
  //   const publishedDateField = screen.getByTestId("published_date");
  //   const editButton = screen.getByTestId('update')

  //   // await waitFor(()=> expect(titleField).toHaveValue(mockData.title))
  //   // await waitFor(()=> expect(authorField).toHaveValue(mockData.author))
  //   // await waitFor(()=> expect(publishedDateField).toHaveValue(mockData.published_date))

    
  //   userEvent.clear(publishedDateField)

  //   await act(async() => {
  //    await userEvent.type(titleField, newData?.title)
  //    await userEvent.type(authorField, newData?.author)
  //    await userEvent.type(publishedDateField, newData?.published_date)
  //   })


  //   expect(titleField).toHaveValue(mockData?.title + newData?.title)
  //   expect(authorField).toHaveValue(mockData?.author + newData?.author)
  //   expect(publishedDateField).toHaveValue(newData?.published_date)
  //   await act(() => {
  //     userEvent.click(editButton)
  //   })

  //   await waitFor(()=>{
  //     expect(mockUpdateFn).toHaveBeenCalled()
  //   })
  
  // });

})
