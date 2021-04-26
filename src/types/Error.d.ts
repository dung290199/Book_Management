export type AuthorErrorProps<T> = {
  name: T,
  birthday: T
}

export type BookErrorProps<T> = {
  name: T,
  description: T,
  price: T,
  year: T,
  authorId: T,
  authorName: T,
  authorBirthday: T,
  authorCover: T,
  publisher: T,
  cover?: T
}

export type CategoryErrorProps<T> = {
  name: T,
  description: T
}

export type UserErrorProps<T> = {
  name: T,
  username: T,
  password?: T,
  role: T
}