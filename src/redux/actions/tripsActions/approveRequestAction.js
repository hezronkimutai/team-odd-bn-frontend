import { toast } from 'react-toastify';
import { SPINNER_STATUS, APPROVE_REQUEST_SUCCESS, APPROVE_REQUEST_ERROR } from '../../actionTypes/tripsActionTypes';
import apiCall from '../../../helpers/apiCall';

export const updateSpinnerStatus = (value) => ({
  type: SPINNER_STATUS,
  spinner: value,
});

const approveRequest = (tripRequestId, query) => async (dispatch) => {
  const API_URL = `/trips/${tripRequestId}?${query}`;
  const HEADERS_REQUEST = {
    token: localStorage.getItem('token'),
  };
  try {
    const approveRequestData = await apiCall.patch(API_URL, { reason: 'good' }, { headers: HEADERS_REQUEST });
    console.log('approveRequestData', approveRequestData);

    dispatch(updateSpinnerStatus(false));
    toast.success('Request approved successfully');
    await dispatch({
      type: APPROVE_REQUEST_SUCCESS,
      payload: approveRequestData.data.message,
    });
  } catch (error) {
    dispatch(updateSpinnerStatus(false));
    return dispatch({
      type: APPROVE_REQUEST_ERROR,
      payload: error.response.data,
    });
  }
};


export default approveRequest;
