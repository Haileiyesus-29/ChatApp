/* eslint-disable react/prop-types */
import SearchResult from '@/components/SearchResult'
import React, { useMemo } from 'react'

function Search({
   searchResults: { users, groups, channels },
   loading,
   setSearchInput,
}) {
   const renderUserResults = useMemo(() => {
      return (
         <ul className='flex flex-col gap-2'>
            <div className='px-3 text-lg'>Users</div>
            {users.map(user => (
               <SearchResult
                  key={user.id}
                  account={user}
                  type='user'
                  setSearchInput={setSearchInput}
               />
            ))}
         </ul>
      )
   }, [users, setSearchInput])

   const renderGroupResults = useMemo(() => {
      return (
         <ul className='flex flex-col gap-2'>
            <div className='px-3 text-lg'>Groups</div>
            {groups.map(group => (
               <SearchResult
                  key={group.id}
                  account={group}
                  type='group'
                  setSearchInput={setSearchInput}
               />
            ))}
         </ul>
      )
   }, [groups, setSearchInput])

   const renderChannelResults = useMemo(() => {
      return (
         <ul className='flex flex-col gap-2'>
            <div className='px-3 text-lg'>Channels</div>
            {channels.map(channel => (
               <SearchResult
                  key={channel.id}
                  account={channel}
                  type='channel'
                  setSearchInput={setSearchInput}
               />
            ))}
         </ul>
      )
   }, [channels, setSearchInput])

   return (
      // <div className='flex flex-col bg-zinc-50/10 shadow-lg backdrop-blur backdrop-brightness-50 p-4 rounded-lg w-full h-full overflow-hidden'>
      <div className='flex flex-col bg-zinc-950 shadow-lg p-4 rounded-lg w-full h-full overflow-hidden'>
         <h2 className='pb-6 text-2xl text-center'>Search results</h2>
         <section className='flex flex-col gap-4 overflow-y-auto grow'>
            {users.length > 0 && renderUserResults}
            {groups.length > 0 && renderGroupResults}
            {channels.length > 0 && renderChannelResults}
            {users.length === 0 &&
               groups.length === 0 &&
               channels.length === 0 && (
                  <p className='my-10 text-center text-lg'>
                     {loading ? 'Fetching Results...' : 'No results found'}
                  </p>
               )}
         </section>
      </div>
   )
}

export default React.memo(Search)
