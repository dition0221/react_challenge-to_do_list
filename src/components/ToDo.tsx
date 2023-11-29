import { useRecoilState, useRecoilValue } from "recoil";
import { IToDo, IToDoState, categoryState, toDoState } from "../atom";
import styled from "styled-components";
import { Btn, DeleteBtn } from "./shared-style";

const Li = styled.li`
  font-size: 18px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
  line-height: 2;
`;

const ToDoText = styled.span``;

export default function ToDo({ text, id }: IToDo) {
  // Atom
  const [toDoList, setToDoList] = useRecoilState(toDoState);
  const currentCategory = useRecoilValue(categoryState);

  // Change 'category'
  const onChangeCategory = (newCategory: keyof IToDoState) => {
    setToDoList((oldToDoList) => {
      const {
        [currentCategory]: currentList,
        [newCategory]: targetList,
        ..._
      } = oldToDoList;
      const idx = currentList.findIndex((toDo) => toDo.id === id);
      return {
        ..._,
        [currentCategory]: [
          ...currentList.slice(0, idx),
          ...currentList.slice(idx + 1),
        ],
        [newCategory]: [...targetList, { text, id }],
      };
    });
  };

  // Delete 'To-Do'
  const onDeleteToDo = () => {
    setToDoList((oldToDoList) => {
      const { [currentCategory]: currentList, ..._ } = oldToDoList;
      const idx = currentList.findIndex((toDo) => toDo.id === id);
      return {
        ..._,
        [currentCategory]: [
          ...currentList.slice(0, idx),
          ...currentList.slice(idx + 1),
        ],
      };
    });
  };

  return (
    <Li>
      <ToDoText>▪ {text}</ToDoText>
      {Object.keys(toDoList).map(
        (category) =>
          category !== currentCategory && (
            <Btn key={category} onClick={() => onChangeCategory(category)}>
              {category}
            </Btn>
          )
      )}
      <DeleteBtn onClick={onDeleteToDo}>❌</DeleteBtn>
    </Li>
  );
}
