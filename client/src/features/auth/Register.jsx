import { Link, useNavigate } from 'react-router-dom'
import Input from '../../ui/common/Input'
import Button from '../../ui/common/Button'
import { useContext, useReducer } from 'react'
import authContext from './authContext'

const initial = {
   name: {
      value: '',
      error: 'This field is required',
      focused: false,
   },
   email: {
      value: '',
      error: 'This field is required',
      focused: false,
   },
   password: {
      value: '',
      error: 'This field is required',
      focused: false,
   },
}

function reducer(state, action) {
   switch (action.type) {
      case 'name': {
         return {
            ...state,
            name: {
               value: action.payload,
               error: !action.payload ? 'Name is required' : '',
               focused: state.name.focused,
            },
         }
      }
      case 'password': {
         return {
            ...state,
            password: {
               value: action.payload,
               error: (() => {
                  if (!action.payload) return 'Password is required!'
                  else if (action.payload.length < 8)
                     return 'Password must be at least 8 characters'
                  else if (
                     !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                        action.payload
                     )
                  )
                     return 'Password must contain uppercase, lowercase, number, and special character'
                  else return ''
               })(),
               focused: state.password.focused,
            },
         }
      }
      case 'email': {
         return {
            ...state,
            email: {
               value: action.payload,
               error: (() => {
                  if (!action.payload) return 'Email is required!'
                  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.payload))
                     return 'Invalid email format'
                  else return ''
               })(),
               focused: state.email.focused,
            },
         }
      }
      case 'focus': {
         return {
            ...state,
            [action.payload]: {
               ...state[action.payload],
               focused: true,
            },
         }
      }
      default:
         return state
   }
}

function Register() {
   const [state, dispatch] = useReducer(reducer, initial)
   const { loading, signup, error } = useContext(authContext)

   const navigate = useNavigate()

   const submitHandler = async e => {
      e.preventDefault()
      const payload = {}
      let errors = []

      for (let [key, value] of Object.entries(state)) {
         payload[key] = value.value
         value.error && errors.push(value.error)
      }

      if (errors.length) return
      await signup(payload, () => navigate('/'))
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
               name='name'
               placeholder='Your full name'
               type='text'
               label='Full Name'
               onChange={e =>
                  dispatch({ type: 'name', payload: e.target.value })
               }
               onFocus={() => dispatch({ type: 'focus', payload: 'name' })}
               error={state.name.focused && state.name.error}
            />
            <Input
               placeholder='e.g, John@example.com'
               type='email'
               name='email'
               label='Email'
               onChange={e =>
                  dispatch({ type: 'email', payload: e.target.value })
               }
               onFocus={() => dispatch({ type: 'focus', payload: 'email' })}
               error={state.email.focused && state.email.error}
            />
            <Input
               label='Password'
               name='password'
               type='password'
               key='password'
               placeholder='Your password'
               onChange={e =>
                  dispatch({ type: 'password', payload: e.target.value })
               }
               onFocus={() => dispatch({ type: 'focus', payload: 'password' })}
               error={state.password.focused && state.password.error}
            />

            <div className='flex flex-col gap-3'>
               <Button label={loading ? 'Loading...' : 'Create my account'} />
               <span className='text-sm'>
                  Already have an account? &nbsp;
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
