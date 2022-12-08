import {
  Text,
  Group,
  Center,
  createStyles,
  UnstyledButton,
  useMantineColorScheme,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 1000,
    paddingLeft: 4,
    paddingRight: 4,
    height: 36,
  },
  iconWrapper: {
    height: 28,
    width: 28,
    borderRadius: 28,
    backgroundImage:
      theme.colorScheme === "dark"
        ? theme.fn.linearGradient(35, "#ed6ea0", "#ec8c69")
        : theme.fn.linearGradient(35, "#11a0f8", "#c72dd6"),
    color: theme.white,
  },
  label: {
    lineHeight: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
}));

export default function ButtonToggler() {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const Icon = colorScheme === "dark" ? IconSun : IconMoon;
  const theme = () =>
    `${upperFirst(colorScheme === "light" ? "dark" : "light")} theme`;

  return (
    <Group position="center" my="xl">
      <UnstyledButton
        aria-label="Toggle theme"
        className={classes.control}
        onClick={() => toggleColorScheme()}
      >
        <Text size="sm" className={classes.label}>
          {theme()}
        </Text>
        <Center className={classes.iconWrapper}>
          <Icon size={18} stroke={1.5} />
        </Center>
      </UnstyledButton>
    </Group>
  );
}
