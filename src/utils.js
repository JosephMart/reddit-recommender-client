export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        isLoading: false,
        isError: false,
      };
    case 'FETCH_FAILURE':
      return {
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
