/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBook = `query GetBook($id: ID!) {
  getBOOK(id: $id) {
    id
    title
    author
    status
  }
}
`;
export const listBooKs = `query ListBooKs(
  $filter: ModelBOOKFilterInput
  $limit: Int
  $nextToken: String
) {
  listBOOKs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      author
      status
    }
    nextToken
  }
}
`;
