import React from "react";
import { AppProvider } from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import Routes from "./routes/routes";
import AppLayout from "./layout/AppLayout";

const App = () => {
  return (
    <AppProvider i18n={en}>
      <AppLayout>
        <Routes />
      </AppLayout>
    </AppProvider>
  );
};

export default App;
