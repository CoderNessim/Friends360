import classes from './Sidebar.module.css';

function Nav({ children }) {
  return <nav className={classes.navbar}>{children}</nav>;
}

export default Nav;
