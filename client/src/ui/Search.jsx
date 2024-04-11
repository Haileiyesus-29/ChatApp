/* eslint-disable react/prop-types */
import SearchResult from '@/components/SearchResult'
import React, { useMemo } from 'react'

function Search({ searchResults, loading, setSearchInput }) {
   const renderUserResults = useMemo(() => {
      return (
         <ul className='flex flex-col gap-2'>
            <div className='px-3 text-lg'>Users</div>
            {searchResults.users.map(user => (
               <SearchResult
                  key={user.id}
                  account={user}
                  type='user'
                  setSearchInput={setSearchInput}
               />
            ))}
         </ul>
      )
   }, [searchResults.users])

   const renderGroupResults = useMemo(() => {
      return (
         <ul className='flex flex-col gap-2'>
            <div className='px-3 text-lg'>Groups</div>
            {searchResults.groups.map(group => (
               <SearchResult
                  key={group.id}
                  account={group}
                  type='group'
                  setSearchInput={setSearchInput}
               />
            ))}
         </ul>
      )
   }, [searchResults.groups])

   const renderChannelResults = useMemo(() => {
      return (
         <ul className='flex flex-col gap-2'>
            <div className='px-3 text-lg'>Channels</div>
            {searchResults.channels.map(channel => (
               <SearchResult
                  key={channel.id}
                  account={channel}
                  type='channel'
                  setSearchInput={setSearchInput}
               />
            ))}
         </ul>
      )
   }, [searchResults.channels])

   return (
      <div className='flex flex-col bg-zinc-50/10 shadow-lg backdrop-blur backdrop-brightness-50 p-4 rounded-lg w-full h-full overflow-hidden'>
         <h2 className='pb-6 text-2xl text-center'>Search results</h2>
         <section className='flex flex-col gap-4 overflow-y-auto grow'>
            {searchResults.users.length > 0 && renderUserResults}
            {searchResults.groups.length > 0 && renderGroupResults}
            {searchResults.channels.length > 0 && renderChannelResults}
            {searchResults.users.length === 0 &&
               searchResults.groups.length === 0 &&
               searchResults.channels.length === 0 && (
                  <p className='my-10 text-center text-lg'>
                     {loading ? 'Fetching Results...' : 'No results found'}
                  </p>
               )}
         </section>
      </div>
   )
}

export default React.memo(Search)
