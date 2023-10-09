import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function FilterComponent(props) {
  const { columnDef, onFilterChanged } = props; 
  return (
    <TextField
      id="date"
      type="date"
      defaultValue="2020-07-28"
      onChange={(event) => {
        onFilterChanged(columnDef.tableData.id, event.target.value);
      }}
    />
  )
}