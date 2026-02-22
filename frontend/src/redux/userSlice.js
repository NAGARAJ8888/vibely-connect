import { createSlice } from "@reduxjs/toolkit"
const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        suggestedUsers:null,
        profileData:null,
        following:[],
        searchData:null,
        notificationData:[]
    },
    reducers:{
       setUserData:(state,action)=>{
        state.userData=action.payload
        if (action.payload?.following && Array.isArray(action.payload.following)) {
            state.following = action.payload.following.map(user => {
                const id = typeof user === 'object' ? user._id : user
                return id ? id.toString() : null
            }).filter(Boolean)
        }
       } ,
       setSuggestedUsers:(state,action)=>{
        state.suggestedUsers=action.payload
       } ,
       setProfileData:(state,action)=>{
        state.profileData=action.payload
       } ,
       setSearchData:(state,action)=>{
        state.searchData=action.payload
       },
        setNotificationData:(state,action)=>{
        state.notificationData=action.payload
       },
       setFollowing:(state,action)=>{
        state.following=Array.isArray(action.payload) ? action.payload.map(id => id.toString()) : []
       },
       toggleFollow:(state,action)=>{
        const targetUserId=action.payload.toString()
        if(state.following.some(id => id.toString() === targetUserId)){
            state.following=state.following.filter(id=>id.toString() !== targetUserId)
        }else{
            state.following.push(targetUserId)
        }
       }
    }

})

export const {setUserData,setSuggestedUsers,setProfileData,toggleFollow,setFollowing,setSearchData,setNotificationData}=userSlice.actions
export default userSlice.reducer