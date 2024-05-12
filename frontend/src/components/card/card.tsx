"use client";


import { CardBody, CardContainer, CardItem } from "../ui/3d-card";


export function ThreeDCardDemo({ title, description, image, lien }: { title: string, description: string, image: string, lien: string }) {
  return (
    <a target="_blank" href={lien}>
    <CardContainer className="inter-var max-w-[25rem]">
      <CardBody className="bg-transparant hover:bg-zinc-800 hover:shadow-md  relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] max-w-64 sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="80"
          className="text-white text-xl font-bold"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-white text-sm max-w-sm mt-2 h-20 overflow-hidden dark:text-white"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={image}
            height="500"
            width="500"
            className="h-20 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem translateZ="60" className="flex  justify-end items-center mt-4">
          <button className="px-4 py-2 w-full text-center rounded-xl group-hover/card:bg-white group-hover/card:text-black duration-300 bg-black dark:bg-black dark:text-white text-white font-semibold" >Voir plus</button>
        </CardItem>
      </CardBody>
    </CardContainer>
    </a>
  );
}
