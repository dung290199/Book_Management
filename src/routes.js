import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/Home';
import User from './pages/users/UserMenu';
import Book from './pages/books/BookMenu';
import BookList from './pages/books/BookList';
import NewBook from './pages/books/NewBook';
import Author from './pages/authors/AuthorMenu';
import Category from './pages/categories/CategoryMenu';
import UpdateBook from './pages/books/UpdateBook';
import BookInfo from './pages/books/bookInfo/BookInfo';
import CategoryList from './pages/categories/CategoryList';
import CategoryInfo from './pages/categories/CategoryInfo';
import NewCategory from './pages/categories/NewCategory';
import UpdateCategory from './pages/categories/UpdateCategory';
import UserList from './pages/users/UserList';
import NewUser from './pages/users/NewUser';
import UpdateUser from './pages/users/UpdateUser';
import AuthorList from './pages/authors/AuthorList';
import NewAuthor from './pages/authors/NewAuthor';
import AuthorInfo from './pages/authors/AuthorInfo';
import UpdateAuthor from './pages/authors/UpdateAuthor';

const routes = [
  {
    path: '/',
    component: LoginPage,
    exact: true,
  },
  {
    path: '/home',
    component: HomePage,
    exact: false,
  },
  {
    path: '/users',
    component: User,
    exact: true,
  },
  {
    path: '/users/all',
    component: UserList,
    exact: true,
  },
  {
    path: '/users/new',
    component: NewUser,
    exact: true,
  },
  {
    path: '/users/edit/:id',
    component: UpdateUser,
    exact: false,
  },
  {
    path: '/books',
    component: Book,
    exact: true,
  },
  {
    path: '/books/all',
    component: BookList,
    exact: true,
  },
  {
    path: '/books/new',
    component: NewBook,
    exact: true,
  },
  {
    path: '/books/:id',
    component: BookInfo,
    exact: true,
  },
  {
    path: '/books/edit/:id',
    component: UpdateBook,
    exact: false,
  },
  {
    path: '/authors',
    component: Author,
    exact: true,
  },
  {
    path: '/authors/all',
    component: AuthorList,
    exact: true,
  },
  {
    path: '/authors/new',
    component: NewAuthor,
    exact: true,
  },
  {
    path: '/authors/:id',
    component: AuthorInfo,
    exact: true,
  },
  {
    path: '/authors/edit/:id',
    component: UpdateAuthor,
    exact: true,
  },
  {
    path: '/categories',
    component: Category,
    exact: true,
  },
  {
    path: '/categories/all',
    component: CategoryList,
    exact: true,
  },
  {
    path: '/categories/new',
    component: NewCategory,
    exact: true,
  },
  {
    path: '/categories/:id',
    component: CategoryInfo,
    exact: true,
  },
  {
    path: '/categories/edit/:id',
    component: UpdateCategory,
    exact: false,
  },
];

export default routes;