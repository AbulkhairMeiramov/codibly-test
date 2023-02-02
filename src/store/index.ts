import { configureStore } from "@reduxjs/toolkit";
import dataTable from "./slice/dataTable";

const store = configureStore({
  reducer: { dataTable: dataTable },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
