import { IdInput } from "../components/IdInput/IdInput";
import { Table } from "../components/Table/Table";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.header}>
        <h1>Codibly test</h1>
      </div>
      <div className={styles.data}>
        <div className={styles.input}>
          <IdInput />
        </div>
        <div className={styles.table}>
          <Table />
        </div>
      </div>
    </div>
  );
};
