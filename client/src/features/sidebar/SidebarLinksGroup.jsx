import { Stack } from "@mantine/core";
import classes from "./Sidebar.module.css";

function SidebarLinksGroup({links}) {
  return (
    <div className={classes.navbarMain}>
      <Stack justify="center" gap={0}>
        {links}
      </Stack>
    </div>
  );
}

export default SidebarLinksGroup;
