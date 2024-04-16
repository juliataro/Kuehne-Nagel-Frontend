import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const { REACT_APP_API_URL } = process.env

// Fetch All Shipments
export const fetchAllShipmentsAPI = createAsyncThunk(
  'shipments/getAPI',
  async () => {
    const apiResponse = await axios.get(`${REACT_APP_API_URL}`)
    return apiResponse.data
  }
)

// Add New Shipment, pushing Data with payload
export const createNewShipmentAPI = createAsyncThunk(
  'shipments/createAPI',
  async payload => {
    const apiResponse = await axios.post(`${REACT_APP_API_URL}`, payload)
    return apiResponse.data
  }
)

// Delete Order by ID - orderNo
export const deleteShipmentAPI = createAsyncThunk(
  'shipments/deleteAPI',
  async orderNo => {
    const apiResponse = await axios.delete(`${REACT_APP_API_URL}/${orderNo}`)
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

      // GET ALL SHIPMENTS actions
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

      // ADD NEW SHIPMENT actions
      .addCase(createNewShipmentAPI.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(createNewShipmentAPI.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // unshift inserts element at the start of an array
        state.shipments.unshift(action.payload)
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

// TODO - export actions methods in selectors
export const getAllShipmentsData = state => state.shipmentsData.shipments
export const getShipmentsLoading = state => state.shipmentsData.status
export const getShipmentsError = state => state.shipmentsData.error
export const getShipmentByOrderNo = orderNo => {
  return state =>
    state.shipment.shipmentsData.filter(_ => _.orderNo === orderNo)[0]
}

// Exports Reducer to the store
export default shipmentsSlice.reducer
