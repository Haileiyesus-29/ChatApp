import { Link, useNavigate } from 'react-router-dom'
import Input from '../../ui/common/Input'
import Button from '../../ui/common/Button'
import { useContext, useReducer } from 'react'
import authContext from './authContext'

const initial = {
   fname: {
      value: '',
      error: '',
   },
   lname: {
      value: '',
      error: '',
   },
   email: {
      value: '',
      error: '',
   },
   password: {
      value: '',
      error: '',
   },
}

function reducer(state, action) {
   switch (action.type) {
      case 'fname': {
         return {
            ...state,
            fname: {
               value: action.payload,
               error: !action.payload ? 'First name is required' : '',
            },
         }
      }
      case 'lname': {
         return {
            ...state,
            lname: {
               value: action.payload,
            },
         }
      }
      case 'password': {
         return {
            ...state,
            password: {
               value: action.payload,
               error: (() => {
                  if (!action.payload) return 'password is required!'
                  else if (action.payload?.length < 8)
                     return 'password must be atleast 8 characters'
                  else if (
                     !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                        action.payload
                     )
                  )
                     return 'pasword must contain Uppercase, lowercase, number and character'
                  else return ''
               })(),
            },
         }
      }
      case 'email': {
         return {
            ...state,
            email: {
               value: action.payload,
               error: (() => {
                  if (!action.payload) return 'email is required!'
                  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.payload))
                     return 'Invalid email format'
                  else return ''
               })(),
            },
         }
      }
      default:
         break
   }
}

function Register() {
   const [state, dispatch] = useReducer(reducer, initial)
   const { loading, error, signup } = useContext(authContext)
   const navigate = useNavigate()

   const changeHandler = e => {
      dispatch({ type: e.target.name, payload: e.target.value })
   }

   const submitHandler = async e => {
      e.preventDefault()
      const payload = {}
      let errors = []

      for (let [key, value] of Object.entries(state)) {
         payload[key] = value.value
         value.error && errors.push(value.error)
      }

      if (errors.length) return
      await signup(payload, () => navigate('/', { replace: true }))
   }

   return (
      <main className='min-h-screen flex justify-center items-center p-2'>
         <form
            className='flex flex-col gap-4 dark:bg-neutral w-full max-w-md px-4 py-8 rounded-lg'
            onSubmit={submitHandler}
         >
            <h2 className='text-3xl text-center leading-loose'>Register</h2>
            <div className='text-sm text-red-400/80'>{error}</div>
            <Input
               name='fname'
               placeholder='Your first name'
               type='text'
               label='First Name'
               onChange={changeHandler}
               error={state.fname.error}
            />
            <Input
               name='lname'
               placeholder='Your last name'
               type='text'
               label='Last Name'
               onChange={changeHandler}
            />
            <Input
               placeholder='e.g, John@example.com'
               type='email'
               name='email'
               label='email'
               onChange={changeHandler}
               error={state.email.error}
            />
            <Input
               label='password'
               name='password'
               type='password'
               key='password'
               placeholder='your password'
               onChange={changeHandler}
               error={state.password.error}
            />

            <div className='flex flex-col gap-3'>
               <Button label={loading ? 'Loading...' : 'Create my account'} />
               <span className='text-sm'>
                  Already have an account ? &nbsp;
                  <Link to='/login' className='text-primary'>
                     Login
                  </Link>
               </span>
            </div>
         </form>
      </main>
   )
}
export default Register
