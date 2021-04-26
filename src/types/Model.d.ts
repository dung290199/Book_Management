export type Author = {
  id?: number,
  name: string,
  website: string,
  birthday: string,
  cover: string,
  books?: Book[]
};

export type Book = {
  id?: number,
  name: string,
  description: string,
  price: number,
  year: number,
  author: Author,
  publisher: string,
  cover: string,
  categories: Category[],
};

export type Category = {
  id?: number,
  name: string,
  description: string,
  books?: Book[]
}

export type User = {
  id?: number,
  name: string,
  username: string,
  password?: string,
  role: string
}