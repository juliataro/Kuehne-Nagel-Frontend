import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditNoteIcon from '@mui/icons-material/EditNote'

//import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAllShipmentsData,
  getShipmentsLoading,
  getShipmentsError,
  fetchAllShipmentsAPI
  //  deleteShipmentAPI
} from '../../Redux/shipments/ShipmentsSlice'

// import DeleteConfirmation from './DeleteConfirmation'

const columns = [
  { id: 'orderNo', label: 'ORDERNO', minWidth: 50 },
  { id: 'date', label: 'DATE', minWidth: 50 },
  { id: 'customer', label: 'CUSTOMER', minWidth: 50 },
  { id: 'trackingNo', label: 'TRACKINGNO', minWidth: 50 },
  { id: 'status', label: 'STATUS', minWidth: 50 },
  { id: 'consignee', label: 'CONSIGNEE', minWidth: 50 },
  { id: 'edit', label: 'EDIT', minWidth: 50 }
]

export default function AllShipments () {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const dispatch = useDispatch()

  // Selector hook to access the redux store's state.
  // Consumed by component - takes selector function as an argument
  // Selectors fetching data from the store and
  const allShipments = useSelector(getAllShipmentsData)
  const apiStatus = useSelector(getShipmentsLoading)
  const error = useSelector(getShipmentsError)

  //const [openDialog, setOpenDialog] = useState(false)
  //const [shipmentToDeleteOrderNO, setShipmentToDeleteOrderNO] = useState(0)

  // Fetch all orders
  useEffect(() => {
    if (apiStatus === 'idle') {
      dispatch(fetchAllShipmentsAPI())
    }
  }, [apiStatus, dispatch])

  // Open Delete-Dialog-Window
  /* const handleClickOpen = orderNo => {
    setOpenDialog(true)
    //setShipmentToDeleteOrderNO(orderNo)
  } */

  // Close Dialog-Window
  /*   const closeDialogHandler = () => {
    setOpenDialog(false)
    setShipmentToDeleteOrderNO(0)
  }

  // Delete Confirmation with action "deleteShipmentAPI" that is exported from
  // ShipmentSlice and useState "shipmentToDeleteOrderNO"

  const confirmDeleteHandler = () => {
    dispatch(deleteShipmentAPI(shipmentToDeleteOrderNO))
      .unwrap()
      .then(() => {
        setOpenDialog(false)
        setShipmentToDeleteOrderNO(0)
      })
  } */

  // Change table page options
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  let listToDisplay = ''

  /*  listToDisplay = apiStatus === 'pending' ? 
 (<><div>
  </div></>) : (<></>) */

  if (apiStatus === 'pending') {
    listToDisplay = (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '15em' }}
      >
        <CircularProgress />
      </Box>
    )
  } else if (apiStatus === 'succeeded') {
    listToDisplay = (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allShipments

                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(shipment => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={shipment.orderNo}
                    >
                      <TableCell component='th' scope='row'>
                        {shipment.orderNo}
                      </TableCell>
                      <TableCell align='left'>{shipment.date}</TableCell>
                      <TableCell align='left'>{shipment.customer}</TableCell>
                      <TableCell align='left'>{shipment.trackingNo}</TableCell>
                      <TableCell align='left'>{shipment.status}</TableCell>
                      <TableCell align='left'>{shipment.consignee}</TableCell>
                      <TableCell align='left'>
                        <IconButton size='large'>
                          <EditNoteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            //  handleClickOpen(shipment.orderNo)
                          }}
                          size='large'
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={allShipments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
  } else if (apiStatus === 'failed') {
    listToDisplay = <p>{error}</p>
  }

  // Export title, body, actions and hooks to DeleteConfirmation as props
  return (
    <>
      <div style={{ marginTop: '7em' }}>
        <div>
          <h1
            style={{
              marginBottom: '1em',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            Freight Table
          </h1>
          {listToDisplay}
          {/*   <DeleteConfirmation
            openDialog={openDialog}
            apiStatus={apiStatus}
            closeDialogHandler={closeDialogHandler}
            confirmDeleteHandler={confirmDeleteHandler}
          ></DeleteConfirmation> */}
        </div>
      </div>
    </>
  )
}
