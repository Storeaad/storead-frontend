import { PropsWithChildren } from "react";

import Image from "next/image";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface Props {
  image: string;
  title: string;
  author: string;
  description: string;
}

export function BookCardMain(props: Props & PropsWithChildren) {
  //TODO: 해당 책에 대한 서평 목록 / 해당 책 서평 작성 버튼
  return (
    <Card className="flex md:flex-row gap-8 h-[250px] p-4">
      <Image
        src={props.image}
        alt={props.title}
        width={180}
        height={250}
        className="rounded-lg"
      />
      <div className="w-[240px] flex flex-col gap-4 flex-grow">
        <CardHeader className="p-0 flex flex-col gap-2">
          <h2 className="font-bold text-lg truncate">{props.title}</h2>
          <h3 className="font-light text-muted-foreground">{props.author}</h3>
        </CardHeader>
        <CardContent className="p-0 flex-grow">
          <p className="text-sm text-muted-foreground">
            {props.description.length > 20
              ? `${props.description.slice(0, 70)}...`
              : props.description}
          </p>
        </CardContent>
        {/* 버튼 그룹 넣는 칸 */}
        {props.children != null && <CardFooter>{props.children}</CardFooter>}
      </div>
    </Card>
  );
}
