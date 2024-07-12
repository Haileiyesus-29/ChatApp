import axios from "axios"

const instance = axios.create({
  timeout: 60 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

const api = {
  get: async url => {
    try {
      const res = await instance.get(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      return res.data
    } catch (error) {
      console.log(error?.response?.data || error?.message)
      return error?.response?.data || error?.message
    }
  },

  post: async (url, data) => {
    try {
      const res = await instance.post(url, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      return res.data
    } catch (error) {
      console.log(error?.response?.data || error?.message)
      return error?.response?.data || error?.message
    }
  },

  put: async (url, data) => {
    try {
      const res = await instance.put(url, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      return res.data
    } catch (error) {
      console.log(error?.response?.data || error?.message)
      return error?.response?.data || error?.message
    }
  },

  delete: async url => {
    try {
      const res = await instance.delete(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      return res.data
    } catch (error) {
      console.log(error?.response?.data || error?.message)
      return error?.response?.data || error?.message
    }
  },
}

export default api
