import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
    marginBottom: '20px',
    background: theme.palette.type === 'dark' ? grey[700] : grey[200],
  },
  image: {
    width: 254,
    height: 254,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  fullHeight: {
    minHeight: '100vh',
    maxWidth: '1200px',
  },
  paperFull: {
    textAlign: '-webkit-center',
  },
  testClass: {
    fontSize: '32px',
  },
  header: {
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  taskTracker: {
    flexGrow: 1,
  },
  taskPaper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    background: theme.palette.type === 'dark' ? grey[700] : grey[200],
  },
  trackerTitle: {
    textDecoration: 'underline',
    textDecorationColor: theme.palette.primary.main,
    marginBottom: '0px',
    alignSelf: 'center',
  },
  taskTitleGrid: {
    margin: '5px',
    padding: '0 10px',
  },
  task: {
    margin: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  reminder: {
    borderLeft: '5px solid green',
  },
  flexSb: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // ADD Form
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  flexForm: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  addTask: {
    margin: '5px',
    padding: '10px 20px',
  },
}));

export default useStyles;
