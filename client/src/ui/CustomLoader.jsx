import { Loader } from '@mantine/core';
import styles from './CustomLoader.module.css';

function CustomLoader({ size }) {
  return (
    <div className={styles.loader}>
      <Loader size={size} />
    </div>
  );
}

export default CustomLoader;
