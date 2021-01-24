import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddRecipe() {
  const [name,setName] = useState('');

  const setSubmit = (e) => {
    e.preventDefault();
    addCookBook([
        ...cookbooks,
        { id: Math.floor(Math.random() * 10),
        name: name,
        author: 'justas',
        cover: ''}
    ]);
    cookbookModal();
  };

  const setNameVar = (e) => {
    setName(e.target.value);
  }

  return (
    <div>
      <Dialog open={true} onClose={cookbookModal} aria-labelledby="form-dialog-title">
        <form onSubmit={setSubmit}>
        <DialogTitle id="form-dialog-title">Enter Cookbook name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cookbook name"
            type="text"
            onChange={setNameVar}
            value={name}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cookbookModal} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}