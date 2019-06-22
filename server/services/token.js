import jwt from 'jsonwebtoken';

function getToken(tokenData){
    
    const token = jwt.sign(tokenData, 'privateKEY', {expiresIn: '24h'});  
       
    return token;
}

export default getToken;