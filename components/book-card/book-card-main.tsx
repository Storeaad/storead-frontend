import { PropsWithChildren } from "react";

import Image from "next/image";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface Props {
  image?: string;
  title: string;
  author: string;
  description: string;
}

export function BookCardMain(props: Props & PropsWithChildren) {
  //TODO: 해당 책에 대한 서평 목록 / 해당 책 서평 작성 버튼
  return (
    <Card className="flex md:flex-row gap-8 h-[250px] p-4">
      {props.image ? (
        <Image
          src={props.image}
          alt={props.title}
          width={180}
          height={250}
          className="rounded-lg"
        />
      ) : null}
      <div className="flex flex-col gap-4 flex-grow">
        <CardHeader className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">{props.title}</h2>
          <h3 className="font-light">{props.author}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="max-w-[500px] font-sans font-extralight text-overflow">
            {props.description.length > 20
              ? `${props.description.slice(0, 40)}...`
              : props.description}
          </p>
        </CardContent>
        {props.children != null && <CardFooter>{props.children}</CardFooter>}
      </div>
    </Card>
  );
}
