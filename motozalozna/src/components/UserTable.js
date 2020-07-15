import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from 'react-bootstrap';
import {
 Paper,
 Table,
 TableBody,
 TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Container, TextField 
} from '@material-ui/core/';
import PaymentIcon from '@material-ui/icons/Payment';
import { getUsersLoan } from '../service/HttpService';

import { Payment } from './Payment';

import './css/uniform.css';
import '../extensions/ArrayExtension';

const UserTable = (props) => {
  const { handleState, rows } = props;
  const [isModal, setModal] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  // const [isPayed, setPayment] = useState(false);

  const useStyles = makeStyles({
    root: {
      width: '100%',
      margin: 'auto',
      marginTop: '30px'
    },
    container: {
      maxHeight: 440,
    },
  });

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
      getUsersLoan(1)
        .then(response => {
          response.data.forEach(singleRow => {
            console.log('SINGLE ROW: ', singleRow);
            rows.push({
              car_ecv: singleRow.car_ecv,
              car_km: singleRow.car_km,
              car_power: singleRow.car_power,
              car_years_old: singleRow.car_years_old,
              loan_length: singleRow.loan_length,
              loan_price: singleRow.loan_price,
              dateRange: '12.2.2020 - 13.3.2020',
              interest: singleRow.interest,
              interest_paid: singleRow.interest_paid === false ? 'Nie' : 'Ano',
              row: singleRow
            });
          });
          handleState('userRows', rows);
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
    { 
      id: 'car_ecv', label: 'ECV',
    },
    { 
      id: 'car_km', label: 'KM',
    },
    { 
      id: 'car_power', label: 'KW',
    },
    { 
      id: 'car_years_old', label: 'Vek vozidla',
    },
    { 
      id: 'loan_length',
      label: 'Dlzka pôžičky',
      format: (value) => value.toFixed(2),
    },
    { 
      id: 'loan_price',
      label: 'Výška pôžičky',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'dateRange',
      label: 'Pôžička DO',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'interest', label: 'Splatený úrok',
    },
    {
      id: 'interest_paid', label: 'Zaplatene',
    },
    {
      id: 'zaplatit', label: 'Zaplatiť'
    }
  ];

  function handlePayment(row) {
    setCurrentRow(row);
    setModal(true);
  }

  function handleClose() {
    setModal(false);
  }

  // function handlePayPrice() {
  //   setPayment(true);
  // }

  return (
    <Container style={{ marginBottom: '25px' }}>
      { rows
      ? (
        <div>
          <div className="categoryName">
            <h1>{ rows[0] ? `Vitajte ${rows[0].meno}` : 'Vitajte'}</h1>
          </div>
          <div className="wrapper" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
            <Paper>

              <Modal show={isModal} onHide={() => handleClose()} animation size="xl">
                <Modal.Header closeButton>
                  <Modal.Title>Informácie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="text-center">
                    { currentRow 
                      ? (
                        <div>
                          <div className="categoryName">
                            <h3 style={{ marginBottom: '10px' }}>
                              Ostava Zaplatiť:
                              {currentRow.loan_price}
                              {' '}
                              €
                            </h3>
                            <h3 style={{ marginBottom: '10px' }}>
                              Z toho urok:
                              {currentRow.interest}
                              {' '}
                              €
                            </h3>
                          </div>

                          <TextField
                            required
                            label="Suma na zaplatenie"
                            variant="outlined"
                            style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}
                            type="text"
                            onChange={e => handleState({ payPrice: e.target.value })}
                            name="pay"
                            id="pay"
                            size="small"
                          />

                          <div style={{ marginTop: '30px' }}>
                            <Payment />
                          </div>
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

                    { rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <TableRow hover key={row.name} role="checkbox" tabIndex={-1}>
                        { columns.map((column) => {
                          const value = row[column.id];
                          return (

                            <TableCell key={column.id} align="center">

                              { column.label === 'Zaplatiť'

                                ? (
                                  <div className="btn-group" key={row.name}>
                                    <Button onClick={() => handlePayment(row)}>
                                      <PaymentIcon />
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
                    ))}
                  
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
    </Container>
  );
};

export default UserTable;
