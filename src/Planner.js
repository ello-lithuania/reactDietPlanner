import React, { useState } from 'react'
import Draggable from 'react-draggable';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import KitchenIcon from '@material-ui/icons/Kitchen';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    formControl: {
        width: '100%',
        marginTop: '.7rem',
    },
    smallerSide: {
        '& .MuiPaper-elevation1': {
            height: '100vh',
            padding: '0 .8rem'
        },
        '& h1': {
            fontSize: '1.3rem',
            padding: '1.2rem 0'
        },
        '& .topButtons': {
            marginTop: '1rem',
            borderTop: '2px solid rgb(102, 102, 102)',
            '& button': {
                padding: '.3rem 0',
                marginRight: '.5rem'
            }
        },
        '& .menuItemActive': {
            color: 'rgb(151, 117, 53)',
        }
    },
    media: {
        height: 140,
    },
    recipeInfo: {
        marginTop: '1rem',
        padding: '0 !important', 
        height: 'auto !important',
        '& .MuiCardContent-root': {
            padding: 0,
            textAlign: 'center'
        },
        '& h2': {
            margin: '.4rem 0'
        }
    },
    dateTop: {
        backgroundColor: 'rgb(102, 102, 102)',
        color: 'white',
        padding: '.35rem .6rem'
    }
}));

const Planner = ({cookbooks, setCookbook, recipes, setRecipes, sections, setAddSection}) => {
    const classes = useStyles();
    const [miniMenuItem, setMiniMenuItem] = useState('cookbook');
    const [week,setWeek] = useState(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']);
    const [selectedCookbook, setSelectedCookbook] = useState(cookbooks[0].id);
    const [today, setToday] = useState(new Date().getDate());
    const [currentMonth, setCurrentMonth] = useState();
    const [displayPeriod, setDisplayPeriod] = useState('Week');
    const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    const d = new Date();

    const [firstDay, setFirstDay] = useState('Monday');

    const chosenSections = sections.filter((el) => el.id == selectedCookbook);

    const [chosenSection, setChosenSection] = useState(chosenSections.length == 0 ? '140' : chosenSections[0].sectionId);
    const chosenRecipes = recipes.filter((item) => item.sectionId == chosenSection);

    const handleChange = (event) => {
        setSelectedCookbook(event.target.value);
    };

    const changeMenuItem = (item) => {
        setMiniMenuItem(item);
    }

    const handleChangeSection = (event) => {
        setChosenSection(event.target.value);
    };
    const handleChangeWeekStart = (event) => {
        setFirstDay(event.target.value);
    }
    return (
        <div>
            <Grid container spacing={0}>   
                <Grid item xs={3} className={classes.smallerSide}>
                    <Paper>
                        <Typography variant="h1">Meal Planner</Typography>
                        <div className="topButtons">
                            <Button onClick={() => changeMenuItem('cookbook')} className={miniMenuItem === 'cookbook' && 'menuItemActive'}>Cookbooks</Button>
                            <Button onClick={() => changeMenuItem('search')} className={miniMenuItem == 'search' && 'menuItemActive'}>Search</Button>
                        </div>
                        {miniMenuItem == 'search' && ('search')}

                        {miniMenuItem == 'cookbook' && (
                            <>
                            <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedCookbook}
                                onChange={handleChange}
                            >
                                {cookbooks.map((item) => {
                                    return(<MenuItem value={item.id}>{item.name}</MenuItem>);
                                })}
                            </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={chosenSection}
                                onChange={handleChangeSection}
                            >
                            {chosenSections.length !==0 ? chosenSections.map((item) => {
                                return(<MenuItem value={item.sectionId}>{item.sectionName}</MenuItem>);
                            }) : (
                                <MenuItem value="140">Create New Section</MenuItem>
                            )}
                            </Select>
                            </FormControl>

                            {chosenRecipes.map((item) => (
                            <Draggable>      
                            <Card className={classes.recipeInfo}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.media}
                                image="https://www.eatwell101.com/wp-content/uploads/2019/04/chicken-and-asparagus-skillet-recipe-2.jpg"
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.title}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            </Card>
                            </Draggable> 
                            ))}
                            </>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Grid container spacing={0} className={classes.rightTopContainer}>
                        <Grid item xs={1}>
                            <Button>Today</Button>
                        </Grid>
                        <Grid item xs={5}>
                            <Button><NavigateBeforeIcon/></Button>
                            <Button><NavigateNextIcon/></Button>
                            <Button>{monthNames[d.getMonth()]}</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button><KitchenIcon/></Button>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Display</InputLabel>
                                <Select
                                native
                                value=""
                                onChange={handleChange}
                                label="Display"
                                inputProps={{
                                    name: 'age',
                                    id: 'outlined-age-native-simple',
                                }}
                                >
                                <option value="Week">Week</option>
                                <option value="Month">Month</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Start of the week</InputLabel>
                                <Select
                                native
                                value={firstDay}
                                onChange={handleChangeWeekStart}
                                label="Start of the week"
                                inputProps={{
                                    name: 'age',
                                    id: 'outlined-age-native-simple',
                                }}
                                >
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        {week.map((item) => (
                        <Grid item xs className={classes.dateTop}>
                            <Typography>{item}</Typography>
                        </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Planner
