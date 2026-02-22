import React from 'react'
import logo from "../assets/vibely.png"
import { FaRegHeart, FaHeart, FaRegComment, FaRegPaperPlane } from "react-icons/fa6";
import StoryDp from './StoryDp';
import Nav from './Nav';
import { useSelector } from 'react-redux';
import { BiMessageAltDetail } from "react-icons/bi";
import { MdOutlineNotificationsNone, MdNotificationsNone } from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import Post from './Post';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Feed.css';

function Feed() {
  const { postData } = useSelector(state => state.post)
  const { userData, notificationData } = useSelector(state => state.user)
  const { storyList, currentUserStory } = useSelector(state => state.story)
  const navigate = useNavigate()
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Check for unread notifications
  const hasUnreadNotifications = notificationData?.some(noti => noti.isRead === false)

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const feedElement = document.getElementById('feed-container')
      if (feedElement) {
        setShowScrollTop(feedElement.scrollTop > 300)
      }
    }

    const feedElement = document.getElementById('feed-container')
    feedElement?.addEventListener('scroll', handleScroll)
    return () => feedElement?.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const feedElement = document.getElementById('feed-container')
    feedElement?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div 
      id="feed-container"
      className='lg:w-[50%] w-full bg-gradient-to-b from-gray-900 to-black min-h-screen lg:h-screen relative lg:overflow-y-auto scroll-smooth'
    >
      {/* Modern Header with Glass Effect */}
      <div className='sticky top-0 z-20 backdrop-blur-lg bg-black/30 border-b border-white/10'>
        <div className='flex items-center justify-between px-4 sm:px-6 py-3'>
          {/* Logo */}
          <img 
            src={logo} 
            alt="Logo" 
            className='w-20 sm:w-24 cursor-pointer hover:opacity-80 transition-opacity'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Action Icons */}
          <div className='flex items-center gap-3 sm:gap-4'>
            {/* Notifications */}
            <div 
              className='relative group cursor-pointer md:hidden' 
              onClick={() => navigate("/notifications")}
            >
              <div className='p-2 hover:bg-white/10 rounded-full transition-all duration-300 group-hover:scale-110'>
                <MdNotificationsNone className='text-white w-6 h-6 sm:w-7 sm:h-7' />
              </div>
              {hasUnreadNotifications && (
                <>
                  <div className='absolute top-1 right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse'></div>
                  <div className='absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping'></div>
                </>
              )}
            </div>

            {/* Messages */}
            <div 
              className='p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer group md:hidden'
              onClick={() => navigate("/messages")}
            >
              <IoChatbubbleOutline className='text-white w-6 h-6 sm:w-7 sm:h-7 group-hover:text-blue-400 transition-colors' />
            </div>
          </div>
        </div>
      </div>

      {/* Stories Section with Modern Design */}
      <div className='relative py-6 px-4 sm:px-6'>
        {/* Gradient Background for Stories */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none'></div>
        
        {/* Stories Container */}
        <div className='relative'>
          <h2 className='text-white text-sm font-semibold mb-3 ml-1'>Stories</h2>
          <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x'>
            {/* Your Story */}
            <div className='snap-start'>
              <StoryDp 
                userName={"Your Story"} 
                ProfileImage={userData.profileImage} 
                story={currentUserStory}
              />
            </div>

            {/* Other Stories */}
            {storyList?.map((story, index) => (
              <div key={story._id || index} className='snap-start'>
                <StoryDp 
                  userName={story.author.userName} 
                  ProfileImage={story.author.profileImage} 
                  story={story} 
                />
              </div>
            ))}

            {/* Empty State for Stories */}
            {(!storyList || storyList.length === 0) && (
              <div className='flex items-center justify-center w-full'>
                <p className='text-gray-500 text-sm'>No stories to show</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feed Posts Section */}
      <div className='relative min-h-screen'>
        {/* Decorative Top Gradient */}
        <div className='absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent pointer-events-none'></div>
        
        {/* Posts Container */}
        <div className='relative flex flex-col items-center gap-6 px-4 sm:px-6 pb-32'>
          {/* Feed Header */}
          <div className='w-full max-w-2xl flex items-center justify-between mb-2'>
            <h2 className='text-white text-lg font-semibold'>Feed</h2>
            <span className='text-gray-400 text-sm'>{postData?.length || 0} posts</span>
          </div>

          {/* Posts Grid/List */}
          <div className='w-full max-w-2xl space-y-6'>
            {postData && postData.length > 0 ? (
              postData.map((post, index) => (
                <div 
                  key={post._id || index} 
                  className='transform transition-all duration-300 hover:scale-[1.02]'
                >
                  <Post post={post} />
                </div>
              ))
            ) : (
              // Empty State for Posts
              <div className='text-center py-16 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10'>
                <div className='flex flex-col items-center gap-4'>
                  <div className='w-20 h-20 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center'>
                    <FaRegPaperPlane className='w-8 h-8 text-blue-400' />
                  </div>
                  <h3 className='text-white text-xl font-semibold'>No posts yet</h3>
                  <p className='text-gray-400 max-w-sm'>
                    When people share posts, they'll appear here. Start by following some users!
                  </p>
                  <button
                    onClick={() => navigate("/search")}
                    className='mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105'
                  >
                    Find People to Follow
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-24 right-4 sm:bottom-28 sm:right-8 z-30 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-bounce'
        >
          <svg 
            className='w-5 h-5 text-white' 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Navigation */}
      <div className='flex justify-center items-center'>
        <Nav />
      </div>
    </div>
  )
}

export default Feed