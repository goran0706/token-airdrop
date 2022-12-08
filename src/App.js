import "./App.css";
import { ColorSchemeProvider, MantineProvider, Container } from "@mantine/core";
import Header from "./components/Header";
import AirdropDetails from "./components/AirdropDetails";
import useLocalStorageState from "./hooks/useLocalStorageState";
import Countdown from "./components/Countdown";

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorageState("theme", "light");

  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Container fluid>
          <Header />
          <AirdropDetails />
          <Countdown />
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
