"use client";

import { Dispatch, SetStateAction } from "react";

import { Pencil } from "lucide-react";

interface Props {
  handleEdit: Dispatch<SetStateAction<boolean>>;
}

function EditButton({ handleEdit }: Props) {
  const onClick = () => {
    handleEdit((old) => !old);
  };
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-full"
      aria-label="댓글 수정"
    >
      <Pencil
        width={18}
        height={18}
      />
    </button>
  );
}

export default EditButton;
