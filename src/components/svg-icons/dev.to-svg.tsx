import * as React from "react";
import { IconBaseProps } from "react-icons";

export default function devToSvg({ ...props }: IconBaseProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="dev.to"
      viewBox="0 0 512 512"
      {...props}
    >
      <rect width="512" height="512" rx="15%"></rect>
      <path
        fill="#fff"
        d="M140.47 203.94h-17.44v104.47h17.45c10.155-.545 17.358-8.669 17.47-17.41v-69.65c-.696-10.364-7.796-17.272-17.48-17.41m45.73 87.25c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H233.6v38.42h32.57v29.57H233.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z"
      ></path>
    </svg>
  );
}
