import { parse } from "tinyduration";

const pad = (num: number) => num.toString().padStart(2, "0");

// 解析 ISO 8601 时长 (PT#H#M#S) -> hh:mm:ss 或 mm:ss
export const parseISODuration = (duration: string) => {
  const data = parse(duration);

  const hours = data.hours || 0;
  const minutes = data.minutes || 0;
  const seconds = data.seconds || 0;

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    return `${minutes}:${pad(seconds)}`;
  }
};
