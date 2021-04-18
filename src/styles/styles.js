import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
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
    background: grey[200],
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
