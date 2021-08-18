import React, { useState } from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import './styles.css';
import Api from '../../Api';

const Login = () => {
  const [data, setData] = useState({
    email: { value: '', error: false },
    password: { value: '', error: false },
  });
  const onSubmit = () => {
    setData((state) => ({
      ...state,
      email: {
        ...state.email,
        error: !data.email.value,
      },
      password: {
        ...state.password,
        error: !data.password.value,
      },
    }));
    if (data.password.value && data.email.value) {
      Api.Auth.Login({
        email: data.email.value,
        password: data.password.value,
      })
        .then((res) => console.log('check00: ', res))
        .catch((err) => console.log('check01: ', err));
    }
  };
  const handleChange = (type, value) => {
    if (type === 'email') {
      setData((state) => ({
        ...state,
        email: {
          ...state.email,
          value,
        },
      }));
    }
    if (type === 'password') {
      setData((state) => ({
        ...state,
        password: {
          ...state.password,
          value,
        },
      }));
    }
  };
  return (
    <Grid container alignItems="center" justifyContent="center" className="container">
      <Grid item xs={11} sm={10} md={8}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h3" align="center" style={{ color: '#fff' }}>
              Order Logger
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3} className="wrapper">
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      error={data.email.error}
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      size="small"
                      variant="outlined"
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={data.password.error}
                      required
                      fullWidth
                      label="Password"
                      name="password"
                      size="small"
                      type="password"
                      variant="outlined"
                      onChange={(e) => handleChange('password', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" fullWidth type="submit" variant="contained" onClick={onSubmit}>
                  Log in
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
