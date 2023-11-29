import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";
import { Btn, Error, Input, Wrapper } from "./shared-style";

interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  // Atom
  const setToDoList = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState); // selected 'category'

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDoList((oldToDoList) => {
      const newToDo = {
        id: Date.now(),
        text: toDo,
      };
      return {
        ...oldToDoList,
        [category]: [...oldToDoList[category], newToDo],
      };
    });
    reset();
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("toDo", {
            required: "Please write a 'To-Do'.",
            minLength: {
              value: 2,
              message: "Please write more than 2 characters.",
            },
            maxLength: {
              value: 10,
              message: "Please write less than 10 characters.",
            },
          })}
          type="text"
          placeholder="Write a 'To-Do'"
        />
        <Btn>Add</Btn>
        <Error>{errors.toDo?.message}</Error>
      </form>
    </Wrapper>
  );
}
