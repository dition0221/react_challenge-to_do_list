import { useRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Btn, DeleteBtn, Error, Input, Wrapper } from "./shared-style";

const Categories = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const Category = styled.span`
  font-size: 18px;
  margin-right: 10px;
`;

const Select = styled.select`
  cursor: pointer;
`;

interface IForm {
  category: string;
}

export default function SelectCategory() {
  // Select 'category'
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) =>
    setCategory(e.currentTarget.value);

  // <form>
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<IForm>();

  // Add new 'category'
  const [toDoList, setToDoList] = useRecoilState(toDoState);
  const onSubmit = ({ category }: IForm) => {
    // Check duplication
    if (Object.keys(toDoList).includes(category))
      return setError(
        "category",
        { message: "'Category' is duplicated." },
        { shouldFocus: true }
      );
    // Success: Add category & Set current category
    setToDoList((oldToDoList) => {
      return {
        ...oldToDoList,
        [category]: [],
      };
    });
    setCategory(category);
    reset();
  };

  // Delete 'category'
  const onDeleteCategory = () => {
    // Handle confirmation
    const ok = confirm(
      "Are you sure to delete this category?\n All 'To-Do' in this category will be deleted."
    );
    if (!ok) return;
    // Success
    setToDoList((oldToDoList) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [category]: _, ...newToDoList } = oldToDoList;
      return {
        ...newToDoList,
      };
    });
    setCategory("TO_DO");
  };

  return (
    <Wrapper>
      <Categories>
        <Category>Category :</Category>
        <Select value={category} onInput={onInput}>
          {Object.keys(toDoList).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        {category !== "TO_DO" && (
          <DeleteBtn onClick={onDeleteCategory}>❌</DeleteBtn>
        )}
      </Categories>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("category", {
            required: "Please write a 'Category'.",
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
          placeholder="Write a new 'Category'"
        />
        <Btn>Add category</Btn>
        <Error>{errors.category?.message}</Error>
      </form>
    </Wrapper>
  );
}
