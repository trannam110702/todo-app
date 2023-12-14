import { TopBar, Icon, Frame, Text } from "@shopify/polaris";
import { ArrowLeftMinor, QuestionMarkMajor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import "./style.css";
function AppLayout({ children }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);
  const logo = {
    topBarSource: "https://cdn1.avada.io/logo/avada_logo_final_color.png",
    width: 86,
    url: "#",
    accessibilityLabel: "Shopify",
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{ content: "Back to Shopify", icon: ArrowLeftMinor }],
        },
        {
          items: [{ content: "Community forums" }],
        },
      ]}
      name="Dharma"
      detail="Jaded Pixel"
      initials="D"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return (
    <Frame topBar={topBarMarkup} logo={logo}>
      {children}
    </Frame>
  );
}
export default AppLayout;
