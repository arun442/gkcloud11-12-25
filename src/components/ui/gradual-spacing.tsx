"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export default function GradualSpacing({
  text,
  duration = 1,
  delayMultiple = 0.2,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}: GradualSpacingProps) {
  return (
    <div className= "  m-auto flex gap-3 justify-center w-11/12  flex-wrap   text-2xl font-normal text-white/20 dark:text-white/20 md:pt-10 md:text-5xl lg:py-32 px-10 lg:text-4xl xl:text-5xl">
      <AnimatePresence>
        {text.split(" ").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn("drop-shadow-sm ", className)}
            style={{width:"fit-content",color:`${char=="Cloud"||char=="AI"?"#8d49fd":"white"}`}}
          >
            {char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}
