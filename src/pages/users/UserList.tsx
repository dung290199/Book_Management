import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getAllUser, deleteUser } from '../../redux/actions/userAction';
import { useHistory, useLocation } from 'react-router-dom';
import PaginationComponent from '../../components/pagination/PaginationComponent';
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from '@coreui/react'
import { User } from '../../types/Model';

const UserList: FC<{history: any, match: any}> = (props) => {
  const dispatch = useDispatch();

  const list = useSelector((state: any) => state.userReducer.list);
  const isLogin = useSelector((state: any) => state.authReducer.isLogin);

  const pagination = useSelector((state: any) => state.userReducer.pagination);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  if ( pagination && currentPage !== pagination.currentPage ) {
    setCurrentPage(pagination.currentPage);
    setTotalPages(pagination.totalPages);
  }

  // const handleDeleteUser = async (id: number) => {
  //   const status = await dispatch(deleteUser(id));
  //   (+status === 200) ? console.log("Delete success") : console.log("Delete fail");
  // }

  const getUsersListContent = async () => {
    const status = await dispatch(getAllUser(currentPage.toString()));
    if (+status === 200) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsersListContent();
  }, [loading, dispatch]);

  useEffect(() => {
    if ( pagination  ) {
      setCurrentPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
    }
  }, [pagination]);
  console.log("pagination: ", pagination);
  

  return (
    <>
      {
        (isLogin)
        ? (
          <CRow>
            <CCol xl={12}>
              <CCard>
                <CCardHeader>
                  <h1>Users List</h1>
                </CCardHeader>
                <CCardBody>
                <CDataTable
                  items={list}
                  fields={[
                    { key: 'name', _classes: 'font-weight-bold' },
                    'username', 'role'
                  ]}
                  hover
                  loading={loading}
                  striped
                  itemsPerPage={5}
                  clickableRows
                  onRowClick={(item: User) => props.history.push(`/users/edit/${item.id}`)}
                />
                </CCardBody>
                <CCardFooter>
                  <PaginationComponent type="user" totalPages={totalPages} currentPage={currentPage} />
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

export default UserList;