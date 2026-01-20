import useScreenSize from "../../hooks/useScreenSize";

interface TruncateTextProps {
  text: string;
  maxLength: number;
  widthToShowFull: number;
  className?: string;
}

const TruncateText = ({
  text,
  className,
  maxLength,
  widthToShowFull,
}: TruncateTextProps) => {
  const showFull: boolean = useScreenSize().width >= widthToShowFull;
  const displayText: string = showFull
    ? text
    : text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;

  return (
    <p
      className={`${className} break-words overflow-hidden text-ellipsis max-w-full`}
      title={text}
    >
      {displayText}
    </p>
  );
};

export default TruncateText;
