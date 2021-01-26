import { Accordion, AccordionDetails, AccordionSummary, Box, Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AddCategory, AddCategoryCluster, CategoryDetails, CategoryMenu } from './components';
import UpdateCategory from './components/UpdateCategory/UpdateCategory';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '33rem',
    width: '100%'
  },
  categoryCluster: {
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    borderRadius: 5,
    marginTop: theme.spacing(1)
  },
  categoryList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
  },
  categoryList__container: {
    maxHeight: '18.75rem',
    overflow: 'scroll'
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
  const [expandedCategoryClusterIndex, setExpandedCategoryClusterIndex] = useState(0);
  const [openCategoryDetails, setOpenCategoryDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
  const [openRemoveCategoryConfirmDialog, setOpenRemoveCategoryConfirmDialog] = useState(false);

  const categoryClusters = [
    {
      _id: '1',
      name: 'Công nghệ thông tin',
      categories: [
        {
          _id: '1.1',
          name: 'Lập trình web',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '1.2',
          name: 'Lập trình di động',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '1.3',
          name: 'Lập trình game',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    },
    {
      _id: '2',
      name: 'Thiết kế',
      categories: [
        {
          _id: '2.1',
          name: 'Đồ họa',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '2.2',
          name: 'Nội thất',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '2.3',
          name: 'Thời trang',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    },
    {
      _id: '3',
      name: 'Quản trị kinh doanh',
      categories: [
        {
          _id: '3.1',
          name: 'Lập trình web',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '3.2',
          name: 'Lập trình di động',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '3.3',
          name: 'Lập trình game',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    },
    {
      _id: '4',
      name: 'Digital Marketing',
      categories: [
        {
          _id: '4.1',
          name: 'Lập trình web',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '4.2',
          name: 'Lập trình di động',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '4.3',
          name: 'Lập trình game',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    },
    {
      _id: '5',
      name: 'Ngoại ngữ',
      categories: [
        {
          _id: '5.1',
          name: 'Tiếng Anh',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '5.2',
          name: 'Tiếng Trung',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '5.3',
          name: 'Tiếng Nhật',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          _id: '5.4',
          name: 'Tiếng Pháp',
          href: '/khoa-hoc-thuoc-linh-vuc',
          numberOfCourses: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    },
  ];

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

  const handleCloseUpdateCategory = (accepted, newCategoryName) => {
    setOpenUpdateCategory(false);
    console.log(accepted);
    console.log(newCategoryName);
  }

  const handleCloseRemoveCategoryConfirmDialog = (accepted) => {
    setOpenRemoveCategoryConfirmDialog(false);
    console.log(accepted);
  }

  return (
    <Box p={4} pt={6} className={classes.root}>
      <Box mb={3}>
        <AddCategoryCluster />
      </Box>
      {categoryClusters.map((cc, i) => (
        <Accordion
          key={cc._id}
          className={`${classes.categoryCluster} animate__animated animate__fadeIn`}
          style={{ animationDelay: `${0.2 * i}s` }}
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
                <AddCategory />
              </Box>
              <List className={classes.categoryList}>
                <PerfectScrollbar className={classes.categoryList__container}>
                  {cc.categories.map(c => (
                    <ListItem key={c._id} onClick={() => handleClickCategory({ ...c, categoryCluster: cc })}>
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
                </PerfectScrollbar>
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box pt={3}>
        <Button
          fullWidth
          className={classes.btnLoadMoreCategoryCluster}
          variant="contained"
          size="large"
          color="primary"
        >
          Xem thêm nhóm lĩnh vực
        </Button>
      </Box>

      {selectedCategory && (
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
      )}

    </Box>
  )
}
