import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setFollowing, toggleFollow } from '../redux/userSlice'

function FollowButton({targetUserId,tailwind,onFollowChange}) {
    const {following}=useSelector(state=>state.user)
    const targetId = typeof targetUserId === 'object' ? targetUserId._id : targetUserId
    const isFollowing = following.includes(targetId?.toString())
    const dispatch=useDispatch()
    const handleFollow=async ()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/user/follow/${targetId}`,{withCredentials:true})
            if(onFollowChange){
                onFollowChange()
            }
            dispatch(toggleFollow(targetId))
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <button className={tailwind} onClick={handleFollow}>
{isFollowing?"Following":"Follow"}
    </button>
  )
}

export default FollowButton