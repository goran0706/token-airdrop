import { useMemo } from "react";
import { Center, createStyles } from "@mantine/core";
import jazzicon from "@metamask/jazzicon";
import PropTypes from "prop-types";

const useStyles = createStyles(() => ({
  iconWrapper: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
}));

const Identicon = ({ size, seed }) => {
  const { classes } = useStyles();

  const icon = useMemo(
    () => seed && jazzicon(size, parseInt(seed.slice(2, 10), 16)),
    [size, seed]
  );

  return (
    <Center
      className={classes.iconWrapper}
      dangerouslySetInnerHTML={{ __html: icon?.outerHTML }}
    />
  );
};

export default Identicon;

Identicon.propTypes = {
  size: PropTypes.number,
  seed: PropTypes.string,
};
