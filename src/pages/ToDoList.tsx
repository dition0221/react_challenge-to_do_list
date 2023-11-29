import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atom";
import styled from "styled-components";
// Components
import CreateToDo from "../components/CreateToDo";
import ToDo from "../components/ToDo";
import SelectCategory from "../components/SelectCategory";

const Wrapper = styled.main`
  width: 420px;
  padding: 0 20px;
  margin: 0 auto;
  hr {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 32px;
  text-align: center;
`;

export default function ToDoList() {
  // Atom: current category's 'To-Do List'
  const toDoList = useRecoilValue(toDoSelector);

  return (
    <Wrapper>
      <Title>To-Do List</Title>
      <hr />
      <SelectCategory />
      <CreateToDo />

      <ul>
        {toDoList.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </Wrapper>
  );
}
