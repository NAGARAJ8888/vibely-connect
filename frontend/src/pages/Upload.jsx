import React from 'react'
import { useState } from 'react';
import { MdOutlineKeyboardBackspace, MdCloudUpload, MdDelete, MdVideoLibrary, MdPhotoLibrary } from "react-icons/md";
import { FiPlusSquare } from "react-icons/fi";
import { IoImagesOutline, IoVideocamOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setPostData } from '../redux/postSlice';
import { setCurrentUserStory, setStoryData } from '../redux/storySlice';
import { setLoopData } from '../redux/loopSlice';
import { ClipLoader } from 'react-spinners';
import { setUserData } from '../redux/userSlice';

function Upload() {
    const navigate = useNavigate()
    const [uploadType, setUploadType] = useState("post")
    const [frontendMedia, setFrontendMedia] = useState(null)
    const [backendMedia, setBackendMedia] = useState(null)
    const [mediaType, setMediaType] = useState("")
    const [caption, setCaption] = useState("")
    const [dragActive, setDragActive] = useState(false)
    const mediaInput = useRef()
    const dispatch = useDispatch()
    const { postData } = useSelector(state => state.post)
    const { storyData } = useSelector(state => state.story)
    const { loopData } = useSelector(state => state.loop)
    const [loading, setLoading] = useState(false)

    const handleMedia = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.type.includes("image")) {
                setMediaType("image")
            } else if (file.type.includes("video")) {
                setMediaType("video")
            }
            setBackendMedia(file)
            setFrontendMedia(URL.createObjectURL(file))
        }
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        const file = e.dataTransfer.files[0]
        if (file) {
            if (uploadType === "loop" && !file.type.includes("video")) {
                alert("Loops only accept video files")
                return
            }
            if (file.type.includes("image")) {
                setMediaType("image")
            } else if (file.type.includes("video")) {
                setMediaType("video")
            }
            setBackendMedia(file)
            setFrontendMedia(URL.createObjectURL(file))
        }
    }

    const removeMedia = () => {
        setFrontendMedia(null)
        setBackendMedia(null)
        setMediaType("")
        setCaption("")
        if (mediaInput.current) {
            mediaInput.current.value = ""
        }
    }

    const uploadPost = async () => {
        try {
            const formData = new FormData()
            formData.append("caption", caption)
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverUrl}/api/post/upload`, formData, { withCredentials: true })
            dispatch(setPostData([...postData, result.data]))
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const uploadStory = async () => {
        try {
            const formData = new FormData()
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverUrl}/api/story/upload`, formData, { withCredentials: true })
            dispatch(setCurrentUserStory(result.data))
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const uploadLoop = async () => {
        try {
            const formData = new FormData()
            formData.append("caption", caption)
            formData.append("media", backendMedia)
            const result = await axios.post(`${serverUrl}/api/loop/upload`, formData, { withCredentials: true })
            dispatch(setLoopData([...loopData, result.data]))
            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleUpload = () => {
        if (!backendMedia) {
            alert("Please select a media file first")
            return
        }
        setLoading(true)
        if (uploadType == "post") {
            uploadPost()
        } else if (uploadType == "story") {
            uploadStory()
        } else {
            uploadLoop()
        }
    }

    const getAcceptedFileTypes = () => {
        if (uploadType === "loop") return "video/*"
        return "image/*,video/*"
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black'>
            {/* Header */}
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
                            Upload {uploadType}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Upload Type Selector */}
                <div className='flex justify-center mb-12'>
                    <div className='bg-white/5 backdrop-blur-sm p-2 rounded-2xl border border-white/10 inline-flex gap-2'>
                        {["post", "story", "loop"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setUploadType(type)}
                                className={`
                                    px-6 py-3 rounded-xl font-medium capitalize transition-all duration-300
                                    ${uploadType === type 
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upload Area */}
                {!frontendMedia ? (
                    <div
                        className={`
                            relative max-w-2xl mx-auto
                            border-2 border-dashed rounded-2xl transition-all duration-300
                            ${dragActive 
                                ? 'border-blue-500 bg-blue-500/10 scale-105' 
                                : 'border-white/20 hover:border-white/40 bg-white/5'
                            }
                        `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => mediaInput.current.click()}
                    >
                        <input 
                            type="file" 
                            accept={getAcceptedFileTypes()} 
                            hidden 
                            ref={mediaInput} 
                            onChange={handleMedia} 
                        />
                        
                        <div className='flex flex-col items-center justify-center py-16 px-8 cursor-pointer'>
                            <div className={`
                                w-20 h-20 rounded-full flex items-center justify-center mb-4
                                ${dragActive ? 'bg-blue-500/20' : 'bg-white/10'}
                                transition-all duration-300
                            `}>
                                <MdCloudUpload className={`
                                    w-10 h-10
                                    ${dragActive ? 'text-blue-400' : 'text-white/60'}
                                    transition-all duration-300
                                `} />
                            </div>
                            
                            <h3 className='text-xl font-semibold text-white mb-2'>
                                {dragActive ? 'Drop to upload' : `Upload ${uploadType}`}
                            </h3>
                            
                            <p className='text-gray-400 text-center mb-4'>
                                Drag and drop or click to select
                            </p>
                            
                            <div className='flex gap-3 text-sm text-gray-500'>
                                {uploadType !== "loop" && (
                                    <span className='flex items-center gap-1'>
                                        <IoImagesOutline /> Images
                                    </span>
                                )}
                                <span className='flex items-center gap-1'>
                                    <IoVideocamOutline /> Videos
                                </span>
                            </div>
                            
                            {uploadType === "loop" && (
                                <p className='text-xs text-yellow-500/70 mt-4'>
                                    Note: Loops only accept video files
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Media Preview */
                    <div className='max-w-2xl mx-auto'>
                        <div className='bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6'>
                            {/* Media Container */}
                            <div className='relative mb-6'>
                                <div className='rounded-xl overflow-hidden bg-black/50'>
                                    {mediaType === "image" ? (
                                        <img 
                                            src={frontendMedia} 
                                            alt="Preview" 
                                            className='w-full max-h-[400px] object-contain'
                                        />
                                    ) : (
                                        <div className='w-full max-h-[400px]'>
                                            <VideoPlayer media={frontendMedia} />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Remove Button */}
                                <button
                                    onClick={removeMedia}
                                    className='absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 rounded-full transition-all duration-300 group'
                                >
                                    <MdDelete className='w-5 h-5 text-white group-hover:scale-110 transition-transform' />
                                </button>
                            </div>

                            {/* Caption Input (for post and loop) */}
                            {uploadType !== "story" && (
                                <div className='mb-6'>
                                    <label className='block text-gray-300 text-sm font-medium mb-2'>
                                        Caption
                                    </label>
                                    <textarea
                                        className='w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none'
                                        placeholder='Write a caption...'
                                        rows={3}
                                        onChange={(e) => setCaption(e.target.value)}
                                        value={caption}
                                    />
                                </div>
                            )}

                            {/* Media Info */}
                            <div className='flex items-center gap-4 text-sm text-gray-400 mb-6'>
                                <span className='flex items-center gap-1'>
                                    {mediaType === "image" ? <IoImagesOutline /> : <IoVideocamOutline />}
                                    {mediaType === "image" ? "Image" : "Video"}
                                </span>
                                <span>•</span>
                                <span>{backendMedia?.name?.slice(0, 30)}...</span>
                            </div>

                            {/* Upload Button */}
                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className={`
                                    w-full py-4 rounded-xl font-semibold text-white
                                    transition-all duration-300 transform hover:scale-[1.02]
                                    ${loading 
                                        ? 'bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                                    }
                                `}
                            >
                                {loading ? (
                                    <div className='flex items-center justify-center gap-2'>
                                        <ClipLoader size={20} color='white' />
                                        <span>Uploading...</span>
                                    </div>
                                ) : (
                                    `Upload ${uploadType}`
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Upload