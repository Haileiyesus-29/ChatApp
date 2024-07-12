import {Button} from "@/components/ui/button"
import {FormItem} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Separator} from "@/components/ui/separator"
import useAuth from "@/store/useAuth"
import AuthContainer from "@/ui/AuthContainer"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Link, useNavigate} from "react-router-dom"
import {z} from "zod"

const schema = z.object({
  name: z.string().trim().max(20).min(3),
  email: z.string().email(),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: "Password must contain at least 6 characters, one letter and one number",
  }),
})

function Signup() {
  const {register: signup} = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSignup = async data => {
    await signup(data, message => {
      setError("root", {
        type: "manual",
        message,
      })
      navigate("/")
    })
  }

  return (
    <AuthContainer>
      <form
        onSubmit={handleSubmit(onSignup)}
        className="flex flex-col gap-4 bg-zinc-900 px-4 py-6 border rounded w-full max-w-sm"
      >
        <h2 className="font-semibold text-2xl text-center">Signup</h2>
        {errors.root && (
          <p className="bg-red-400/20 px-2 py-1 border border-red-600/50 rounded text-red-600 text-sm">
            {errors.root?.message}
          </p>
        )}
        <FormItem>
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            placeholder="e.g, John Doe"
            className="focus-visible:border-zinc-300"
          />
          {errors.name && (
            <p className="bg-red-400/20 px-2 py-1 border border-red-600/50 rounded text-red-600 text-sm">
              {errors.name?.message}
            </p>
          )}
        </FormItem>

        <FormItem>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            name="email"
            type="email"
            placeholder="e.g, John@example.com"
            className="focus-visible:border-zinc-300"
          />
          {errors.email && (
            <p className="bg-red-400/20 px-2 py-1 border border-red-600/50 rounded text-red-600 text-sm">
              {errors.email?.message}
            </p>
          )}
        </FormItem>
        <FormItem>
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none"
          />
          {errors.password && (
            <p className="bg-red-400/20 px-2 py-1 border border-red-600/50 rounded text-red-600 text-sm">
              {errors.password?.message}
            </p>
          )}
        </FormItem>

        <Button disabled={isSubmitting} type="submit" className="w-full">
          {isSubmitting ? "Loading..." : "Signup"}
        </Button>
        <Separator />
        {/* <Button type='button' className='flex gap-2 w-full'>
               <img
                  className='w-6 h-6'
                  src='https://www.svgrepo.com/show/475656/google-color.svg'
                  loading='lazy'
                  alt='google logo'
               />
               <span className='text-center'>Signup with Google</span>
            </Button> */}
        <p className="text-sm text-zinc-200/80">
          already have an account?
          <Link to="/login" className="px-2 text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </AuthContainer>
  )
}
export default Signup
