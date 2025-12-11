"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-10 ", className)}>
      <div
        className={
          " mx-auto flex h-[100%] max-w-full items-start md:items-start justify-center bg-transparent  py-1  "
        }
      >
        <p
          ref={targetRef}
          className={
            " mt-20 flex-wrap   flex justify-center w-11/12    p-5 text-4xl font-normal text-white/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          }
          style={{lineHeight:1.5}}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / (words.length); 
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [1, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={`${children=="Cloud"||children=="AI"?"text-[#8d49fd] font-bold":"text-white"} dark:text-white`}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
