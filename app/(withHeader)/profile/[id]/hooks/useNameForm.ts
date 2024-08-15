import { useForm } from "react-hook-form";

export const useNameForm = (name = "") => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name },
  });

  return { register, handleSubmit, reset };
};
