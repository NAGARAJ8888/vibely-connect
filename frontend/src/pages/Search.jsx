import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace, MdSearch, MdClear } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { IoPeopleOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchData } from '../redux/userSlice';
import dp from "../assets/dp.webp"

function Search() {
    const navigate = useNavigate()
    const [input, setInput] = useState("")
    const [searchData, setSearchData] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [recentSearches, setRecentSearches] = useState([])
    const dispatch = useDispatch()

    const handleSearch = async () => {
        if (!input.trim()) {
            setSearchData([])
            return
        }
        
        setIsSearching(true)
        try {
            const result = await axios.get(`${serverUrl}/api/user/search?keyWord=${input}`, { withCredentials: true })
            setSearchData(result.data)
            
            // Save to recent searches (you can implement localStorage persistence)
            if (result.data.length > 0) {
                // You can implement recent searches logic here
            }
        } catch (error) {
            console.log(error)
            setSearchData([])
        } finally {
            setIsSearching(false)
        }
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (input) {
                handleSearch()
            } else {
                setSearchData([])
            }
        }, 300) // Debounce for better performance

        return () => clearTimeout(delayDebounce)
    }, [input])

    const clearSearch = () => {
        setInput("")
        setSearchData([])
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black'>
            {/* Header with Glass Effect */}
            <div className='sticky top-0 z-10 backdrop-blur-lg bg-black/30 border-b border-white/10'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center gap-4 h-16'>
                        <button 
                            onClick={() => navigate(`/`)}
                            className='p-2 hover:bg-white/10 rounded-full transition-all duration-300 group'
                        >
                            <MdOutlineKeyboardBackspace className='text-white w-6 h-6 group-hover:scale-110 transition-transform' />
                        </button>
                        <h1 className='text-xl font-semibold text-white tracking-tight'>
                            Search
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Search Bar */}
                <div className='relative mb-8'>
                    <div className='relative group'>
                        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                            <FiSearch className='w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors' />
                        </div>
                        
                        <input 
                            type="text" 
                            placeholder='Search for people...' 
                            className='w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg'
                            onChange={(e) => setInput(e.target.value)} 
                            value={input}
                            autoFocus
                        />
                        
                        {input && (
                            <button 
                                onClick={clearSearch}
                                className='absolute inset-y-0 right-0 pr-4 flex items-center'
                            >
                                <MdClear className='w-5 h-5 text-gray-400 hover:text-white transition-colors' />
                            </button>
                        )}
                    </div>

                    {/* Search Hint */}
                    {!input && !isSearching && (
                        <div className='absolute left-1/2 -translate-x-1/2 mt-8 text-center w-full'>
                            <div className='inline-flex flex-col items-center gap-3'>
                                <div className='w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center'>
                                    <MdSearch className='w-8 h-8 text-blue-400' />
                                </div>
                                <p className='text-gray-500 text-lg'>Start typing to search for users</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {isSearching && (
                    <div className='flex justify-center py-12'>
                        <div className='flex gap-2'>
                            <div className='w-3 h-3 rounded-full bg-blue-500 animate-bounce' style={{ animationDelay: '0s' }}></div>
                            <div className='w-3 h-3 rounded-full bg-purple-500 animate-bounce' style={{ animationDelay: '0.1s' }}></div>
                            <div className='w-3 h-3 rounded-full bg-pink-500 animate-bounce' style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>
                )}

                {/* Search Results */}
                {input && !isSearching && (
                    <div className='space-y-4'>
                        {/* Results Header */}
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-lg font-semibold text-white'>
                                {searchData?.length > 0 
                                    ? `${searchData.length} result${searchData.length > 1 ? 's' : ''} found` 
                                    : 'No results found'
                                }
                            </h2>
                            {searchData?.length > 0 && (
                                <span className='text-sm text-gray-400'>
                                    Showing {searchData.length} of {searchData.length}
                                </span>
                            )}
                        </div>

                        {/* Results Grid */}
                        {searchData?.length > 0 ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {searchData.map((user, index) => (
                                    <div
                                        key={index}
                                        onClick={() => navigate(`/profile/${user.userName}`)}
                                        className='group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02]'
                                    >
                                        <div className='flex items-center gap-4'>
                                            {/* Profile Image */}
                                            <div className='relative'>
                                                <div className='w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-[2px]'>
                                                    <div className='w-full h-full rounded-full overflow-hidden border-2 border-gray-900'>
                                                        <img 
                                                            src={user.profileImage || dp} 
                                                            alt={user.userName}
                                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                                        />
                                                    </div>
                                                </div>
                                                {/* Online Indicator (optional - you can implement if you have online status) */}
                                                <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900'></div>
                                            </div>

                                            {/* User Info */}
                                            <div className='flex-1 min-w-0'>
                                                <h3 className='text-white font-semibold text-lg truncate'>
                                                    {user.userName}
                                                </h3>
                                                <p className='text-gray-400 text-sm truncate'>
                                                    {user.name || 'No name'}
                                                </p>
                                                {user.profession && (
                                                    <p className='text-blue-400 text-xs mt-1'>
                                                        {user.profession}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Follow Info (optional - can be enhanced) */}
                                            {user.followers && (
                                                <div className='text-xs text-gray-500 flex items-center gap-1'>
                                                    <FaUserFriends className='w-3 h-3' />
                                                    <span>{user.followers.length}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Empty State
                            <div className='text-center py-16'>
                                <div className='inline-flex flex-col items-center gap-4'>
                                    <div className='w-20 h-20 rounded-full bg-white/5 flex items-center justify-center'>
                                        <IoPeopleOutline className='w-10 h-10 text-gray-500' />
                                    </div>
                                    <div>
                                        <h3 className='text-white text-xl font-semibold mb-2'>
                                            No users found
                                        </h3>
                                        <p className='text-gray-400'>
                                            Try searching with a different name or username
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Recent Searches (Optional Feature) */}
                {!input && recentSearches.length > 0 && (
                    <div className='mt-12'>
                        <h2 className='text-lg font-semibold text-white mb-4'>Recent Searches</h2>
                        <div className='space-y-2'>
                            {recentSearches.map((search, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer'
                                    onClick={() => setInput(search)}
                                >
                                    <div className='flex items-center gap-3'>
                                        <FiSearch className='w-4 h-4 text-gray-400' />
                                        <span className='text-gray-300'>{search}</span>
                                    </div>
                                    <button className='text-gray-500 hover:text-white transition-colors'>
                                        <MdClear className='w-4 h-4' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search