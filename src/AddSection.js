import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddSection({setAddChosenSection, setAddSectionVar, chosenOneCookbook, setCookbook, cookbooks, sections, setAddSection}) {
  const [name,setName] = useState('');

  const setSubmit = (e) => {
    e.preventDefault();
    let sectionID = Math.floor(Math.random() * 10);
    setAddSection([...sections, { sectionId: sectionID, id: chosenOneCookbook, sectionName: name}]);
    setAddSectionVar(false);
    setAddChosenSection(sectionID);
  };

  const setNameVar = (e) => {
    setName(e.target.value);
  }

  return (
    <div>
      <Dialog open={true} onClose={()=>setAddSectionVar(false)} aria-labelledby="form-dialog-title">
        <form onSubmit={setSubmit}>
        <DialogTitle id="form-dialog-title">Enter Section name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Section name"
            type="text"
            onChange={setNameVar}
            value={name}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setAddSectionVar(false)} color="primary">
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