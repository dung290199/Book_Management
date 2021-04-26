import React, { useState, useEffect, FC } from "react";
import Pagination from 'react-bootstrap/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAuthors } from "../../redux/actions/authorAction";
import { getAllBook } from '../../redux/actions/bookAction';
import { getAllCategories } from "../../redux/actions/categoryAction";
import { getAllUser } from "../../redux/actions/userAction";
import './PaginationComponent.css';

interface PaginationProps {
  totalPages: number,
  currentPage: number,
  type: string
}

const PaginationComponent: FC<PaginationProps> = (props) => {

  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    if (totalPages !== props.totalPages) {
      setTotalPages(props.totalPages);
    }
  }, [props.totalPages]);

  const items = [];

  const getContentOfPage = async (pageNumber: number) => {
    switch (props.type.toUpperCase()) {
      case 'USER':
        await dispatch(getAllUser(pageNumber.toString()));
        break;
      case 'BOOK':
        await dispatch(getAllBook(pageNumber.toString()));
        break;
      case 'AUTHOR':
        await dispatch(getAllAuthors(pageNumber.toString()));
        break;
      case 'CATEGORY':
        await dispatch(getAllCategories(pageNumber.toString()));
        break;
    }
  }

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    items.push(
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === props.currentPage}
        onClick={() => getContentOfPage(pageNumber)}
      >
        {pageNumber}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination className="pagination--center">
      <Pagination.Prev
        disabled={props.currentPage === 1}
        onClick={() => getContentOfPage(props.currentPage - 1)}
      />
      {items}
      <Pagination.Next
        disabled={props.currentPage === totalPages}
        onClick={() => getContentOfPage(props.currentPage + 1)}
      />
    </Pagination>
  );
}

export default PaginationComponent;