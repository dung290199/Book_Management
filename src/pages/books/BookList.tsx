import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getAllBook } from '../../redux/actions/bookAction';
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
import { Book } from '../../types/Model';

const BookList: FC<{history: any}> = (props) => {
  const dispatch = useDispatch();

  const list = useSelector((state: any) => state.bookReducer.list);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  const pagination = useSelector((state: any) => state.bookReducer.pagination);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  if ( pagination && currentPage !== pagination.currentPage ) {
    setCurrentPage(pagination.currentPage);
    setTotalPages(pagination.totalPages);
  }

  const getBookListContent = async () => {
    const status = await dispatch(getAllBook(currentPage.toString()));
    if (+status === 200 || list.length !== 0) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBookListContent();
  }, [loading, dispatch]);

  useEffect(() => {
    if ( pagination  ) {
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
    }
  }, [pagination, list]);

  console.log("pagination: ", pagination);
  console.log("list: ", list);
  
  

  const scopedSlots = {
    'author':
      (item: Book) => ( 
        <td> {item.author.name} </td>
      ),
  }
  const fields = [
    { key: 'name', _classes: 'font-weight-bold' },
    {key: 'author', label: "Author"},
    'year',
    'price'
  ];
  
  return (
    <>
      {
        (isLogin)
        ? (
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  <h1>Books List</h1>
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    items={list}
                    fields={fields}
                    scopedSlots={scopedSlots}
                    hover
                    loading={loading}
                    striped
                    itemsPerPage={5}
                    clickableRows
                    onRowClick={(item: Book) => props.history.push(`/books/${item.id}`)}
                  />
                </CCardBody>
                <CCardFooter>
                  <PaginationComponent type="book" totalPages={totalPages} currentPage={currentPage} />
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

export default BookList;