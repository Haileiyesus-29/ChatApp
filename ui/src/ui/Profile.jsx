import {Button} from "@/components/ui/button"
import {FormItem} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import useAuth from "@/store/useAuth"
import {zodResolver} from "@hookform/resolvers/zod"
import {useState} from "react"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import {z} from "zod"

const schema = z.object({
  name: z
    .string()
    .min(1, {message: "name is required"})
    .max(32, {message: "name can't be more than 32 characters"}),
  username: z
    .string()
    .min(5, {message: "username must be atleast 5 characters"})
    .max(32, {message: "username can't be more than 32 characters"})
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "username can only contain letters, numbers, and underscores",
    }),
  bio: z.string().max(255),
})

function Profile() {
  const {account, updateProfile, updateProfilePicture} = useAuth(store => store)
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: {isSubmitting, errors},
  } = useForm({
    defaultValues: {
      name: account?.name,
      username: account?.username,
      email: account?.email,
      bio: account?.bio,
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = data => {
    updateProfile(data, setError)
  }

  const [image, setImage] = useState(null)
  const showButtons = () => {
    if (disabled) {
      return (
        <Button
          variant="secondary"
          className="w-full"
          type="button"
          onClick={() => setDisabled(false)}
        >
          Edit
        </Button>
      )
    } else {
      return (
        <Button
          onClick={() => {
            setDisabled(true)
            setValue("name", account?.name)
            setValue("username", account?.username)
            setValue("bio", account?.bio)
          }}
          variant="secondary"
          className="w-full"
          type="button"
        >
          Cancel
        </Button>
      )
    }
  }

  const onPictureUpdate = e => {
    e.preventDefault()
    if (image) updateProfilePicture(image, () => navigate("/"))
  }

  return (
    <main className="flex md:flex-row flex-col gap-4 bg-zinc-900 p-4 overflow-x-auto">
      <form
        onSubmit={onPictureUpdate}
        type="multipart/form-data"
        className="flex flex-col gap-2 max-w-sm basis-1/3"
      >
        <img src={account?.image || "default_profile.jpg"} alt={account?.name} />
        <Input type="file" id="image" name="image" onChange={e => setImage(e.target.files)} />
        <Button disabled={image === null} type="submit" variant="secondary" className="w-full">
          Change Image
        </Button>
      </form>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 grow">
        {errors.root && <span className="text-red-500">{errors.root.message}</span>}
        <FormItem>
          <Label htmlFor="username">Name</Label>
          <Input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            disabled={disabled}
            className="focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </FormItem>
        <FormItem>
          <Label htmlFor="username">Username</Label>
          <Input
            {...register("username")}
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            disabled={disabled}
            className="focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none"
          />
          {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        </FormItem>
        <FormItem>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={account?.email}
            disabled={disabled}
            className="focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none"
          />
        </FormItem>
        <FormItem>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            {...register("bio")}
            id="bio"
            name="bio"
            placeholder="Bio"
            disabled={disabled}
            className="focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none"
          />
        </FormItem>
        <div className="flex gap-4">
          {showButtons()}
          <Button disabled={disabled || isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </main>
  )
}
export default Profile
