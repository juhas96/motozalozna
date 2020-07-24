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
import Dinero from 'dinero.js';


import './css/uniform.css';
import '../extensions/ArrayExtension';

const UserTable = (props) => {
  const { handleState, rows, user_id } = props;
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
      handleState('userRows', []);
      console.log('rows', rows);
      getUsersLoan(user_id)
        .then(response => {
          response.data.forEach(singleRow => {
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
              car_ecv: singleRow.car_ecv,
              car_km: singleRow.car_km,
              car_power: singleRow.car_power,
              car_years_old: singleRow.car_years_old + ' rokov',
              loan_length: loanLength,
              loan_price: Dinero({amount: parseInt(singleRow.loan_price.toString()), currency: 'EUR'}).toFormat(),
              dateRange: `${until.getDate()}.${until.getMonth()}.${until.getFullYear()}`,
              interest: Dinero({amount: parseInt(singleRow.interest.toString()), currency: 'EUR'}).toFormat(),
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

    const handleSuccPayment = (data) => {
      currentRow.loan_price = Dinero({amount: parseInt(data.loanPrice.toString()), currency: 'EUR'}).toFormat();
      currentRow.row.loan_price = data.loanPrice;
      currentRow.interest = Dinero({amount: parseInt(data.loanInterest.toString()), currency: 'EUR'}).toFormat();
      currentRow.row.interest = data.loanInterest;
    };

  const columns = [
    { 
      id: 'car_ecv', label: 'EČV',
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
      label: 'Dĺžka pôžičky',
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
      id: 'interest', label: 'Výška úroku',
    },
    {
      id: 'interest_paid', label: 'Splatené?',
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
            <h1>Vitajte</h1>
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
                            {/* <h3 style={{ marginBottom: '10px' }}>
                              Ostáva zaplatiť: 
                              {' '}{currentRow.loan_price}
                              {' '}
                            </h3>
                            <h3 >
                              Z toho úrok: 
                              {' '}{currentRow.interest}
                              {' '}
                            </h3> */}
                          </div>

                          <div >
                            <Payment loanId={currentRow.row.id} sendData={handleSuccPayment} />
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
