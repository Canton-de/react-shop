import { SyncOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from './loader.module.scss';

const loaderIcon = <SyncOutlined style={{ fontSize: 60 }} spin />;
export default function Loader() {
  return <Spin className={styles.spin} indicator={loaderIcon} />;
}
