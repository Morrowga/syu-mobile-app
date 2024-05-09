import axios from 'axios';

const API_START = 'API_START';
const API_SUCCESS = 'API_SUCCESS';
const API_ERROR = 'API_ERROR';

const apiStart = () => ({
  type: API_START
});

const apiSuccess = (data) => ({
  type: API_SUCCESS,
  payload: data
});

const apiError = (error) => ({
  type: API_ERROR,
  payload: error
});

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(apiStart()); 
    try {
      const response = await axios.get('https://api.example.com/data');
      dispatch(apiSuccess(response.data)); 
    } catch (error) {
      dispatch(apiError(error.message)); 
    }
  };
};