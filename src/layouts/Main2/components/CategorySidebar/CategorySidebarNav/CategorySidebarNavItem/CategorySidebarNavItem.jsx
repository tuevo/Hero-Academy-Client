/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import { ButtonBase, Collapse, colors, Grid, List, ListItem, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  button: {
    color: colors.blueGrey[800],
    padding: theme.spacing(1, 2),
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  item: {
    fontWeight: 'bold'
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const CategorySidebarNavItem = props => {
  const { data } = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <Grid container alignItems="center">
          <Grid item xs={10}>
            <Typography variant="body1">{data.name}</Typography>
          </Grid>
          <Grid item xs={2}>
            {open ? <ExpandMore fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
          </Grid>
        </Grid>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {(data.categories || []).map(c => (
            <ListItem
              className={classes.nested}
              disableGutters
              key={c._id}
            >
              <ButtonBase
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                to={c.href}
              >
                <Typography
                  variant="body2"
                >
                  {c.name}
                </Typography>
              </ButtonBase>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
};

CategorySidebarNavItem.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired
};

export default CategorySidebarNavItem;
