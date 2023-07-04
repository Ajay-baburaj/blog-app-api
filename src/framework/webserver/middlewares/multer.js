import multer from "multer"

const multerMiddleWare =()=>{
    const storage = multer.memoryStorage()
    const upload = multer({ storage })

    return{
        upload
    }

}

export default multerMiddleWare