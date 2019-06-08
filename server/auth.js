const fs = require('fs');
const jwt  = require('jsonwebtoken');

function authenticateUser(email){
    // PAYLOAD
    let payload = {
       userEmail: email,
   };
   // PRIVATE and PUBLIC key
   let privateKEY  = fs.readFileSync('./private.key', 'utf8');
   //let publicKEY  = fs.readFileSync('./public.key', 'utf8');

   let i  = 'AutoMart';     
   let s  = email;        
   let a  = 'http://automart.in'; 
 
   // SIGNING OPTIONS
   let signOptions = {
       issuer:  i,
       subject:  s,
       audience:  a,
       expiresIn:  "1h",
       algorithm:  "RS256"
   };
   
   const token = jwt.sign(payload, privateKEY, signOptions);   
   
   return token;
}

export default authenticateUser;