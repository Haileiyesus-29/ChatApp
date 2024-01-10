export function formatDate(inputDate) {
   const prevDate = new Date(inputDate)
   const currentDate = new Date()
   const timeDifference = currentDate - prevDate

   if (timeDifference <= 86400000) {
      return prevDate.toLocaleTimeString('en-US', {
         hour: '2-digit',
         minute: '2-digit',
      })
   } else if (timeDifference / (1000 * 60 * 60 * 24) <= 3) {
      return prevDate.toLocaleDateString('en-US', { weekday: 'short' })
   } else if (timeDifference / (1000 * 60 * 60 * 24) <= 7) {
      return 'within a week'
   } else if (timeDifference / (1000 * 60 * 60 * 24) <= 30) {
      return 'within a month'
   } else {
      return 'long time ago'
   }
}
