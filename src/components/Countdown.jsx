import { createStyles, Text } from "@mantine/core";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  countdown: {
    background:
      theme.colorScheme === "dark"
        ? theme.fn.linearGradient(35, "#ed6ea0", "#ec8c69")
        : theme.fn.linearGradient(35, "#11a0f8", "#c72dd6"),
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    position: "absolute",
    bottom: 16,
    right: 16,
  },
}));

// Set the date we're counting down to
const COUNTDOWN = process.env.REACT_APP_AIRDROP_STARTS_AT;
const countDownDate = new Date(COUNTDOWN).getTime();

const Countdown = ({ _startsAt }) => {
  const { classes } = useStyles();
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Text italic weight="bold" className={classes.countdown}>
      Countdown:
      {seconds
        ? ` ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
        : null}
    </Text>
  );
};

export default Countdown;
