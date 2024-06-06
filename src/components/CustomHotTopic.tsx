"use client"
import { useTheme } from "next-themes";
import dynamic from 'next/dynamic';
const D3WordCloud = dynamic(() => import('react-d3-cloud'), { ssr: false });
const data = [
  { text: "Object Oriented Programing", value: 19 },
  { text: "Database Management System", value: 20 },
  { text: "Operating System", value: 14 },
  { text: "Computer Networks", value: 8 },
];

type Props = {};

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const CustomHotTopic = (props: Props) => {
  const { theme } = useTheme();
  return (
    <>
      <D3WordCloud
        data={data}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={() => getRandomColor()}
      ></D3WordCloud>
    </>
  );
};

export default CustomHotTopic;
