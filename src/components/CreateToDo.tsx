import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atom"; // Atom

interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  // Atom: setterFn
  const setToDos = useSetRecoilState(toDoState);

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      ...oldToDos,
      { text: toDo, id: Date.now(), category: "TO_DO" },
    ]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please write a 'To-Do'" })}
        type="text"
        placeholder="Write a 'To-Do'"
        required
      />
      <button>Add</button>
      <span>{errors.toDo?.message}</span>
    </form>
  );
}
