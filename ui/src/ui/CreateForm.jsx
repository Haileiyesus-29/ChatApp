import {FormItem} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {useNavigate, useOutletContext} from "react-router-dom"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import api from "@/services/api"
import {ENDPOINT} from "@/endpoints"
import queryConfig from "@/services/query"

const schema = z.object({
  name: z.string().trim().min(1, {message: "Name is required"}),
  username: z.string().trim(),
  description: z
    .string()
    .trim()
    .max(255, {message: "Description must be less than 255 characters"}),
})

function CreateForm() {
  const {type} = useOutletContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async data => {
      const endpoint = type === "channel" ? ENDPOINT.CREATE_CHANNEL() : ENDPOINT.CREATE_GROUP()
      const res = await api.post(endpoint, data)
      return res.data
    },
    onError: error => {
      console.log(error)
      if (error.response.data.errors) {
        error.response.data.errors.forEach(err => {
          setError(err.field, {message: err.message})
        })
        return
      }
      setError("root", {message: error.response.data.message})
    },
    onSuccess: data => {
      queryClient.setQueryData(queryConfig.getChatList(type).queryKey, old => {
        return [...(old || []), {...data, lastMessage: null, type}]
      })
      navigate(`/${type}/${data.id}`)
    },
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: {isSubmitting, errors},
  } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <form
      onSubmit={handleSubmit(mutation.mutate)}
      className="flex flex-col gap-3 mx-auto py-10 p-2 w-full max-w-md"
    >
      {errors.root && (
        <span className="block border-2 bg-red-400/20 p-1 border-red-700/70 rounded-md text-red-500 text-sm">
          {errors.root.message}
        </span>
      )}
      <FormItem>
        <Label htmlFor="name">Name</Label>
        <Input
          {...register("name")}
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          className="focus-visible:border-zinc-300"
        />
        {errors.name && (
          <span className="block border-2 bg-red-400/20 p-1 border-red-700/70 rounded-md text-red-500 text-sm">
            {errors.name.message}
          </span>
        )}
      </FormItem>
      <FormItem>
        <Label htmlFor="username">Username</Label>
        <Input
          {...register("username")}
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          className="focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none"
        />
        {errors.username && (
          <span className="block border-2 bg-red-400/20 p-1 border-red-700/70 rounded-md text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
      </FormItem>
      <FormItem>
        <Label htmlFor="description">Description</Label>
        <Textarea
          {...register("description")}
          id="description"
          name="description"
          type="text"
          placeholder="Type description"
          className="focus-visible:border-zinc-300 focus-visible:ring-0 focus-visible:outline-none max-h-56"
        />
      </FormItem>
      {/* <FormItem>
            <Label htmlFor='image'>Image</Label>
            <Input
               {...register('image')}
               id='image'
               name='image'
               type='file'
               placeholder='Image'
               className='bg-zinc-950 border-none rounded-none w-64'
            />
         </FormItem> */}
      <Button type="submit" className="w-full capitalize" disabled={isSubmitting}>
        Create {type}
      </Button>
    </form>
  )
}
export default CreateForm
