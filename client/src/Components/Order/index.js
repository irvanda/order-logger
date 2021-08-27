import React from 'react';
import { Grid, Button, Card, CardContent, Typography, Modal, TextField, InputAdornment } from '@material-ui/core';
import { PowerSettingsNewOutlined } from '@material-ui/icons';
import './styles.css';
import { removeToken } from '../../Utils/storage';
import formatNumber from '../../Utils/formatNumber';

const Order = (props) => {
  const { setIsLoggedin, productItems } = props;
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(undefined);
  const [selectedItems, setSeletedItems] = React.useState([]);
  const [qty, setQty] = React.useState(0);
  const [otherQty, setOtherQty] = React.useState('');
  const onLogout = () => {
    removeToken();
    setIsLoggedin(false);
  };

  const Clear = () => {
    setSelectedItem(undefined);
    setSeletedItems([]);
    setQty(0);
    setOtherQty('');
  };

  return (
    <>
      <Grid container justifyContent="center" className="container" spacing={3}>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" onClick={onLogout} style={{ marginTop: 8 }}>
            <PowerSettingsNewOutlined sx={{ color: '#fff' }} />
          </Button>
        </Grid>
        <Grid item xs={12} className="card-container">
          <Grid container justifyContent="center" spacing={3}>
            {productItems?.map((item) => {
              const item2 = selectedItems.find((i) => i._id === item._id);
              return (
                <Grid item xs={6} key={item._id}>
                  <Card
                    onClick={() => {
                      setSelectedItem(item);
                      setVisible(true);
                    }}
                    className="use-pointer"
                    style={
                      (selectedItem && selectedItem.name === item.name) || item2
                        ? { border: '4px solid green', borderRadius: 8 }
                        : { border: '4px solid grey', borderRadius: 8 }
                    }
                  >
                    <CardContent>
                      <Typography style={{ fontWeight: 600 }}>{`${item.name} ${
                        item2 ? `(x${item2.qty})` : ''
                      }`}</Typography>
                      <Typography>{`Rp ${formatNumber(item.price)}`}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button fullWidth color="secondary" variant="contained" onClick={() => console.log('button1')}>
                <Typography>Batal</Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth color="primary" variant="contained" onClick={() => console.log('button2')}>
                <Typography>Proses</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={visible} onClose={() => setVisible(false)}>
        <div className="modal-content">
          <Grid container justifyContent="center" style={{ marginBottom: 16 }} spacing={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Grid item key={i} xs={4}>
                <Button
                  fullWidth
                  style={
                    qty === i ? { height: 40, border: '2px solid green' } : { height: 40, border: '2px solid grey' }
                  }
                  variant="outlined"
                  onClick={() => {
                    setQty(i);
                    setOtherQty('');
                  }}
                >
                  <Typography>{i}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <TextField
                id="standard-start-adornment"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">Lebih:</InputAdornment>,
                }}
                onChange={(e) => {
                  setQty(parseInt(e.target.value, 10));
                  setOtherQty(e.target.value);
                }}
                value={otherQty}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                onClick={() => {
                  setVisible(false);
                  setQty(0);
                  setOtherQty('');
                }}
              >
                <Typography>Batal</Typography>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => {
                  setSeletedItems((state) => {
                    state.push({ _id: selectedItem._id, qty: qty });
                    return state;
                  });
                  setVisible(false);
                  setQty(0);
                  setOtherQty('');
                }}
              >
                <Typography>Simpan</Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default Order;
