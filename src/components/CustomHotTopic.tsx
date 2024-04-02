"use client"
import { useTheme } from "next-themes";
import D3WordCloud from "react-d3-cloud";

const data = [
  {
    text: "Object Oriented Programing",
    value: 19,
  },
  {
    text: "Database Management System",
    value: 20,
  },
  {
    text: "Operating System",
    value: 14,
  },
  {
    text: "Computer Networks",
    value: 8,
  },
];

type Props = {};

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const CustomHotTopic = (props: Props) => {
  const theme = useTheme();
  return (
    <>
      <D3WordCloud
        data={data}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme === "dark" ? "white" : "black"}
      ></D3WordCloud>
    </>
  );
};

export default CustomHotTopic;
