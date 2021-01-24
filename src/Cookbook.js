import React, {useState} from 'react'

import AddCookbook from './AddCookbook'
import RenameCookbook from './RenameCookbook'
import AddSection from './AddSection'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// expand
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//
// small menu item 
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import VideocamIcon from '@material-ui/icons/Videocam';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      '& .text-left': {
        justifyContent: 'unset',
        textAlign: 'left',
        marginLeft: '1.2rem'
      }, 
      '& .text-center': {
          textAlign: 'center',
      },
      '& .recipeInfo': {
        padding: '1rem 2rem',
        '& h1': {
            fontSize: '2rem',
            marginTop: '10%'
        },
        '& h2': {
            fontSize: '1.3rem'
        },
        '& h3': {
            fontSize: '1.2rem',
            margin: '1rem 0 2rem 0',
        }
      }
    },

    paper: {
      borderRadius: 0,
      color: theme.palette.text.secondary,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    logoTop: {
        textAlign: 'center',
        padding: '.7rem 0 0 0',
        '& img': {
            maxWidth: '80%'
        },
    },
    firstRow: {
        height: '100vh',
        overflow: 'hidden'
    },
    accordionDetails: {
        padding: 0,
        borderRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.12)',
        flexDirection: 'column'
    },
    addCookbookBtn: {
        fontWeight: '700',
        textTransform: 'capitalize',
        width: '100%',
        justifyContent: 'unset',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        paddingLeft: '1.2em',
        paddingTop: '.8rem',
        paddingBottom: '.8rem'
    },
    sections: {
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        height: '80vh',
    },
    addButton: {
        width: '100%',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        justifyContent: 'unset',
        textAlign: 'left',
        marginTop: '1rem',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    sectionNames: {
        width: '100%',
        textTransform: 'none',
        justifyContent: 'unset',
        textAlign: 'left',
        borderRadius: '0'
    },
    sectionNameChosen: {
        width: '100%',
        textTransform: 'none',
        justifyContent: 'unset',
        textAlign: 'left',
        backgroundColor: 'rgb(77, 88, 98)',
        color: 'white',
        borderRadius: '0',
        '&:hover': {
            backgroundColor: 'rgb(77, 88, 98)',
            color: 'white',
        }
    },
    addRecipe: {
        textAlign: 'center',
        position: 'relative',
        height: '100vh',
        '& img': {
            maxWidth: '80%'
        },
        '& .MuiFormControl-root': {
            width: '90%',
            marginBottom: '.7rem'
        },
        '& button': {
            width: '90%',
            border: '1px solid rgb(221, 227, 227)',
            marginBottom: '.7rem'
        },
        '& .half-buttons button': {
            width: '80%'
        }
    },
    recipePreview: {
        height: '100vh',
        '& h2': {
            borderTop: '1px solid rgb(221, 227, 227)',
            borderBottom: '1px solid rgb(221, 227, 227)',
            width: 'auto',
            display: 'inline-block',
            padding: '.4rem 1rem',
            fontWeight: '100'
        },
        '& h1': {
            textTransform: 'uppercase',
            borderBottom: '1px solid rgb(221, 227, 227)',
            margin: '0 auto',
            fontWeight: '300',
            color: 'black'
        }
    }
  }));

