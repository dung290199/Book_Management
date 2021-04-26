import React, { useState, FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBook, deleteBook } from '../../../redux/actions/bookAction';
import { Redirect, Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import './BookInfo.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Category } from '../../../types/Model';

const BookInfo: FC<{history: any, match: any}> = (props) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);
  const book = useSelector((state: any) => state.bookReducer.book);

  const [loading, setLoading] = useState(true);

  const handleDeleteBook = async () => {
    const status = await dispatch(deleteBook(+props.match.params.id));
    if (+status === 200) {
      props.history.push('/books/all'); 
    } 
  }

  const getBookInfo = async () => {
    const status = await dispatch(getBook(+props.match.params.id));
    if (+status === 200) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBookInfo();
  }, [loading, dispatch]);

  return (
    <>
      {
        (isLogin && book)
        ? (
          <CRow className="justify-content-md-center">
            <CCol lg={8}>
              <CCard>
                <CCardHeader className="header">
                  <strong>User Information</strong>
                  <div className="form-actions">
                    <CButton type="submit" size="md" shape="pill" color="info" onClick={() => props.history.push(`/books/edit/${book.id}`)}>Update</CButton>
                    <CButton size="md" shape="pill" color="danger" onClick={handleDeleteBook}>Remove</CButton>
                  </div>
                </CCardHeader>
                <CCardBody>
                    <table className="table table-striped table-hover">
                      <tbody>
                        {
                          Object.keys(book).map((key, index) => {
                            let value = null;
                            switch (key) {
                              case "author":
                                value = book.author.name;
                                break;
                              case "categories":
                                value = book.categories.length  
                                          ? book.categories.reduce((accum: string[], val: Category) => {
                                            accum.push(val.name);
                                            return accum;
                                          }, []).join(",")
                                          : null;        
                                break;
                              default:
                                value = book[key];
                                break;
                            }
                            return (
                              <tr key={index.toString()}>
                                <td>{`${key}:`}</td>
                                <td><strong>{value}</strong></td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )
        : isLogin
          ? <CircularProgress />
          : <Redirect to="/" />
      }
    </>
  );
};

export default BookInfo;