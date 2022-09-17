import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import Career from "./pages/career";
import { useEffect, useState } from "react";
import { Home2, Run, UserOff } from 'tabler-icons-react';
import { Container, Stack, Anchor, Group, Drawer, Burger, Divider } from '@mantine/core';

function getLocalStorageOrDefault(key, defaultValue) {
  const stored = localStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

function App() {

  const [user, setUser] = useState(getLocalStorageOrDefault("user", null));

  const [activePage, setActivePage] = useState(getLocalStorageOrDefault("activePage", "authScreen"));

  const [opened, setOpened] = useState(false);

  const goHome = () => {
    localStorage.setItem("activePage", JSON.stringify("authScreen"));
    window.location.reload(false);
    setOpened(false);
  }

  const goCareer = () => {
    localStorage.setItem("activePage", JSON.stringify("career"));
    window.location.reload(false);
    setOpened(false);
  }

  const Logout = () => {
    localStorage.clear();
    window.location.reload(false);
  }



  return (
    <>
      <Container className="main-app">
        {/* Header */}
        {user &&
          <Container className="container-nav">
            <div class="nav-bar-desktop">
              <Group spacing="xl">
                <Group spacing="xs">
                  <Home2 size={24} />
                  <Anchor onClick={()=>goHome()}>Home</Anchor>
                </Group>
                <Group spacing="xs">
                  <Run size={24} />
                  <Anchor onClick={()=>goCareer()}>Career</Anchor>
                </Group>
                <Group spacing="xs">
                  <UserOff size={24} />
                  <Anchor onClick={()=>Logout()}>Logout</Anchor>
                </Group>
              </Group>
            </div>
            <div class="nav-bar-mobile">
              <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                padding="xl"
                size="sm"
                position="right"
              >
                {<>
                  <Stack spacing="md">
                    <Group spacing="xs">
                      <Home2 size={24} />
                      <Anchor className="anchor-header" onClick={()=>goHome()}>Home</Anchor>
                    </Group>
                    <Group spacing="xs">
                      <Run size={24} />
                      <Anchor className="anchor-header" onClick={()=>goCareer()}>Career</Anchor>
                    </Group>
                    <Group spacing="xs">
                      <UserOff size={24} />
                      <Anchor className="anchor-header" onClick={()=>Logout()}>Logout</Anchor>
                    </Group>
                  </Stack>
                </>}
              </Drawer>
              <Burger
                opened={opened}
                color="black"
                onClick={() => setOpened((o) => !o)}
              />
            </div>
            <Divider color="dark" style={{ width: "100%" }} />
          </Container>}

        {activePage === "authScreen" && !user && <Login />}
        {activePage === "authScreen" && user && <Home />}
        {activePage === "career" && user && <Career />}
      </Container>
    </>
  );
}
export default App;
