import type { QueryFilter } from "../../types/Todos.js";
import styles from "./Filter.module.css";

interface Props {
  currentPage: QueryFilter;
  displayName: String;
  filter: QueryFilter;
  quantity: number | undefined;
  handleUpdate: React.Dispatch<React.SetStateAction<QueryFilter>>; //seter
}

export default function Selector({
  currentPage,
  displayName,
  filter,
  quantity,
  handleUpdate,
}: Props) {
  return (
    <p
      className={currentPage === filter ? styles.selected : ""} //underline
      onClick={() => handleUpdate(filter)}
    >
      {displayName} ({quantity})
    </p>
  );
}
