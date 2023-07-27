import { useEffect, useRef, useState } from 'react'
import './createModal.css'
import { useDispatch } from 'react-redux';
import { SET_MODAL_OPEN } from '../../reducers/appReducer';
import { useAnimate, usePresence, motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone';
import { ReactComponent as CreatePost } from './assets/createPost.svg'
import { ReactComponent as ArrowIcon } from './assets/arrowIcon.svg'
import { ref, getDownloadURL, uploadBytesResumable, deleteObject, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '../../firebase.js'
const CreateModal = () => {
    // const scope = useRef(null);
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate()
    const dispatch = useDispatch()
    const vidRef = useRef(null)
    const [stop, setStop] = useState(true)
    const [files, setFiles] = useState([])
    const [uploadFiles, setUploadFiles] = useState([])
    const [count, setCount] = useState(0)
    const [postName, setPostName] = useState("");
    const [isProgress, setIsProgress] = useState(false);

    const handlePlayPause = (e) => {
        // if (vidRef.current) {
        setStop(!stop)
        if (stop) {
            e.target.pause()
        }
        else {
            e.target.play()
        }
        // }
    }
    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const type = file.type.substring(0, file.type.indexOf('/'))
            const reader = new FileReader()
            reader.onload = () => {
                setFiles(prevFiles => [...prevFiles, { data: reader.result, type }])
            }
            reader.readAsDataURL(file);
            setUploadFiles(preFiles => [...preFiles, { type, data: file }])
        })
    }
    const { getRootProps, getInputProps } = useDropzone({
        onDrop, accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
            'video/mp4': ['.mp4']
        }, noClick: true
    })
    useEffect(() => {
        const pBar = document.querySelector('.progress')
        if (!isProgress) {
            if (pBar) {
                pBar.style.display = 'none';
            }
        } else {
            if (pBar) {
                pBar.style.display = 'block';
            }
        }
        function handleClickOutside(e) {
            if (!isProgress && scope.current && !scope.current.contains(e.target)) {
                dispatch(SET_MODAL_OPEN(false))
            }
        }
        document.addEventListener('click', handleClickOutside, true);
        if (isPresent) {
            const enterAnimation = async () => {
                await animate(scope.current, { opacity: [0, 1] }, { duration: .5 })

            }
            enterAnimation()
        } else {
            const exitAnimation = async () => {
                await animate({ opacity: [1, 0] }, { duration: .5 })
                safeToRemove()
            }
            exitAnimation()
        }


        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [files, animate, scope, safeToRemove, isPresent, dispatch, isProgress])

    const uploadPosts = async () => {
        try {

            // uploadFiles.forEach(async (file, i) => {
            setIsProgress(true);
            for (let i = 0; i < uploadFiles.length; i++) {

                const postRef = ref(storage, `posts/${uploadFiles[i].type + v4()}`)
                setPostName(postRef.name);
                const snapshot = await uploadBytes(postRef, uploadFiles[i].data)
                const url=await getDownloadURL(snapshot.ref)
                console.log(url);
                // const fileUpload = uploadBytesResumable(postRef, file.data)
                // fileUpload.on("state_changed",
                //     (snapshot) => {
                //         const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                //     },
                //     (err) => { console.log(err); },
                //     () => {
                //         getDownloadURL(fileUpload.snapshot.ref).then((url) => {
                //             if (i === files.length - 1) {
                //                 setIsProgress(false)
                //             }
                //         })
                //     }
                // )
                // })
            }
            setIsProgress(false);
            console.log('com');
        } catch (error) {
            setIsProgress(false);
            console.log(error);
        }

    }

    const deletePost = async() => {
        try {
            setIsProgress(true);
            const deleteRef = ref(storage, `posts/${postName}`);
            await deleteObject(deleteRef)
            console.log("deleted successfully");
            setIsProgress(false);
            
        } catch (error) {
            setIsProgress(false);
            console.log(error);
        }
    }
    return (
        <div className="createModal" >
            <div className="innerModal" ref={scope} >
                <div className="createModalTop">
                    <p>Create Post</p>
                </div>
                {
                    files.length === 0 ?
                        <div {...getRootProps()} className="createModaBottom">

                            <input {...getInputProps()} />
                            <CreatePost />
                            <p>Drag photos and videos here</p>
                            <div id='postDiv' >
                                <label htmlFor="postInp">Select from device</label>
                                <input multiple onChange={(e) => { onDrop([...e.target.files]) }} type="file" style={{ visibility: 'hidden' }} accept='image/png,image/jpg,image/jpeg,video/mp4' id="postInp" />
                            </div>
                        </div>
                        :
                        <div className='files'>
                            <motion.div key={count} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: "easeInOut" }} >
                                {files && files[count].type === 'video' ? <video autoPlay muted controls loop disablePictureInPicture controlsList="nodownload nofullscreen noplaybackrate" src={files[count].data} ref={vidRef} onClick={(e) => handlePlayPause(e)} /> : <img src={files[count].data} alt="" />}
                            </motion.div>
                            {count !== 0 && <div className="left" onClick={() => { if (count > 0) { setCount(count - 1) } }} >
                                <ArrowIcon />
                            </div>}
                            {
                                count !== files.length - 1 && <div className="right" onClick={() => { if (count < files.length - 1) { setCount(count + 1) } }} >
                                    <ArrowIcon />
                                </div>
                            }
                            {
                                (count === files.length - 1 && postName === "") && <button className='nextButton' onClick={uploadPosts}  >Upload</button>
                            }
                            {
                                (postName !== "") && <button className='nextButton' onClick={deletePost}  >Delete</button>
                            }
                            <div className="bar">
                                <div className="progress">

                                </div>
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default CreateModal