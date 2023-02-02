import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type DataTableType = {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
};

export type InitialStateType = {
  inputId: number | null;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: DataTableType[];
  support: supportType;
};

type supportType = {
  url: string;
  text: string;
};

const initialState: InitialStateType = {
  inputId: null,
  page: 1,
  per_page: 0,
  total: 0,
  total_pages: 0,
  data: [
    {
      id: 0,
      name: "",
      year: 0,
      color: "",
      pantone_value: "",
    },
  ],
  support: {
    url: "",
    text: "",
  },
};

export const getDataTable = createAsyncThunk<
  InitialStateType,
  { page: number; per_page: number },
  { rejectValue: string }
>("DataTable", async ({ page, per_page }, { rejectWithValue }) => {
  try {
    const { data } = await axios.request({
      method: "GET",
      url: `https://reqres.in/api/{resource}`,
      params: {
        page: page,
        per_page: per_page,
      },
    });
    return data;
  } catch {
    return rejectWithValue("error");
  }
});
type dataTableByIdType = {
  data: DataTableType;
  support: supportType;
};
export const getDataTableById = createAsyncThunk<
  dataTableByIdType,
  number,
  { rejectValue: string }
>("DataTableById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.request({
      method: "GET",
      url: `https://reqres.in/api/{resource}/${id}`,
    });
    return data;
  } catch {
    return rejectWithValue("error");
  }
});

const dataTable = createSlice({
  name: "dataTable",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setInputId(state, action) {
      state.inputId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDataTable.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
    });
    builder.addCase(getDataTableById.fulfilled, (state, action) => {
      state.data = [action.payload.data];
    });
  },
});

export const { setPage, setInputId } = dataTable.actions;

export default dataTable.reducer;
