"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";
import img from '../home_components/Group 320.png'
export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: false,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    // dragControl: false,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string, customImageUrl?: string) => {
console.log(icon);

  if (customImageUrl) {
    // Render your custom image instead of the default icon
    return (
      <img
        src={customImageUrl}
        alt={icon.title}
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%', // Optional: makes the image circular
          backgroundColor: theme === 'light' ? '#f3f2ef' : '#080510',
        }}
      />
    );
  } else {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
}
};

export type DynamicCloudProps = {
  iconSlugs: string[];
  customImageMap?: { [slug: string]: string };
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs, customImageMap = {} }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
console.log('data',data);

    return Object.values(data.simpleIcons).map((icon) => {
      const customImageUrl = customImageMap[icon.slug];
      console.log(icon);
      // icon.path=img.src
      if (icon.slug === 'javascript') { // Replace with the actual slug you want to replace
        return renderCustomIcon(icon, theme || 'light', img.src); // Using local image
      }
      
      return renderCustomIcon(icon, theme || 'light', customImageUrl);
    });
  }, [data, theme, customImageMap]);

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  );
}
