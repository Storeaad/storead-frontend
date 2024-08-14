import { useForm } from "react-hook-form";

export const useIntroduceForm = (initialIntroduce = "") => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { introduce: initialIntroduce },
  });

  return { register, handleSubmit, reset };
};
