import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Fetch All Orders Data

const SHIPMENT_URL = 'http://localhost:8000/shipments'

export const fetchAllShipmentsAPI = createAsyncThunk(
  'shipments/getAPI',
  async () => {
    const apiResponse = await axios.get(SHIPMENT_URL)
    return apiResponse.data
  }
)

// Delete Order by ID - orderNo
export const deleteShipmentAPI = createAsyncThunk(
  'shipments/deleteAPI',
  async orderNo => {
    const apiResponse = await axios.delete(
      `http://localhost:8000/shipments/${orderNo}`
    )
    return apiResponse(orderNo)
  }
)

// "shipments: [],"  - is the endpoint and the name of table in DB
const initialState = {
  shipments: [],
  status: 'idle',
  error: null
}

// https://redux-resource.js.org/requests/request-statuses
// TODO - create Slice with STATES and Actions
const shipmentsSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // Three kind of actions - pending, fulfilled and rejected
      .addCase(fetchAllShipmentsAPI.pending, (state, action) => {
        state.status = 'pending'
      })

      .addCase(fetchAllShipmentsAPI.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.shipments = action.payload
      })

      .addCase(fetchAllShipmentsAPI.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
    /* 
      .addCase(deleteShipmentAPI.pending, state => {
        state.status = 'loading'
      })

      .addCase(deleteShipmentAPI.fulfilled, (state, action) => {
        state.status = 'idle'
        state.shipments = state.shipments.filter(
          _ => _.orderNo !== action.payload
        )
      }) */
  }
})

// TODO - export actions
export const getAllShipmentsData = state => state.shipmentsData.shipments
export const getShipmentsLoading = state => state.shipmentsData.status
export const getShipmentsError = state => state.shipmentsData.error
export const getShipmentByOrderNo = orderNo => {
  return state =>
    state.shipment.shipmentsData.filter(_ => _.orderNo === orderNo)[0]
}

export default shipmentsSlice.reducer
