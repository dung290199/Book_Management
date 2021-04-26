import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getAllAuthors } from '../../redux/actions/authorAction';
import PaginationComponent from '../../components/pagination/PaginationComponent';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CCardFooter
} from '@coreui/react';
import { Author } from '../../types/Model';

const AuthorList: FC<{history: any}> = (props) => {
  const dispatch = useDispatch();

  const list = useSelector((state: any) => state.authorReducer.list);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  const pagination = useSelector((state: any) => state.authorReducer.pagination);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  if ( pagination && currentPage !== pagination.currentPage ) {
    setCurrentPage(pagination.currentPage);
    setTotalPages(pagination.totalPages);
  }

  const getAuthorListContent = async () => {
    const status = await dispatch(getAllAuthors(currentPage.toString()));
    if (+status === 200 || list.length !== 0) {
      setLoading(false);
    }
  }
  const fields = [
    { key: 'name', _classes: 'font-weight-bold' },
    'website',
    'birthday',
    'books'
  ];

  useEffect(() => {
    getAuthorListContent();
  }, [loading, dispatch]);

  useEffect(() => {
    if ( pagination  ) {
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
    }
  }, [pagination]);

  return (
    <>
      {
        (isLogin)
        ? (
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  <h1>Authors List</h1>
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    items={list}
                    fields={fields}
                    hover
                    loading={loading}
                    striped
                    itemsPerPage={10}
                    clickableRows
                    onRowClick={(item: Author) => props.history.push(`/authors/${item.id}`)}
                  />
                </CCardBody>
                <CCardFooter>
                  <PaginationComponent type="author" totalPages={totalPages} currentPage={currentPage} />
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        )
        : <Redirect to="/" />
      }
    </>
  );
};

export default AuthorList;