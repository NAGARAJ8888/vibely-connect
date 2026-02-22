import axios from 'axios'
import React from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../redux/userSlice'
import { useEffect } from 'react'
import { MdOutlineKeyboardBackspace, MdLogout, MdEdit, MdMessage, MdGridOn, MdBookmarkBorder, MdMoreHoriz } from "react-icons/md";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import dp from "../assets/dp.webp"
import Nav from '../components/Nav'
import FollowButton from '../components/FollowButton'
import Post from '../components/Post'
import { useState } from 'react'
import { setSelectedUser } from '../redux/messageSlice'

function Profile() {
    const { userName } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [postType, setPostType] = useState("posts")
    const [activeTab, setActiveTab] = useState("posts")
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
    const { profileData, userData } = useSelector(state => state.user)
    const { postData } = useSelector(state => state.post)

    const handleProfile = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/getProfile/${userName}`, { withCredentials: true })
            dispatch(setProfileData(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleProfile()
    }, [userName, dispatch])

    const isOwnProfile = profileData?._id === userData?._id

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black pb-18 md:pb-20'>
            {/* Modern Header with Glass Effect */}
            <div className='sticky top-0 z-10 backdrop-blur-lg bg-black/30 border-b border-white/10  mb-16'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-16'>
                        <button 
                            onClick={() => navigate("/")}
                            className='p-2 hover:bg-white/10 rounded-full transition-all duration-300 group'
                        >
                            <MdOutlineKeyboardBackspace className='text-white w-6 h-6 group-hover:scale-110 transition-transform' />
                        </button>
                        
                        <h1 className='text-xl font-semibold text-white tracking-tight'>
                            {profileData?.userName}
                        </h1>
                        
                        {isOwnProfile ? (
                            <button
                                onClick={() => setShowLogoutConfirm(true)}
                                className='p-2 hover:bg-white/10 rounded-full transition-all duration-300 group'
                            >
                                <MdLogout className='text-white w-6 h-6 group-hover:text-red-400 transition-colors' />
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate("/")}
                                className='p-2 hover:bg-white/10 rounded-full transition-all duration-300'
                            >
                                <MdMoreHoriz className='text-white w-6 h-6' />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
                    <div className='bg-gray-900 rounded-2xl p-6 max-w-sm w-full border border-white/10 animate-fadeIn'>
                        <h3 className='text-white text-xl font-semibold mb-2'>Log out?</h3>
                        <p className='text-gray-400 mb-6'>Are you sure you want to log out from your account?</p>
                        <div className='flex gap-3'>
                            <button
                                onClick={handleLogOut}
                                className='flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300'
                            >
                                Log out
                            </button>
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className='flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Header Section */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10'>
                <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10'>
                    {/* Profile Image with Gradient Border */}
                    <div className='relative group'>
                        <div className='w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1'>
                            <div className='w-full h-full rounded-full overflow-hidden border-4 border-gray-900'>
                                <img 
                                    src={profileData?.profileImage || dp} 
                                    alt={profileData?.name}
                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                />
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className='flex-1 text-center sm:text-left'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-white mb-2'>
                            {profileData?.name}
                        </h2>
                        
                        {profileData?.profession && (
                            <p className='text-lg text-blue-400 mb-2 font-medium'>
                                {profileData.profession}
                            </p>
                        )}
                        
                        {profileData?.bio && (
                            <p className='text-gray-300 max-w-2xl mb-4'>
                                {profileData.bio}
                            </p>
                        )}

                        {/* Stats Cards */}
                        <div className='flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 mb-4'>
                            <div className='bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10'>
                                <div className='text-2xl font-bold text-white'>{profileData?.posts?.length || 0}</div>
                                <div className='text-sm text-gray-400'>Posts</div>
                            </div>
                            
                            <div className='bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10'>
                                <div className='flex items-center gap-2'>
                                    <div className='flex -space-x-2'>
                                        {profileData?.followers?.slice(0, 3).map((user, index) => (
                                            <div key={index} className='w-6 h-6 rounded-full border-2 border-gray-900 overflow-hidden'>
                                                <img src={user.profileImage || dp} alt="" className='w-full h-full object-cover' />
                                            </div>
                                        ))}
                                    </div>
                                    <span className='text-2xl font-bold text-white'>{profileData?.followers?.length || 0}</span>
                                </div>
                                <div className='text-sm text-gray-400'>Followers</div>
                            </div>
                            
                            <div className='bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10'>
                                <div className='flex items-center gap-2'>
                                    <div className='flex -space-x-2'>
                                        {profileData?.following?.slice(0, 3).map((user, index) => (
                                            <div key={index} className='w-6 h-6 rounded-full border-2 border-gray-900 overflow-hidden'>
                                                <img src={user?.profileImage || dp} alt="" className='w-full h-full object-cover' />
                                            </div>
                                        ))}
                                    </div>
                                    <span className='text-2xl font-bold text-white'>{profileData?.following?.length || 0}</span>
                                </div>
                                <div className='text-sm text-gray-400'>Following</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-wrap justify-center sm:justify-start gap-3'>
                            {isOwnProfile ? (
                                <button
                                    onClick={() => navigate("/editprofile")}
                                    className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105'
                                >
                                    <MdEdit className='w-5 h-5' />
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <FollowButton 
                                        tailwind={'flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105'} 
                                        targetUserId={profileData?._id} 
                                        onFollowChange={handleProfile} 
                                    />
                                    <button
                                        onClick={() => {
                                            dispatch(setSelectedUser(profileData))
                                            navigate("/messageArea")
                                        }}
                                        className='flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10'
                                    >
                                        <MdMessage className='w-5 h-5' />
                                        Message
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className='border-t border-white/10 mt-6'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    {/* Tabs Navigation */}
                    <div className='flex justify-center gap-2 py-4'>
                        {isOwnProfile ? (
                            <>
                                <button
                                    onClick={() => setPostType("posts")}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                        postType === "posts" 
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <MdGridOn className='w-5 h-5' />
                                    <span className='hidden sm:inline'>Posts</span>
                                </button>
                                <button
                                    onClick={() => setPostType("saved")}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                        postType === "saved" 
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <MdBookmarkBorder className='w-5 h-5' />
                                    <span className='hidden sm:inline'>Saved</span>
                                </button>
                            </>
                        ) : (
                            <button
                                className='flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                            >
                                <MdGridOn className='w-5 h-5' />
                                <span>Posts</span>
                            </button>
                        )}
                    </div>

                    {/* Posts Grid */}
                    <div className='py-8'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {isOwnProfile ? (
                                <>
                                    {postType === "posts" && postData.map((post, index) => (
                                        post.author?._id === profileData?._id && (
                                            <div key={index} className='transform hover:scale-105 transition-all duration-300'>
                                                <Post post={post} />
                                            </div>
                                        )
                                    ))}
                                    {postType === "saved" && postData.map((post, index) => (
                                        userData?.saved?.includes(post._id) && (
                                            <div key={index} className='transform hover:scale-105 transition-all duration-300'>
                                                <Post post={post} />
                                            </div>
                                        )
                                    ))}
                                </>
                            ) : (
                                postData.map((post, index) => (
                                    post.author?._id === profileData?._id && (
                                        <div key={index} className='transform hover:scale-105 transition-all duration-300'>
                                            <Post post={post} />
                                        </div>
                                    )
                                ))
                            )}
                        </div>

                        {/* Empty State */}
                        {((isOwnProfile && postType === "posts" && !postData.some(post => post.author?._id === profileData?._id)) ||
                          (isOwnProfile && postType === "saved" && !userData?.saved?.length) ||
                          (!isOwnProfile && !postData.some(post => post.author?._id === profileData?._id))) && (
                            <div className='text-center py-20'>
                                <div className='text-6xl mb-4 opacity-30'>
                                    {postType === "saved" ? '🔖' : '📷'}
                                </div>
                                <h3 className='text-xl font-semibold text-white mb-2'>
                                    {postType === "saved" ? 'No saved posts yet' : 'No posts yet'}
                                </h3>
                                <p className='text-gray-400'>
                                    {postType === "saved" 
                                        ? 'Posts you save will appear here' 
                                        : isOwnProfile 
                                            ? 'Share your first post with the world!' 
                                            : 'This user hasn\'t posted anything yet'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fixed Position Nav at Bottom - Exactly Centered */}
            <div className='fixed bottom-0 left-0 right-0 flex justify-center items-center z-20 pb-4'>
                <Nav />
            </div>
        </div>
    )
}

export default Profile