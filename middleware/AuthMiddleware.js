const isAdmin = (req,res,next) =>{
    if(req.user && req.user.role === "admin"){
        next();
    }else{
        res.status(403).json({message:'Access Declined! Only admin has access of this route'});
    };
};

const isAgency = (req,res,next)=>{
    if (req.user && req.user.role === 'agency') {
        next();
    } else {
        res.status(403).json({message:'Access Declined! Only agency has access of this route'});
    };
};


const isAgent = (req,res,next)=>{
    if (req.user && req.user.role === 'agent') {
        next();
    } else {
        res.status(403).json({message:'Access Declined! Only agent has access of this route'});
    };
};

module.exports = {isAdmin, isAgency, isAgent};