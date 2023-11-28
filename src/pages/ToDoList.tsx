import { useRecoilValue } from "recoil";
import { toDoState } from "../atom"; // Atom
// Components
import CreateToDo from "../components/CreateToDo";
import ToDo from "../components/ToDo";

export default function ToDoList() {
  // Atom: value
  const toDos = useRecoilValue(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}
