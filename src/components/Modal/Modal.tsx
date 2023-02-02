import { DataTableType } from "../../store/slice/dataTable";
import styles from "./Modal.module.css";

type ModalProps = {
  active: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDataId: React.Dispatch<React.SetStateAction<number>>;
  data: DataTableType[];
  dataId: number;
};

export const Modal: React.FC<ModalProps> = ({
  active,
  setModalOpen,
  setDataId,
  data,
  dataId,
}) => {
  return (
    <div
      className={active ? styles.modal__active : styles.modal}
      onClick={() => {
        setModalOpen(false);
        setDataId(0);
      }}
    >
      <div className={styles.modal__wrapper}>
        {data
          .filter((el) => el.id === dataId)
          .map((el) => (
            <div key={el.id}>
              <h1>ID: {el?.id}</h1>
              <h1>Name: {el?.name}</h1>
              <h1>Color: {el?.color}</h1>
              <h1>Year: {el?.year}</h1>
              <h1>Pantone Value: {el?.pantone_value}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};
