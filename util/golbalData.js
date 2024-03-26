
const TitleObj = {};  
const now = Date.now || function () {  
    return new Date().getTime();  
};  
const isArray = Array.isArray || function (obj) {  
    return obj instanceof Array;  
};  

export default {   
    now,  
    isArray,
	TitleObj
}