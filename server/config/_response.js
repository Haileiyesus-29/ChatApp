const RESPONSE = {
   success: (data, status) => ({ status, sucess: true, data, error: null }),
   error: err => ({ sucess: false, data: null, ...err }),
}
export default RESPONSE
