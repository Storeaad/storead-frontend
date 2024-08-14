import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY } from "@/constants/queryKey";
import { updateProfile } from "@/lib/apis/profile/updateProfile";

import { ProfilePayload } from "../../type";

interface Props {
  setDisableForm: () => void;
  setIntroduce: (content: string) => void;
}

export const useUpdateProfileMutation = ({
  setDisableForm,
  setIntroduce,
}: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contents: ProfilePayload) => updateProfile(contents),
    onSuccess: (newData) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_PROFILE] });
      toast("프로필 정보가 정상적으로 수정되었습니다.");
      setIntroduce(newData.about_me ?? "");
      setDisableForm();
    },
  });
};
