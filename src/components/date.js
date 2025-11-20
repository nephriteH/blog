import { parseISO, format } from "date-fns";
import styles from "./date.module.scss";
export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time
      className={styles.time}
      dateTime={dateString}>
      {format(date, "yyyy年MM月dd日")}
    </time>
  );
}
