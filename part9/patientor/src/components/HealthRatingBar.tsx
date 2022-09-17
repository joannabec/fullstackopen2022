import React from "react";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Grid, withStyles } from "@material-ui/core";
import { Typography } from '@mui/material';

type BarProps = {
  rating: number;
  showText: boolean;
};

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  return (
    <Grid container className="health-bar">
      <StyledRating
        readOnly
        value={4 - rating}
        max={4}
        icon={<FavoriteIcon fontSize="inherit" />}
      />

      {showText ? <Typography ml={1}>{HEALTHBAR_TEXTS[rating]}</Typography> : null}
    </Grid>
  );
};

export default HealthRatingBar;
