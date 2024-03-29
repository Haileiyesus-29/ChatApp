/* eslint-disable react/prop-types */
function PersonalChatBubble({ sent = false, date = false }) {
   const setClassName = sent =>
      `flex items-end gap-2 my-1 px-3 py-2 max-w-md ${
         sent
            ? 'bg-zinc-200 rounded-s-lg rounded-tr-lg text-zinc-900 self-end'
            : 'bg-zinc-700/70 rounded-e-lg rounded-tl-lg'
      }`

   if (date)
      return (
         <span className='bg-zinc-950 px-6 py-1 rounded-full text-sm self-center'>
            March 28
         </span>
      )
   return (
      <div className={setClassName(sent)}>
         <p className='grow'>Hi thre. how are you?</p>
         <span
            className={`text-xs ${
               sent ? 'text-zinc-900/80' : 'text-zinc-200/80'
            }`}
         >
            20:43
         </span>
      </div>
   )
}
export default PersonalChatBubble
