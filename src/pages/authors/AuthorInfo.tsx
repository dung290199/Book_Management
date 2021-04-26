import React, { useState, FC, useEffect, Props } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthor, deleteAuthor } from '../../redux/actions/authorAction';
import { Redirect, Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import { Book } from '../../types/Model';

const AuthorInfo: FC<{history: any, match: any}> = (props) => {

  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);
  const author = useSelector((state: any) => state.authorReducer.author)

  const [loading, setLoading] = useState(true);

  const handleDeleteAuthor = async () => {
    const status = await dispatch(deleteAuthor(+props.match.params.id));    
    if (+status === 200) {
      props.history.push('/authors/all');
    }
  }              

  const getAuthorInfo = async () => {
    const status = await dispatch(getAuthor(+props.match.params.id));
    if (+status === 200) {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getAuthorInfo();
  }, [loading, dispatch]);

  return (
    <>
      <h1>AuthorInfo</h1>
      {
        (isLogin && author)
        ? (
          <CRow className="justify-content-md-center">
            <CCol lg={8}>
              <CCard>
                <CCardHeader className="header">
                  <h1>User Information</h1>
                  <div className="form-actions">
                    <CButton type="submit" size="md" shape="pill" color="info" onClick={() => props.history.push(`/authors/edit/${author.id}`)}>Update</CButton>
                    <CButton size="md" shape="pill" color="danger" onClick={handleDeleteAuthor}>Remove</CButton>
                  </div>
                </CCardHeader>
                <CCardBody>
                    <table className="table table-striped table-hover">
                      <tbody>
                        {
                          Object.keys(author).map((key, index) => {
                            const value = (key === "books" && author.books.length !== 0) 
                                          ? author.books.reduce((accum: string[], val: Book) => {
                                              accum.push(val.name);
                                              return accum;
                                            }, []).join(",")
                                          : author[key];    
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

export default AuthorInfo;