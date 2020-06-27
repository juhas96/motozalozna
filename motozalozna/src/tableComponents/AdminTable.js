import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Container } from '@material-ui/core/'
import VisibilityIcon from '@material-ui/icons/Visibility';
// import DeleteIcon from '@material-ui/icons/Delete';
// import CreateIcon from '@material-ui/icons/Create';
import { Modal } from 'react-bootstrap'
import { getAllLoans } from '../service/HttpService';

import '../formComponents/formCss/uniform.css'
import '../extensions/ArrayExtension'
import './tableCss/admin.css'

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
            // console.log('SINGLE ROW: ', singleRow)
            rows.push({
              meno: singleRow.user.first_name + ' ' + singleRow.user.last_name,
              email: singleRow.user.email,
              vyska: Number(singleRow.loan_price),
              dateRange: '12.3.2020 - 12.4.2020',
              paid: singleRow.interest,
              row: singleRow
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

  // function handleEdit(row) {
  //   setModal(true)
  // }

  // function handleDelete(row) {
  //   rows.map((e, idx) => {
  //     if(e == row) {
  //       rows.remove(e)
  //       handleState('adminRows', rows)
  //     }
  //   })
  // }

  // function handleSubmit() {
  //   //SENDS DATA
  // }

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

            <Modal show={isModal} onHide={() => handleClose()} animation={true} size="xl">

              <Modal.Header closeButton>
                <Modal.Title>Informácie</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {
                  <div>
                    { currentRow ? 

                    <div className="container">
                      <div className="row">

                        {console.log(currentRow)}

                        <div style={{margin: "auto"}} key = {currentRow.meno} className="col-lg-auto col-sm-12 col-xs-12 modalRow">
                          <h3>Osobné Informácie</h3>
                          <ul className="list-group" style={{maxWidth: "300px"}}>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Meno: {currentRow.meno}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Email: {currentRow.email}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Telefonne Cislo:  {currentRow.row.user.phone_number}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Dlzka pozicky:  {currentRow.row.loan_length}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Cena pozicky: {currentRow.row.loan_price}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Pozicky od - do: 12.3.2020 - 12.4.2020</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Splatena urok: {currentRow.row.interest}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Zaplatene: {currentRow.row.interest_paid}</li>
                          </ul>
                        </div> 
                        
                        <div style={{margin: "auto"}} key = {"daco"}  className="col-lg-auto col-sm-12 col-xs-12 modalRow">
                          <h3>Informácie o Aute</h3>
                          <ul className="list-group" style={{maxWidth: "300px"}}>
                            <li className="list-group-item" style={{'textAlign': "left"}}>ECV: {currentRow.row.car_ecv}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Typ karoserie: {currentRow.row.car_bodywork_type}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Typ pohonu: {currentRow.row.car_axle_type}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Palivo: {currentRow.row.car_fuel_type}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Prevodovka: {currentRow.row.car_gearbox_type}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>KM: {currentRow.row.car_km}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>KW: {currentRow.row.car_power}</li>
                            <li className="list-group-item" style={{'textAlign': "left"}}>Vek:  {currentRow.row.car_years_old}</li>
                            <li className="list-group-item text-center" style={{'textAlign': "left"}}>Skody
                              <div className="text-left">
                                <div>
                                • Lak: {currentRow.row.car_damaged_varnish == false ? "Nie" : "Ano"}
                                </div>

                                <div>
                                • Karoseria: {currentRow.row.car_damaged_bodywork == false ? "Nie" : "Ano"}
                                </div>

                                <div>
                                • Interier: {currentRow.row.car_damaged_interior == false ? "Nie" : "Ano"}
                                </div>

                                <div>
                                • Pneumatiky: {currentRow.row.car_damaged_tires == false ? "Nie" : "Ano"}
                                </div>

                                <div>
                                • Sklo: {currentRow.row.car_damaged_window == false ? "Nie" : "Ano"}
                                </div>

                                <div>
                                • Naprava: {currentRow.row.car_damaged_axle == false ? "Nie" : "Ano"}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>

                      </div>
                    </div>

                    : null }
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

                              <div className="btn-group" key={row.name + row.name}>
                                {/* <Button onClick={() => handleEdit(row)}>
                                  <CreateIcon />
                                </Button>
                                <Button onClick={() => handleDelete(row)}>
                                  <DeleteIcon />
                                </Button> */}
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
{/* 
      <div style={{float: "right"}}>
        <Button style={{marginTop: "20px", marginBottom: '25px'}} onClick={() => {handleSubmit()}} variant="contained" color="primary">Potvdit zmeny</Button>
      </div> */}
    </Container>
  )
}

export default AdminTable