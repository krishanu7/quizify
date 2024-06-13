"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const D3WordCloud = dynamic(() => import("react-d3-cloud"), { ssr: false });

type Props = {
  formattedTopics: { text: string; value: number }[];
};

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const CustomHotTopic = ({ formattedTopics }: Props) => {
  const router = useRouter();
  return (
    <>
      <D3WordCloud
        data={formattedTopics}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={() => getRandomColor()}
        onWordClick={(e, d) => {
          router.push("/quiz?topic=" + d.text);
        }}
      />
    </>
  );
};
export default CustomHotTopic;
