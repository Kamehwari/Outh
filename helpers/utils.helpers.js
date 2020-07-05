const sendResponse = async(res, code, msg, objectKey = data, objectValue = {})=>{
    try {
        let response = {
            code : code,
            message : msg,  
            [objectKey]: objectValue,
            lastFetchedDate:new Date()
        }
        res.status(code);
        res.json(response);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports={
    sendResponse
}