import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { PowerSettingsNewOutlined } from '@material-ui/icons';
import './styles.css';
import { removeToken } from '../../Utils/storage';

const Order = (props) => {
  const { setIsLoggedin } = props;
  const onLogout = () => {
    removeToken();
    setIsLoggedin(false);
  };
  return (
    <Grid container justifyContent="center" className="container">
      <Grid item xs={12}>
        <Button color="primary" variant="contained" onClick={onLogout} style={{ marginTop: 8 }}>
          <PowerSettingsNewOutlined sx={{ color: '#fff' }} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Order;
