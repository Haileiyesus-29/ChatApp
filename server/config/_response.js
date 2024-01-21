const RESPONSE = {
   success: (data, status) => ({ status, success: true, data, error: null }),
   error: err => ({ success: false, data: null, ...err }),
}
export default RESPONSE
