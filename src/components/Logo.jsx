import { Anchor, createStyles, Group, Title } from "@mantine/core";
import PropTypes from "prop-types"; // ES6

const useStyles = createStyles((theme) => ({
  label: {
    background:
      theme.colorScheme === "dark"
        ? theme.fn.linearGradient(35, "#ed6ea0", "#ec8c69")
        : theme.fn.linearGradient(35, "#11a0f8", "#c72dd6"),
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
}));

export default function Logo({ href = "/", src, alt, label }) {
  const { classes } = useStyles();

  return (
    <Group>
      <Anchor href={href}>
        <img src={src} alt={alt} />
      </Anchor>
      <Title className={classes.label}>{label}</Title>
    </Group>
  );
}

Logo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  label: PropTypes.string,
};
