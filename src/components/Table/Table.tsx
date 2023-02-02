import { useEffect, useState } from "react";
import {
  getDataTable,
  getDataTableById,
  setPage,
} from "../../store/slice/dataTable";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Stack, Pagination, PaginationItem } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import styles from "./Table.module.css";
import { Modal } from "../Modal/Modal";

export const Table = () => {
  const data = useAppSelector((state) => state.dataTable.data);
  const page = useAppSelector((state) => state.dataTable.page);
  const totalPages = useAppSelector((state) => state.dataTable.total_pages);
  const inputId = useAppSelector((state) => state.dataTable.inputId);

  const [modalOpen, setModalOpen] = useState(false);
  const [dataId, setDataId] = useState(0);

  const params = useParams();
  console.log(params);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputId) {
      dispatch(getDataTableById(inputId));
    } else {
      dispatch(getDataTable({ page: page, per_page: 5 }));
    }
  }, [dispatch, page, inputId]);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableMain}>
        <thead className={styles.tableMain__header}>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody className={styles.tableMain__content}>
          {data?.map((el) => (
            <tr
              key={el.id}
              className={styles.tableMain__row}
              style={{ backgroundColor: el.color }}
              onClick={() => {
                setModalOpen(true);
                setDataId(el.id);
              }}
            >
              <td>{el?.id}</td>
              <td>{el?.name}</td>
              <td>{el?.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        data={data}
        dataId={dataId}
        active={modalOpen}
        setModalOpen={setModalOpen}
        setDataId={setDataId}
      />
      <Stack spacing={2}>
        {!!totalPages && (
          <Pagination
            count={totalPages}
            onChange={(_, num) => dispatch(setPage(num))}
            sx={{ marginY: 3, marginX: "auto" }}
            renderItem={(item) => (
              <PaginationItem
                component={NavLink}
                to={`?page=${item.page}`}
                {...item}
              />
            )}
          />
        )}
      </Stack>
    </div>
  );
};
