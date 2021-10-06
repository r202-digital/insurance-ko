import React from "react";

// material-ui
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, StyledEngineProvider } from "@material-ui/core";

// project imports
import { theme } from "lib/material-themes";
import MainLayout from "./MainLayout";
import { customization } from "./customization";

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const ProfileLayout = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        <MainLayout>{children}</MainLayout>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ProfileLayout;
