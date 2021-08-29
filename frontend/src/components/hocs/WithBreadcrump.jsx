import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

function WithBreadcrump(Component, breadItems) {
  return function Wrapped() {
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          {breadItems.map((el, i) => {
            const curLing = breadItems.slice(0, i + 1).join('/');
            return (
              <Breadcrumb.Item>
                <Link to={`/${curLing}`}>{el}</Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
        <Component />
      </>
    );
  };
}

export default WithBreadcrump;
