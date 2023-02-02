import Input from "@mui/material/Input";
import { setInputId } from "../../store/slice/dataTable";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

export const IdInput = () => {
  const inputId = useAppSelector((state) => state.dataTable.inputId);
  const dispatch = useAppDispatch();

  return (
    <Input
      type="number"
      placeholder="Enter ID"
      value={inputId}
      onChange={(e: any) => dispatch(setInputId(e.target.value))}
    />
  );
};
