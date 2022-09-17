import HealthRatingBar from '../components/HealthRatingBar';
import { Entry, Diagnosis } from '../types';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box } from '@material-ui/core';

const NewEntry = ({ entry, diagnosis }: { entry: Entry, diagnosis: { [code:string]: Diagnosis } }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Box sx={{
          border: '1px solid grey',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10
        }}>
          <Grid container mb={2}>
            <CalendarTodayIcon/>
            <Typography ml={1}>{entry.date}</Typography>
          </Grid>
          <Typography>{entry.description}</Typography>
          <ul>
            { entry.diagnosisCodes && entry.diagnosisCodes.map((code) => 
            <li key={code}>{diagnosis[code].name} ({code})</li>) }
          </ul>
          <Typography mt={1}>Diagnose by {entry.specialist}</Typography>
        </Box>  
      );
     case "OccupationalHealthcare": 
      return (
        <Box sx={{
          border: '1px solid grey',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10
        }}>
          <Grid container mb={2}>
            <CalendarTodayIcon/>
            <Typography ml={1}>{entry.date}</Typography>
          </Grid>
          <Typography>{entry.description}</Typography>
          <ul>
            { entry.diagnosisCodes && entry.diagnosisCodes.map((code) => 
            <li key={code}>{diagnosis[code].name} ({code})</li>) }
          </ul>
          <Typography mt={1}>Diagnose by {entry.specialist}</Typography>
        </Box>  
      );
    case "HealthCheck": 
      return (
        <Box sx={{
          border: '1px solid grey',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10
        }}>
          <Grid container>
            <CalendarTodayIcon/>
            <Typography ml={1}>{entry.date}</Typography>
          </Grid>
          <Typography>{entry.description}</Typography>
          <ul>
            { entry.diagnosisCodes && entry.diagnosisCodes.map((code) => 
            <li key={code}>{diagnosis[code].name} ({code})</li>) }
          </ul>
          <div>
            <Typography>Health Rating: </Typography> 
            <HealthRatingBar rating={entry.healthCheckRating} showText={true}/>
          </div>
          <Typography mt={1}>Diagnose by {entry.specialist}</Typography>
        </Box>  
      );
    default:
      return assertNever(entry);
  }
};

export default NewEntry;