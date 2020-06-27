import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Container } from '@material-ui/core/'
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { Modal } from 'react-bootstrap'
import { getAllLoans } from '../service/HttpService';

import '../formComponents/formCss/uniform.css'
import '../extensions/ArrayExtension'

const AdminTable = (props) => {

  const { handleState, rows } = props;

  const useStyles = makeStyles({
    root: {
      width: '100%',
      margin: 'auto',
    },
    container: {
      maxHeight: 500,
    },
  });
  
    const classes = useStyles();
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);

    const [ isModal, setModal ] = useState(false)
    const [ currentRow, setCurrentRow ] = useState()

    useEffect(() => {
      const rows = [];

      getAllLoans()
        .then(response => {
          response.data.forEach(singleRow => {
            console.log('SINGLE ROW: ', singleRow)
            rows.push({
              meno: singleRow.user.first_name + ' ' + singleRow.user.last_name,
              email: singleRow.user.email,
              vyska: Number(singleRow.loan_price),
              dateRange: '12.3.2020 - 12.4.2020',
              paid: singleRow.interest
            });
          });
          handleState('adminRows', rows)
        })
        .catch(err => {
          console.log(err);
        })
    }, [handleState]) 
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  const columns = [
    { id: 'meno', label: 'Meno'},
    { id: 'email', label: 'Email'},
    { id: 'vyska', label: 'Výška pôžičky',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'dateRange', label: 'Pôžička DO',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'paid', label: 'Splatený úrok',
      format: (value) => value.toFixed(2),
    },
    { id: 'actions', label: 'Akcie' }
  ];

  //ROW FUNCTIONS
  function handleVisibility(row) {
    setCurrentRow(row)
    setModal(true)
  }

  function handleEdit(row) {
    setModal(true)
  }

  function handleDelete(row) {
    rows.map((e, idx) => {
      if(e == row) {
        rows.remove(e)
        handleState('adminRows', rows)
      }
    })
  }

  function handleSubmit() {
    //SENDS DATA
  }

  function handleClose() {
    setModal(false)
  }

  return (
    <Container>
    { rows ?
      <div>
        <div className="categoryName">
            <h1>Vitajte</h1>
          </div>
        <div className='wrapper' style={{paddingLeft: '30px', paddingRight: '30px'}}>
          <Paper className={classes.root}>

            <Modal size='lg' show={isModal} onHide={() => handleClose()} animation={true}>
              <Modal.Header closeButton>
                <Modal.Title>Informácie</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {
                  <div>
                    {currentRow ? currentRow.meno : null}
                  </div>
                   
                }
              </Modal.Body>
              <Modal.Footer>
                <Button variant="contained" color="primary" onClick={() => handleClose()}>
                  Zavrieť
                </Button>
              </Modal.Footer>
            </Modal>

              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>

                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align='center'
                          style={{ width: '120px'}}>
                          {column.label}
                        </TableCell>
                      ))}

                    </TableRow>
                  </TableHead>
                  <TableBody>

                  { rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover key={row.name} role="checkbox" tabIndex={-1}>
                        { columns.map((column) => {
                          const value = row[column.id];
                          return (

                            <TableCell key={column.id} align='center'>

                              { column.label == 'Akcie' ?

                              <div className="btn-group" key={row.name}>
                                <Button onClick={() => handleEdit(row)}>
                                  <CreateIcon />
                                </Button>
                                <Button onClick={() => handleDelete(row)}>
                                  <DeleteIcon />
                                </Button>
                                <Button onClick={() => handleVisibility(row)}>
                                  <VisibilityIcon/>
                                </Button>
                              </div>
                                :
                              <div key={row.name + row.email}>
                                { column.format && typeof value === 'number' ? column.format(value) : value }
                              </div>
                                
                              }
                        
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                  
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    : null }

      <div style={{float: "right"}}>
        <Button style={{marginTop: "20px", marginBottom: '25px'}} onClick={() => {handleSubmit()}} variant="contained" color="primary">Potvdit zmeny</Button>
      </div>
    </Container>
  )
}

export default AdminTable