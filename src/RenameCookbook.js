import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function RenameCookbook({anchorEl,setRenameCookbook, renameCookbook,cookbooks, setCookbook}) {
  const oldName = cookbooks.findIndex(element => element.id == renameCookbook.id );

  const [name,setName] = useState('');
  const [newName,setNewName] = useState(cookbooks[oldName].name);

  const setNameVar = (e) => {
    setNewName(e.target.value);
  }
  const closeRenamecookbookModal = () => {
    setRenameCookbook({id: '', popup: 'false'})
  }
    
  const setSubmit = (e) => {
    e.preventDefault();
    const elementsIndex = cookbooks.findIndex(element => element.id == renameCookbook.id );
    let newArray = [...cookbooks];
    newArray[elementsIndex] = {...newArray[elementsIndex], name: newName};
    setCookbook(newArray);
    closeRenamecookbookModal();
  };

  return (
    <div>
      <Dialog open={true} onClose={closeRenamecookbookModal} aria-labelledby="form-dialog-title">
        <form onSubmit={setSubmit}>
        <DialogTitle id="form-dialog-title">Enter new Cookbook name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cookbook name"
            type="text"
            onChange={setNameVar}
            value={newName}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRenamecookbookModal} color="primary">
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