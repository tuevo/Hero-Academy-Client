import { useEffect } from 'react';
import PropTypes from 'prop-types';

const PageWithTitle = (props) => {
  useEffect(() => {
    document.title = (props.title || '') + " | Hero Academy";
  }, [props.title])

  return props.children;
};

PageWithTitle.propTypes = {
  title: PropTypes.string
};

export default PageWithTitle;