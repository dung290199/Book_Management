import React, { useState, FC, useEffect } from 'react';
import { updateBook } from '../../redux/actions/bookAction';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInvalidFeedback,
  CInput,
  CLabel,
  CRow,
} from '@coreui/react';
import { Book } from '../../types/Model';
import { BookErrorProps } from '../../types/Error';

const UpdateBook: FC<{history: any, match: any}> = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin)
  const data = useSelector((state: any) => state.bookReducer.book);

  const [isValidate, setIsValidate] = useState(false);
  const [book, setBook] = useState<Book> ({ ...data } );
  const [error, setError] = useState<BookErrorProps<boolean>> ({
    name: false,
    description: false,
    price: false,
    year: false,
    authorId: false,
    authorName: false,
    authorBirthday: false,
    authorCover: false,
    publisher: false
  });

  const handleBookChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    let newvalue = (name === "price") 
            ? 10.2
            : ( name === "year" )
              ? 1842
              : value;
    newvalue = ( value === "" ) ? null : value;
    console.log(name, value === "");
    
    setBook({
      ...book,
      [name]: newvalue
    });
  }

  const handleAuthorChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    let newvalue = (name === "id") ? 10 : value;
    console.log(name, value);
    setBook({
      ...book,
      author: {
        ...book.author,
        [name]: newvalue
      }
    });
  }

  const handleCategoryChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target;
    let newvalue = (name === "id") ? 10 : value;
    console.log("name: ", name);
    
    let newCate: any = book.categories;
    newCate = newCate.length
          ? (
            newCate.map((cate: any) => {
              if (!Object.keys(cate).includes(name)) {
                return { ...cate, [name]: newvalue }
              }
              return cate;
            })
          )
          : [ ...newCate, {[name]: newvalue} ]

    setBook({
      ...book,
      categories: newCate
    });
  }

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    await validate(book);
  }

  const validate = async (book: Book) => {
    setError({
      name: book.name === null,
      description: book.description === "",
      price: book.price <= 0.0 && book.price === null,
      year: book.year <= 0.0 && book.year === null,
      authorId: book.author.id === 0 && book.author.id === null,
      authorName: book.author.name === "",
      authorBirthday: book.author.birthday === "",
      authorCover: book.author.cover === "",
      publisher: book.publisher === ""
    });
    
    setIsValidate(book !== null 
      && (Object.values(error)
              .filter(val => !val)
              .length !== 0)
    )
  }

  const update = async () => {
    const result = await dispatch(updateBook(JSON.stringify(book), +props.match.params.id));
    if (+result === 200) {
      props.history.push("/books/all");
    }
  }

  useEffect(() => {
    if (isValidate) {
      update();
    }
  }, [error, isValidate]);
  
  return (
    <>
      {
        !isLogin
          ? <Redirect to="/" />
          : (
            <CRow className="justify-content-md-center">
              <CCol xs="12" sm="6">
                <CCard>
                  <CCardHeader>
                    <h2>Book Information</h2>
                  </CCardHeader>
                  <CForm onSubmit={handleSubmit}>
                    <CCardBody>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="name">Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.name} id="name" name="name" value={book.name} onChange={handleBookChange} />
                          <CInvalidFeedback>Name cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="description">Description</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.description} id="description" name="description" value={book.description} onChange={handleBookChange} />
                          <CInvalidFeedback>Description cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="price">Price</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.price} id="price" name="price" value={book.price} onChange={handleBookChange} />
                          <CInvalidFeedback>Price cannot be empty and should be greater than 0</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="year">Year</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.year} id="year" name="year" value={book.year} onChange={handleBookChange} />
                          <CInvalidFeedback>Year cannot be empty and should be greater than 0</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="publisher">Publisher</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.publisher} id="publisher" name="publisher" value={book.publisher} onChange={handleBookChange} />
                          <CInvalidFeedback>Publisher cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="cover">Cover</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput id="cover" name="cover" value={book.cover} onChange={handleBookChange} />
                        </CCol>
                      </CFormGroup>
                    </CCardBody>
                    <CCardBody>
                      <h5>Author</h5>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="id">ID</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.authorId} id="ID" name="id" value={book.author.id} onChange={handleAuthorChange} />
                          <CInvalidFeedback>ID of author cannot be empty and should be greater than 0</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                         <CLabel htmlFor="name">Name</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.authorName} id="name" name="name" value={book.author.name} onChange={handleAuthorChange} />
                          <CInvalidFeedback>Name of author cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="website">Website</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput id="website" name="website" value={book.author.website} onChange={handleAuthorChange} />
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="birthday">Birthday</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.authorBirthday} id="birthday" name="birthday" value={book.author.birthday} onChange={handleAuthorChange} />
                          <CInvalidFeedback>Birthday of author cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel htmlFor="cover">Cover</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CInput invalid={error.authorCover} id="cover" name="cover" value={book.author.cover} onChange={handleAuthorChange} />
                          <CInvalidFeedback>Cover image of author cannot be empty</CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                    </CCardBody>
                    <CCardBody>
                      <h5>Categories</h5>
                      {
                        book.categories.length
                          ? book.categories.map( category => {
                            return (
                              <>
                                <CFormGroup row>
                                  <CCol md="3">
                                    <CLabel htmlFor="id">ID</CLabel>
                                  </CCol>
                                  <CCol xs="12" md="9">
                                    <CInput invalid={false} id="ID" name="id" value={category.id} onChange={handleCategoryChange} />
                                  </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                  <CCol md="3">
                                    <CLabel htmlFor="name">Name</CLabel>
                                  </CCol>
                                  <CCol xs="12" md="9">
                                    <CInput invalid={false} id="name" name="name" value={category.name} onChange={handleCategoryChange} />
                                  </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                  <CCol md="3">
                                    <CLabel htmlFor="description">Description</CLabel>
                                  </CCol>
                                  <CCol xs="12" md="9">
                                    <CInput invalid={false} id="description" name="description" value={category.description} onChange={handleCategoryChange} />
                                  </CCol>
                                </CFormGroup>
                              </>
                            );
                          })
                          : null
                      }
                    </CCardBody>
                    <CCardFooter>
                      <CButton 
                        type="submit"
                        size="md"
                        shape="pill"
                        color="info"
                      >
                        Save changes
                      </CButton> 
                      <CButton
                        size="md"
                        shape="pill"
                        color="danger"
                        onClick={() => props.history.goBack()}
                      >
                        Cancel
                      </CButton>
                    </CCardFooter>
                  </CForm>
                </CCard>
              </CCol>
            </CRow>
          )
      }
    </>
  )
};

export default UpdateBook;