/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBook = `mutation CreateBook(
  $input: CreateBOOKInput!
  $condition: ModelBOOKConditionInput
) {
  createBOOK(input: $input, condition: $condition) {
    id
    title
    autor
    status
  }
}
`;
export const updateBook = `mutation UpdateBook(
  $input: UpdateBOOKInput!
  $condition: ModelBOOKConditionInput
) {
  updateBOOK(input: $input, condition: $condition) {
    id
    title
    autor
    status
  }
}
`;
export const deleteBook = `mutation DeleteBook(
  $input: DeleteBOOKInput!
  $condition: ModelBOOKConditionInput
) {
  deleteBOOK(input: $input, condition: $condition) {
    id
    title
    autor
    status
  }
}
`;
