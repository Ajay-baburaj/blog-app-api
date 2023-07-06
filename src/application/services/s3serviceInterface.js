
export const s3serviceInterface = (service)=>{
    const uploadTos3 = async(file)=>{
        return await service.uploadTos3(file)
    }

    const getFromS3 = async(key)=>{
        return await service.getFromS3(key)
    }

    const deleteFromS3 = async(fileName)=>{
        return await service.deleteFromS3(fileName)
    }

    const changeIntoImgURL = async(postObj)=>{
        return service.changeIntoImgURL(postObj)
    }
    
    return{
        uploadTos3,
        getFromS3,
        deleteFromS3,
        changeIntoImgURL
    }
}

    