// React Elements
import { FC } from "react";
import { ColorModeContext } from "./helper/Context";

// MUI Elements
import { ThemeProvider } from "@mui/material";

// Types
import { Home } from "./pages/Home";

// Tanstack Query Elements
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDynamicTheme } from "./helper/hooks";
const queryClient = new QueryClient();

const App: FC = () => {

  const [theme, colorMode] = useDynamicTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
