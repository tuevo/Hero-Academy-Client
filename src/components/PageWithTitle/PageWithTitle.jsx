import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { APP_NAME } from 'constants/global.constant';

const PageWithTitle = (props) => {
  useEffect(() => {
    document.title = (props.title || '') + ` | ${APP_NAME}`;
  }, [props.title])

  return props.children;
};

PageWithTitle.propTypes = {
  title: PropTypes.string
};

export default PageWithTitle;