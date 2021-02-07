import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Card, CardActionArea, Grid, CardContent, CardMedia, Box } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { format } from 'timeago.js';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as moment from 'moment';

const useStyles = makeStyles(theme => ({
  videoList: {
    maxHeight: '28.125rem',
    overflow: 'scroll'
  },
  videoListItem: {
    width: '18.75rem',
    height: '5.625rem',
    marginBottom: theme.spacing(1),
    boxShadow: 'none',
    backgroundColor: theme.palette.background.default,
    borderRadius: 5
  },
  videoListItem__thumbnailContainer: {
    position: 'relative',
    height: '5.625rem'
  },
  videoListItem__thumbnail: {
    height: '100%'
  },
  videoListItem__duration: {
    position: 'absolute',
    bottom: '6%',
    right: '4%',
    padding: theme.spacing(0.25, 0.5),
    color: '#fff',
    backgroundColor: '#1d1d1d',
    fontWeight: 'bold',
    borderRadius: '0.25rem',
    fontSize: '0.6875rem'
  },
  videoListItem__details: {
    padding: theme.spacing(1)
  },
}))

export default function WatchHistory({ data, open, onClose, onClickVideo }) {
  const classes = useStyles();

  const videos = [
    {
      _id: 1,
      title: 'JSX là gì?',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://i.morioh.com/200626/3c53255f.jpg',
      updatedAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 1,
        title: 'Giới thiệu tổng quan'
      }
    },
    {
      _id: 2,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 1,
        title: 'Giới thiệu tổng quan'
      }
    },
    {
      _id: 3,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 1,
        title: 'Giới thiệu tổng quan'
      }
    },
    {
      _id: 4,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 2,
        title: 'Component, Prop, State'
      }
    },
    {
      _id: 5,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 2,
        title: 'Component, Prop, State'
      }
    },
    {
      _id: 6,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 2,
        title: 'Component, Prop, State'
      }
    },
    {
      _id: 7,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 3,
        title: 'React Hooks'
      }
    },
    {
      _id: 8,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 3,
        title: 'React Hooks'
      }
    },
    {
      _id: 9,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 3,
        title: 'React Hooks'
      }
    },
    {
      _id: 10,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 3,
        title: 'React Hooks'
      }
    },
    {
      _id: 11,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 3,
        title: 'React Hooks'
      }
    },
    {
      _id: 12,
      title: 'Khái niệm Single Page Application',
      url: 'https://www.youtube.com/watch?v=7zHaB7V5_pc&list=PLeS7aZkL6GOsPo-bFZSNuu4VhYicRjlAq',
      thumbnailUrl: 'https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png',
      createdAt: new Date('2021-01-09T16:59:58.031Z'),
      numberOfView: 1500,
      duration: 1000 * 60 * 5 + 1000 * 30,
      chapter: {
        _id: 3,
        title: 'React Hooks'
      }
    }
  ]

  const handleClose = () => {
    onClose(false);
  }

  const handleClickVideo = (video) => {
    onClickVideo(video);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Lịch sử theo dõi video</DialogTitle>
      <DialogContent>
        <Box py={2}>
          <Timeline>
            <PerfectScrollbar className={classes.videoList}>
              {videos.map((video, i) => (
                <TimelineItem key={i}>
                  <TimelineOppositeContent>
                    <Typography color="textSecondary" variant="body2">{format(video.createdAt, 'vi')}</Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Card key={video._id} className={classes.videoListItem} onClick={() => handleClickVideo(video)}>
                      <CardActionArea style={{ height: '100%' }}>
                        <Grid container style={{ height: '100%' }}>
                          <Grid item xs={5}>
                            <div className={classes.videoListItem__thumbnailContainer}>
                              <CardMedia
                                className={classes.videoListItem__thumbnail}
                                image={video.thumbnailUrl}
                                title="Contemplative Reptile"
                              />
                              <Typography variant="body2" className={classes.videoListItem__duration}>
                                {moment.utc(video.duration).format('mm:ss')}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item xs={7}>
                            <CardContent className={classes.videoListItem__details}>
                              <Typography gutterBottom variant="h6"><b>{video.title}</b></Typography>
                              <Typography variant="body2">{video.chapter.title}</Typography>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </CardActionArea>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </PerfectScrollbar>
          </Timeline>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
