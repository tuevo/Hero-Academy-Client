import { Accordion, AccordionDetails, AccordionSummary, Box, Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AddCategory, AddCategoryCluster, CategoryDetails, CategoryMenu } from './components';
import UpdateCategory from './components/UpdateCategory/UpdateCategory';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';
import AddIcon from '@material-ui/icons/Add';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification, setAppCategoryClusterList } from 'redux/actions/app.action';
import { apiMessage } from 'constants/api-message.constant';
import { categoryClusterApi, categoryApi } from 'api';
import { availablePages } from 'constants/global.constant';
import { shallowEqual } from 'recompose';
import CourseListLoading from 'components/CourseListLoading/CourseListLoading';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '33rem',
    width: '100%'
  },
  categoryCluster: {
    backgroundColor: theme.palette.background.course,
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
    borderRadius: 5,
    marginBottom: theme.spacing(1)
  },
  categoryList: {
    width: '100%',
    backgroundColor: theme.palette.background.addCategory,
    borderRadius: 5,
    boxShadow: 'none'
  },
  categoryList__container: {
    // maxHeight: '18.75rem',
    // overflow: 'scroll'
  },
  icon: {
    color: theme.palette.icon
  },
  btnLoadMoreCategoryCluster: {
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  }
}));

export default function Categories() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const limit = 10;

  const appState = useSelector(state => ({
    ...state.app
  }), shallowEqual);

  const [expandedCategoryClusterIndex, setExpandedCategoryClusterIndex] = useState(null);
  const [openCategoryDetails, setOpenCategoryDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
  const [openRemoveCategoryConfirmDialog, setOpenRemoveCategoryConfirmDialog] = useState(false);
  const [openAddCategoryCluster, setOpenAddCategoryCluster] = useState(false);

  const [categoryClusterList, setCategoryClusterList] = useState([]);
  const [categoryClusterListLoading, setCategoryClusterListLoading] = useState(true);
  const [categoryClusterListPage, setCategoryClusterListPage] = useState(1);
  const [disableBtnLoadMoreCategoryCluster, setDisableBtnLoadMoreCategoryCluster] = useState(false);

  const getAllCategoryClusters = async (page, message) => {
    setDisableBtnLoadMoreCategoryCluster(true);
    try {
      const res = await categoryClusterApi.getAll(page, limit);
      const { entries } = res.data;

      const newCategoryClusterList = page === 1 ? entries : categoryClusterList.concat(entries);
      for (let cc of newCategoryClusterList) {
        cc.categories = cc.categories.map(c => ({
          ...c,
          href: availablePages.CATEGORY_COURSES.path.replace(':categoryId', c._id)
        }));
      }
      setCategoryClusterList(newCategoryClusterList);

      if (message === apiMessage.ADD_CATEGORY_CLUSTER_SUCCESSFULLY) {
        const newAppCategoryClusterList = [newCategoryClusterList[0], ...appState.categoryClusterList];
        dispatch(setAppCategoryClusterList(newAppCategoryClusterList));
      }

      if (newCategoryClusterList.length < res.data.meta.totalItems) {
        setDisableBtnLoadMoreCategoryCluster(false);
      }

      setCategoryClusterListLoading(false);
    } catch (error) {
      if (error.messages && error.messages.length > 0) {
        dispatch(showNotification('error', apiMessage[error.messages[0]]));
        setCategoryClusterListLoading(false);
      }
    }
  }

  useEffect(() => {
    getAllCategoryClusters(categoryClusterListPage);
  }, [categoryClusterListPage]);

  const handleClickCategoryCluster = (index) => {
    if (index === expandedCategoryClusterIndex)
      setExpandedCategoryClusterIndex(null);
    else
      setExpandedCategoryClusterIndex(index);
  }

  const handleClickCategory = data => {
    setSelectedCategory(data);
  }

  const handleClickCategoryMenu = (index) => {
    switch (index) {
      case 1:
        setOpenCategoryDetails(true);
        break;

      case 2:
        setOpenUpdateCategory(true);
        break;

      case 3:
        setOpenRemoveCategoryConfirmDialog(true);
        break;

      default:
        break;
    }
  }

  const handleCloseCategoryDetails = () => {
    setOpenCategoryDetails(false);
  }

  const handleCloseUpdateCategory = async (accepted, data) => {
    setOpenUpdateCategory(false);
    if (!accepted)
      return;

    try {
      const res = await categoryApi.update(selectedCategory._id, data);
      const index = categoryClusterList[expandedCategoryClusterIndex].categories
        .findIndex(c => c._id === selectedCategory._id);

      if (index >= 0) {
        categoryClusterList[expandedCategoryClusterIndex].categories[index] = res.data.category;
      }

      dispatch(showNotification('success', apiMessage[res.messages[0]]));
    } catch (error) {
      if (error.messages && error.messages.length > 0) {
        dispatch(showNotification('error', apiMessage[error.messages[0]]));
      }
    }
  }

  const updateSelectedCategoryCluster = () => {
    const newAppCategoryClusterList = appState.categoryClusterList.map(cc => {
      if (cc._id === categoryClusterList[expandedCategoryClusterIndex]._id)
        return { ...cc, categories: categoryClusterList[expandedCategoryClusterIndex].categories }

      return cc;
    });
    dispatch(setAppCategoryClusterList(newAppCategoryClusterList));
  }

  const handleCloseRemoveCategoryConfirmDialog = async (accepted) => {
    setOpenRemoveCategoryConfirmDialog(false);
    if (!accepted)
      return;

    try {
      const res = await categoryApi.delete(selectedCategory._id);
      categoryClusterList[expandedCategoryClusterIndex].categories = categoryClusterList[expandedCategoryClusterIndex].categories
        .filter(c => c._id !== selectedCategory._id);
      updateSelectedCategoryCluster();
      dispatch(showNotification('success', apiMessage[res.messages[0]]));
    } catch (error) {
      if (error.messages && error.messages.length > 0) {
        dispatch(showNotification('error', apiMessage[error.messages[0]]));
      }
    }
  }

  const handleClickBtnAddCategoryCluster = () => {
    setOpenAddCategoryCluster(true);
  }

  const handleCloseAddCategoryCluster = async (accepted, data) => {

    if (!accepted) {
      setOpenAddCategoryCluster(false);
      return;
    }

    try {
      const res = await categoryClusterApi.add(data);
      const message = apiMessage[res.messages[0]];
      setOpenAddCategoryCluster(false);
      dispatch(showNotification('success', message));
      setCategoryClusterListPage(1);
      getAllCategoryClusters(1, message);
    } catch (error) {
      if (error.messages && error.messages.length > 0) {
        dispatch(showNotification('error', apiMessage[error.messages[0]]));
      }
    }
  }

  const handleSubmitAddCategory = async (data) => {
    const categoryClusterId = categoryClusterList[expandedCategoryClusterIndex]._id;
    const params = {
      ...data,
      categoryClusterId: categoryClusterId
    };

    try {
      const res = await categoryApi.add(params);
      let { category } = res.data;
      category.href = availablePages.CATEGORY_COURSES.path.replace(':categoryId', category._id);
      categoryClusterList[expandedCategoryClusterIndex].categories.unshift(category);
      updateSelectedCategoryCluster();
      dispatch(showNotification('success', apiMessage[res.messages[0]]));
    } catch (error) {
      if (error.messages && error.messages.length > 0) {
        dispatch(showNotification('error', apiMessage[error.messages[0]]));
      }
    }
  }

  return (
    <Box p={4} pt={6} className={classes.root}>
      {categoryClusterListLoading && <CourseListLoading />}
      {!categoryClusterListLoading && categoryClusterList.length > 0 && (
        <div>
          <Box mb={3}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleClickBtnAddCategoryCluster}
            >
              Thêm nhóm lĩnh vực
            </Button>
            <AddCategoryCluster
              open={openAddCategoryCluster}
              onClose={handleCloseAddCategoryCluster}
            />
          </Box>
          {categoryClusterList.map((cc, i) => (
            <Accordion
              key={i}
              className={`${classes.categoryCluster} animate__animated animate__fadeIn`}
              style={{ animationDelay: `${0.1 * i}s` }}
              expanded={i === expandedCategoryClusterIndex}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={classes.icon} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => handleClickCategoryCluster(i)}
              >
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5" gutterBottom><b>{cc.name}</b></Typography>
                  <Typography variant="body1">
                    <NumberFormat value={cc.categories.length} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' lĩnh vực'} />
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column" style={{ width: '100%' }}>
                  <Box mb={2}>
                    <AddCategory onSubmit={handleSubmitAddCategory} />
                  </Box>
                  <List className={classes.categoryList}>
                    <PerfectScrollbar className={classes.categoryList__container}>
                      {cc.categories.map(c => (
                        <ListItem key={c._id} onClick={() => handleClickCategory({ ...c, categoryCluster: { name: cc.name } })}>
                          <Box display="flex" justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
                            <ListItemText
                              primary={(
                                <Typography variant="body1" gutterBottom>{c.name}</Typography>
                              )}
                              secondary={(
                                <NumberFormat value={c.numberOfCourses} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} suffix={' khóa học'} />
                              )} />
                            <CategoryMenu onClickList={handleClickCategoryMenu} />
                          </Box>
                        </ListItem>
                      ))}

                      {cc.categories.length === 0 && (
                        <Box p={2}>
                          <Typography variant="body2">Chưa có lĩnh vực nào.</Typography>
                        </Box>

                      )}
                    </PerfectScrollbar>
                  </List>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
          }

          <Box pt={3}>
            <Button
              fullWidth
              className={classes.btnLoadMoreCategoryCluster}
              variant="contained"
              size="large"
              color="primary"
              disabled={disableBtnLoadMoreCategoryCluster}
              onClick={() => setCategoryClusterListPage(categoryClusterListPage + 1)}
            >
              Xem thêm nhóm lĩnh vực
        </Button>
          </Box>

          {
            selectedCategory && (
              <div>
                <CategoryDetails
                  data={selectedCategory}
                  open={openCategoryDetails}
                  onClose={handleCloseCategoryDetails}
                />
                <UpdateCategory
                  data={selectedCategory}
                  open={openUpdateCategory}
                  onClose={handleCloseUpdateCategory}
                />
                <ConfirmDialog
                  title="Xác nhận"
                  content="Bạn thật sự muốn xóa lĩnh vực này?"
                  open={openRemoveCategoryConfirmDialog}
                  onClose={handleCloseRemoveCategoryConfirmDialog}
                />
              </div>
            )
          }
        </div>
      )}
    </Box>
  )
}
