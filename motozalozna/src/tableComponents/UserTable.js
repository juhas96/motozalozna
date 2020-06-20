import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Container } from '@material-ui/core/'
import PaymentIcon from '@material-ui/icons/Payment';
import '../extensions/ArrayExtension'

const UserTable = (props) => {

  const { handleState, rows } = props;

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
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ isModal, setModal ] = useState(false)
    const [ currentRow, setCurrentRow ] = useState()

    useEffect(() => {
      const rows = [
        {"meno": 'Sebastian Vettel', 'email':'vettel@scuderia.it', 'vyska': 120000, 'dateRange':'12.3.2020 - 12.4.2020', 'paid': 202},
        {"meno": 'Sebastian Vettel', 'email':'vettel@scuderia.it', 'vyska': 120000, 'dateRange':'12.3.2020 - 12.4.2020', 'paid': 202}
      ];

      handleState('userRows', rows)

    }, [handleState]) 
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  const columns = [
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
    {
      id: 'pay', label: 'Zaplatiť'
    }
  ];

  function handlePayment(row) {

  } 

  return (
    <Container style={{marginBottom: "25px"}}>
    { rows ?
      <div>
        <div className="categoryName">
          <h1>{ rows[0] ? `Vitajte ${rows[0].meno}` : "Vitajte"}</h1>
        </div>
        <div className='wrapper' style={{paddingLeft: '30px', paddingRight: '30px'}}>
          <Paper>

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

                                { column.label == 'Zaplatiť' ?

                                <div className="btn-group" key={row.name}>
                                  <Button onClick={() => handlePayment(row)}>
                                    <PaymentIcon />
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
    </Container>
  )
}

export default UserTable