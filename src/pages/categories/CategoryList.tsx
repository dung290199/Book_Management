import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getAllCategories } from '../../redux/actions/categoryAction';
import PaginationComponent from '../../components/pagination/PaginationComponent';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CCardFooter
} from '@coreui/react'
import { Category } from '../../types/Model';

const CategoryList: FC<{history: any}> = (props) => {
  const dispatch = useDispatch();

  const list = useSelector((state: any) => state.categoryReducer.list);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  const pagination = useSelector((state: any) => state.bookReducer.pagination);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  if ( pagination && currentPage !== pagination.currentPage ) {
    setCurrentPage(pagination.currentPage);
    setTotalPages(pagination.totalPages);
  }
  const fields = [
    { key: 'name', _classes: 'font-weight-bold' },
    'description',
  ];

  const getCategoriesListContent = async () => {
    const status = await dispatch(getAllCategories(currentPage.toString()));
    if (+status === 200 || list.length !== 0) {
      setLoading(false);
    }    
  }

  useEffect(() => {
    getCategoriesListContent();
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
                  Categories List
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    items={list}
                    fields={fields}
                    hover
                    loading={loading}
                    striped
                    itemsPerPage={10}
                    activePage={currentPage}
                    clickableRows
                    onRowClick={(item: Category) => props.history.push(`/categories/${item.id}`)}
                    />
                </CCardBody>
                <CCardFooter>
                  <PaginationComponent type="category" totalPages={totalPages} currentPage={currentPage} />
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>)
        : <Redirect to="/" />
      }
    </>
  );
};

export default CategoryList;