const Cookbook = ({cookbooks, setCookbook, recipes, setRecipes, sections, setAddSection}) => {
    const classes = useStyles();
    const [chosenOneCookbook, setChosenOneCookbook] = useState('1')
    const [accordionExpand,setAccordionExpand] = useState(false);
    const [addSectionVar, setAddSectionVar] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [renameCookbook, setRenameCookbook] = useState({ id: '', popup: 'false' });



    const [recipe_local, setRecipeLocal] = useState({});
    const [chosenRecipe,setChosenRecipe] = useState('');
    const [chosenSection,setAddChosenSection] = useState('');
    // add cookbook //
    const [openAddCookbook,setOpenAddCookbook] = useState(false);
    const [openAddRecipe,setOpenAddRecipe] = useState(false);

    const cookbookModal = () => {
        setOpenAddCookbook(!openAddCookbook);
    };
    //
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const chooseItem = (item) => {
        setChosenOneCookbook(item);
        changeExpand();
    }
    const changeExpand = () => {
        setAccordionExpand(!accordionExpand);
    }
    const renameFnc = (item) => {
        setRenameCookbook({ id: item, popup: true});
        setAnchorEl(null);
    }
    const deleteFnc = (element) => {
        setCookbook(cookbooks.filter(cookbook => cookbook.id !== element));
        setAnchorEl(null);
    }
    const chosenItem = cookbooks.filter(el => el.id == chosenOneCookbook);
    const chosenSections = sections.filter(el=> el.id == chosenOneCookbook);
    const chosenRecipes = recipes.filter(el=> el.sectionId == chosenSection);
    const chosenRecipePreview = recipes.filter(el=> el.id == chosenRecipe);
    const addSection = () => {
        setAddSectionVar(true);
    }
    const addRecipe = () => {
        setOpenAddRecipe(true);
        setChosenRecipe('');
    }
    const saveRecipe = () => {
        setOpenAddRecipe(false);
        setChosenRecipe(recipe_local.id);
        setRecipes([...recipes, recipe_local]);
        setRecipeLocal({});
    }
    const setRecipeList = (event) => {
        setRecipeLocal({...recipe_local,sectionId: chosenSection, id: Math.floor(Math.random() * 10), [event.target.name]:event.target.value});
    }
    return (
        <div>
            <div className={classes.root}>
                <Grid container spacing={0}>
                    
                    <Grid item xs={4}>
                        <Paper className={classes.paper,classes.firstRow}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} className={classes.logoTop}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png" alt="logo"/>
                                    <br/>
                                    <Typography variant="subtitle1">
                                        {recipes.length} / 25 Recipes
                                    </Typography>
                                    <Divider style={{marginTop: '.7rem'}}/>
                                </Grid>
                            </Grid>

                            {openAddRecipe == false ? (
                            <Grid container spacing={0}>                            
                                <Grid item xs={12}>
                                    <Accordion expanded={accordionExpand} style={{borderColor: 'rgba(0, 0, 0, 0.12', borderRadius: '0'}}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            onClick={changeExpand}
                                        >
                                            <Typography className={classes.heading}>{typeof chosenItem[0] !== 'undefined' ? chosenItem[0].name : 'Create new Cookbook'}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails className={classes.accordionDetails}>
                                        <br/>
                                            {cookbooks.map((item,index) => {
                                                return (
                                                    <>
                                                    <Button style={{textTransform: 'none'}} key={item.id}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={9} style={{textAlign: 'left', paddingLeft: '1.2rem'}}>
                                                                <Button onClick={() => chooseItem(item.id)} style={{width: '100%',justifyContent: 'unset',textAlign: 'left', textTransform: 'none'}}>
                                                                    {item.name}
                                                                </Button>
                                                            </Grid>
                                                            <Grid item xs={3} style={{textAlign: 'right', paddingRight: '1.2rem'}}>
                                                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                                                    <MoreVertIcon />
                                                                </Button>
                                                                <Menu
                                                                    id="simple-menu"
                                                                    anchorEl={anchorEl}
                                                                    keepMounted
                                                                    open={Boolean(anchorEl)}
                                                                    onClose={handleClose}
                                                                >
                                                                    <MenuItem onClick={()=> renameFnc(item.id)}>Rename</MenuItem>
                                                                    <MenuItem onClick={()=> deleteFnc(item.id)}>Delete</MenuItem>
                                                                </Menu>
                                                            </Grid>
                                                        </Grid>
                                                    </Button>
                                                    {cookbooks.length -1 !== index && (<Divider/>)}
                                                    </>
                                                );
                                            })}
                                            <Button className={classes.addCookbookBtn} onClick={cookbookModal}>Add Cookbook</Button>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                                <Grid item xs={5} className={classes.sections}>
                                    {(typeof chosenSections[0] !== 'undefined' || chosenSections[0] !== '0') && chosenSections.map(item => {
                                       return (
                                           <Button className={(item.sectionId == chosenSection) ? classes.sectionNameChosen : classes.sectionNames} onClick={()=> setAddChosenSection(item.sectionId)}>{item.sectionName}</Button>
                                        );
                                    })}
                                    <Button onClick={addSection} className={classes.addButton}>Add Section</Button>
                                </Grid>
                                <Grid item xs={7}>
                                    { chosenRecipes && (chosenRecipes.map(el=> {
                                        return(<Button onClick={()=> setChosenRecipe(el.id)} className={el.id == chosenRecipe ? classes.sectionNameChosen : classes.sectionNames}>{el.title}</Button>)
                                    }))}
                                    { chosenSection &&
                                        <Button onClick={addRecipe} className={classes.addButton}>Add Recipe</Button>
                                    }
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid item xs={12} className={classes.addRecipe}>
                                    <Grid container spacing={0} style={{ position: 'fixed', bottom: '0', width: 'auto'}}>
                                        <Grid item xs={4}>
                                            <Button onClick={()=> setOpenAddRecipe(false)} style={{border: '1px solid rgb(130, 64, 39)', width: '90%', margin:'1rem'}}>Cancel</Button>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Button onClick={saveRecipe} style={{border: '1px solid rgb(130, 64, 39)', color: 'white', backgroundColor: 'rgb(130, 64, 39)', width: '90%', margin:'1rem'}}>Add Recipe</Button>
                                        </Grid>
                                    </Grid>
                                <Grid item xs={12}>
                                    <h2 className={'text-left'}>Enter new recipe</h2>
                                    <TextField name="title" label="Title" onChange={setRecipeList}/>
                                    <br/>
                                    <Button><CreateIcon/> Add Ingredients</Button>
                                    <br/>
                                    <Button><CalendarViewDayIcon/> Add Steps</Button>
                                    <br/>
                                    <Grid container spacing={0} className={'half-buttons'}>
                                        <Grid item xs={6}>
                                            <Button><ImageIcon/> Add Image</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button><VideocamIcon/> Add Video</Button>
                                        </Grid>
                                    </Grid>
                                    <Button><AccessAlarmIcon/> Add Cooking Time</Button>
                                    <h3 className={'text-left'}>About the recipe</h3>
                                    <TextField label="description" name="description" onChange={setRecipeList} />
                                    <br/>
                                    <TextField label="source" name="source" onChange={setRecipeList} />
                                    <br/>
                                    <TextField label="url" name="url" onChange={setRecipeList} />
                                    <br/>
                                    <TextField label="yield" name="yield" onChange={setRecipeList} />
                                </Grid>
                            </Grid>
                        )}
                        </Paper>
                    </Grid>
                    <Grid item xs={8} className={classes.recipePreview}>
                        <Paper className={classes.paper} style={{height: '100vh'}}>
                            {openAddRecipe && (
                                <>
                                <div className={'recipeInfo'}>
                                    <div className={'text-center'}>
                                        <Typography variant="h2">Recipe preview</Typography>
                                    </div>
                                    <Typography variant="h1">{recipe_local.title}</Typography>
                                    <Typography variant="h3">{recipe_local.description}</Typography>
                                    <Typography variant="subtitle1">{recipe_local.source}</Typography>
                                    <Typography variant="subtitle2">{recipe_local.yield}</Typography>
                                </div>
                                </>
                            )}
                            { chosenRecipe && (
                                <>
                                <div className={'recipeInfo'}>
                                    <Typography variant="h1">{chosenRecipePreview[0].title}</Typography>
                                    <Typography variant="h3">{chosenRecipePreview[0].description}</Typography>
                                    <Button to={chosenRecipePreview[0].url}>{chosenRecipePreview[0].source}</Button>
                                    <Typography variant="subtitle2">{chosenRecipePreview[0].yield}</Typography>
                                </div>
                                </>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
                { openAddCookbook && <AddCookbook addCookBook={setCookbook} cookbookModal={cookbookModal} cookbooks={cookbooks} /> }
                { renameCookbook.popup !== 'false' && <RenameCookbook anchorEl={anchorEl} setRenameCookbook={setRenameCookbook} renameCookbook={renameCookbook} cookbooks={cookbooks} setCookbook={setCookbook}/> }    
                { addSectionVar && <AddSection setAddChosenSection={setAddChosenSection} setAddSection={setAddSection} sections={sections} cookbooks={cookbooks} setCookbook={setCookbook} setAddSectionVar={setAddSectionVar} chosenOneCookbook={chosenOneCookbook}/>}                      
            </div>
        </div>
    )
}

export default Cookbook
