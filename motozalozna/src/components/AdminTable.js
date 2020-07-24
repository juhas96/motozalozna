import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
 Paper,
 Table,
 Grid,
 TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Container as MaterialContainer
} from '@material-ui/core/';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment'
import { getAllLoans } from '../service/HttpService';
import Dinero from 'dinero.js'
import { updateLoanPrice } from '../service/HttpService';

import './css/uniform.css';
import '../extensions/ArrayExtension';
import './css/admin.css';
import './css/card.css';

const AdminTable = (props) => {
  const { handleState, rows } = props;
  const [amount, setAmount] = useState(0);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      margin: 'auto',
    },
    container: {
      maxHeight: 500,
    },
    root_div: {
      flexGrow: 1,
    },
  }));
  
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [isModal, setModal] = useState(false);
    const [currentRow, setCurrentRow] = useState();

    useEffect(() => {
      getAllLoans()
        .then(response => {
          response.data.forEach(singleRow => {
            console.log('loanUntil', singleRow.loan_until)
            const until = new Date(singleRow.loan_until);
            let loanLength = '';
            switch (singleRow.loan_length.toString()) {
              case '0':
                loanLength = '1 týždeň';
                break;
              case '1':
                loanLength = '2 týždne';
                break;
              default:
                loanLength = 'Mesiac';
                break;
            }
            rows.push({
              id: singleRow.id,
              meno: `${singleRow.user.first_name} ${singleRow.user.last_name}`,
              email: singleRow.user.email,
              vyska: Dinero({amount: parseInt(singleRow.loan_price.toString()), currency: 'EUR'}).toFormat(),
              dateRange: `${until.getDate()}.${until.getMonth()}.${until.getFullYear()}`,
              paid: Dinero({amount: parseInt(singleRow.interest.toString()), currency: 'EUR'}).toFormat(),
              loan_length: loanLength,
              row: singleRow
            });
          });
          handleState('adminRows', rows);
        })
        .catch(err => {
          console.log(err);
        });
    }, [handleState]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  const columns = [
    { id: 'meno', label: 'Meno' },
    { id: 'email', label: 'Email' },
    {
      id: 'vyska',
      label: 'Výška pôžičky',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'dateRange',
      label: 'Pôžička DO',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'paid',
      label: 'Úrok',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'actions',
      label: 'Podrobnosti'
    }
  ];

  // ROW FUNCTIONS
  function handleVisibility(row) {
    setCurrentRow(row);
    setModal(true);
  }

  function handleEdit(row) {
    setModal(true)
  }

  function handleDelete(row) {
    // rows.map((e, idx) => {
    //   if(e == row) {
    //     rows.remove(e)
    //     handleState('adminRows', rows)
    //   }
    // })
  }

  function handleSubmit(row) {
    let tempAmount = Number(amount);
    tempAmount = tempAmount * 100;
    tempAmount = tempAmount.toFixed(2).split('.')[0];
    updateLoanPrice({price: Number(tempAmount), loanId: row.id}).then((res) => {
      toast.success('Pôžička bola úspešne aktualizovaná.', {position: toast.POSITION.TOP_RIGHT});
      row.vyska = Dinero({amount: parseInt(res.data.loanPrice.toString()), currency: 'EUR'}).toFormat();
      row.paid = Dinero({amount: parseInt(res.data.loanInterest.toString()), currency: 'EUR'}).toFormat();
      setModal(false);
    }).catch((err) => {
      console.log('error:', err);
      toast.error('Pri aktualizacii pôžičky nastala chyba', {position: toast.POSITION.TOP_RIGHT});
      setModal(false);
    });
  }

  function handleClose() {
    setModal(false);
  }

  return (
    <MaterialContainer>
      { rows
      ? (
        <div>
          <div className="categoryName">
            <h1>Vitajte</h1>
          </div>
          <div className="wrapper" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
            <Paper className={classes.root}>

              <Modal show={isModal} onHide={() => handleClose()} animation size="xl">

                <Modal.Header closeButton>
                  <Modal.Title>Informácie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    { currentRow 

                    ? (
                      <div className='root_div'>
                        <Container fluid spacing={3}>
                          {/* <Row>
                            <div style={{textAlign: 'center'}}>
                              <h3>Osobné Informácie</h3>
                            </div>
                          </Row> */}
                          <Row xs md='12' style={{alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                            <Col xs md='6' style={{alignItems: 'center'}}>
                              <Paper className='paper'>
                                <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>{'Meno: '}</span>
                                {currentRow.meno}
                                </div>

                                <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>{'Email: '}</span>
                                {currentRow.email}
                                </div>

                                <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>{'Telefónne číslo: '}</span>
                                {currentRow.row.user.phone_number}
                                </div>

                                <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>{'Dĺžka pôžičky: '}</span>
                                {currentRow.loan_length}
                                </div>
                              </Paper>
                            </Col>

                          <Col xs md='6' style={{alignItems: 'center'}}>
                            <Paper className='paper'>
                              <div style={{textAlign: 'center'}}>
                              <span style={{fontWeight: '600'}}>{'Výška pôžičky: '}</span>
                              {currentRow.vyska}
                              </div>

                              <div style={{textAlign: 'center'}}>
                              <span style={{fontWeight: '600'}}>{'Pôžička do: '}</span>
                              {currentRow.dateRange}
                              </div>

                              <div style={{textAlign: 'center'}}>
                              <span style={{fontWeight: '600'}}>{'Úrok: '}</span>
                              {currentRow.paid}
                              </div>

                              <div style={{textAlign: 'center'}}>
                              <span style={{fontWeight: '600'}}>{'Zaplatené: '}</span>
                              {currentRow.row.interest_paid == 'true' ? 'Áno' : 'Nie'}
                              </div>
                            </Paper>
                          </Col>
                          </Row>

                          <Row xs md='12' style={{alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                            <Col xs md='6' style={{alignItems: 'center'}}>
                              <Paper className='paper'>
                                <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>{'EČV: '}</span>
                                {currentRow.row.car_ecv}
                                </div>

                                <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>{'Typ karosérie: '}</span>
                                {currentRow.row.car_bodywork_type}
                                </div>

                                <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>{'Typ pohonu: '}</span>
                                {currentRow.row.car_axle_type}
                                </div>

                                <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>{'Palivo: '}</span>
                                {currentRow.row.car_fuel_type}
                                </div>
                              </Paper>
                            </Col>

                          <Col xs md='6' style={{alignItems: 'center'}}>
                            <Paper className='paper'>
                              <div style={{textAlign: 'center'}}>
                              <span style={{fontWeight: '600'}}>{'Prevodovka: '}</span>
                              {currentRow.row.car_gearbox_type}
                              </div>

                              <div style={{textAlign: 'center'}}>
                              <span style={{fontWeight: '600'}}>{'KM: '}</span>
                              {currentRow.row.car_km}
                              </div>

                              <div style={{textAlign: 'center'}}>
                              <span style={{fontWeight: '600'}}>{'KW: '}</span>
                              {currentRow.row.car_power}
                              </div>

                              <div style={{textAlign: 'center'}}>
                              <span style={{fontWeight: '600'}}>{'Vek vozidla: '}</span>
                              {currentRow.row.car_years_old}
                              </div>
                            </Paper>
                          </Col>
                          </Row>

                          <Row xs md='12' style={{alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                            <Col>
                            <Paper className='paper'>
                              <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>• {'Poškodený lak: '}</span>
                                {currentRow.row.car_damaged_varnish === false ? 'Nie' : 'Ano'}
                              </div>

                              <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>• {'Poškodená karoséria: '}</span>
                                {currentRow.row.car_damaged_bodywork === false ? 'Nie' : 'Ano'}
                              </div>

                              <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>• {'Poškodený interiér: '}</span>
                                {currentRow.row.car_damaged_interior === false ? 'Nie' : 'Ano'}
                              </div>

                              <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>• {'Poškodené pneumatiky: '}</span>
                                {currentRow.row.car_damaged_tires === false ? 'Nie' : 'Ano'}
                              </div>

                              <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>• {'Poškodené čelné sklo: '}</span>
                                {currentRow.row.car_damaged_window === false ? 'Nie' : 'Ano'}
                              </div>

                              <div style={{textAlign: 'center'}}>
                                <span style={{fontWeight: '600'}}>• {'Poškodená náprava: '}</span>
                                {currentRow.row.car_damaged_axle === false ? 'Nie' : 'Ano'}
                              </div>
                            </Paper>
                            </Col>
                          </Row>

                          <Row xs md='12' style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Col>
                            <Paper className='paper' style={{display: 'flex',flexDirection: 'column' ,alignItems: 'center', justifyContent: 'center'}}>
                              <h3>Úprava splátky</h3>
                              <h6>Zadajte sumu o ktorú chcete pôžičku znížiť</h6>
                              <Input
                                required
                                className="StripeElement"
                                type="text"
                                style={{marginBottom: '10px', marginTop: '10px', width: '30%'}}
                                endAdornment={<InputAdornment position="end">€</InputAdornment>}
                                onChange={e => setAmount(e.target.value.replace(',','.') )}
                                name="pay"
                                id="pay"
                                fullWidth="true"
                                size="medium"
                              />
                              <div>
                                  <Button style={{marginTop: "20px", marginBottom: '25px'}}
                                  onClick={() => {handleSubmit(currentRow)}} variant="contained" color="primary">Potvdiť zmeny</Button>
                              </div>
                            </Paper>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    )
                    : null }
                  </div>
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
                          align="center"
                          style={{ width: '120px' }}
                        >
                          {column.label}
                        </TableCell>
                      ))}

                    </TableRow>
                  </TableHead>
                  <TableBody>

                    { 
                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <TableRow hover key={row.name} role="checkbox" tabIndex={-1}>
                        { columns.map((column) => {
                          const value = row[column.id];
                          return (

                            <TableCell key={column.id} align="center">

                              { column.label === 'Podrobnosti'

                              ? (
                                <div className="btn-group" key={row.name + row.name}>
                                  {/* <Button onClick={() => handleEdit(row)}>
                                  <CreateIcon /> */}
                                {/* </Button> */}
                                <Button onClick={() => handleDelete(row)}>
                                  <DeleteIcon />
                                </Button>
                                  <Button onClick={() => handleVisibility(row)}>
                                    <VisibilityIcon />
                                  </Button>
                                </div>
)
                                : (
                                  <div key={row.name + row.email}>
                                    { column.format && typeof value === 'number' ? column.format(value) : value }
                                  </div>
)}
                        
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                    }
                  
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
)
    : null }
    </MaterialContainer>
  );
};

export default AdminTable;
