import {onMounted, onUnmounted, ref} from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface CountdownData {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  dayLabel: string;
  hourLabel: string;
  minuteLabel: string;
  secondLabel: string;
}

export function useCountdown(startTime: string): CountdownData {
  const days = ref(0);
  const hours = ref("00");
  const minutes = ref("00");
  const seconds = ref("00");

  const dayLabel = ref("дней");
  const hourLabel = ref("часов");
  const minuteLabel = ref("минут");
  const secondLabel = ref("секунд");

  let intervalId: number | undefined;

  const getWordForm = (number: number, forms: [string, string, string]): string => {
    number = Math.abs(number) % 100;
    const lastDigit = number % 10;
    if (number > 10 && number < 20) return forms[2];
    if (lastDigit > 1 && lastDigit < 5) return forms[1];
    if (lastDigit === 1) return forms[0];
    return forms[2];
  };

  const updateTime = () => {
    const endDate = dayjs(startTime);
    const now = dayjs();
    const diffMs = endDate.diff(now);

    if (diffMs <= 0) {
      days.value = 0;
      hours.value = "00";
      minutes.value = "00";
      seconds.value = "00";
      if (intervalId) clearInterval(intervalId);
      return;
    }

    const diffDuration = dayjs.duration(diffMs);

    const d = Math.floor(diffDuration.asDays());
    const h = diffDuration.hours();
    const m = diffDuration.minutes();
    const s = diffDuration.seconds();

    days.value = d;
    hours.value = h.toString().padStart(2, "0");
    minutes.value = m.toString().padStart(2, "0");
    seconds.value = s.toString().padStart(2, "0");

    dayLabel.value = getWordForm(d, ["день", "дня", "дней"]);
    hourLabel.value = getWordForm(h, ["час", "часа", "часов"]);
    minuteLabel.value = getWordForm(m, ["минута", "минуты", "минут"]);
    secondLabel.value = getWordForm(s, ["секунда", "секунды", "секунд"]);
  };

  onMounted(() => {
    updateTime();
    intervalId = window.setInterval(updateTime, 1000);
  });

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
  });

  return {
    days,
    hours,
    minutes,
    seconds,
    dayLabel,
    hourLabel,
    minuteLabel,
    secondLabel,
  };
}
