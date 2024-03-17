
const Donor = require('../models/donor.models')
const asyncwrapper = require('../middlewares/asyncwrapper')
const httpsStatusText = require('../utils/httpsStatusText')

// addAllDonors
const addAllDonors=(req, res) => {
    console.log(req.body);

    if (req.body.hospital === "Hospital A") {
        const donorA = new Donor(req.body);
        donorA.save()
            .then((donorA) => {
                res.send(donorA);
            })
            .catch((e) => {
                res.status(500).send(e); // Sending a proper HTTP status code in case of an error
            });
    }
        
    else if(req.body.hospital === "Hospital B") {
        const donorB = new Donor(req.body);
        donorB.save()
            .then((donorB) => {
                    res.send(donorB);
            })
            .catch((e) => {
                res.status(500).send(e); // Sending a proper HTTP status code in case of an error
            });
        }

        else if(req.body.hospital === "Hospital C") {
            const donorC = new Donor(req.body);
            donorC.save()
                .then((donorC) => {
                    res.send(donorC);
                })
                .catch((e) => {
                    res.status(500).send(e); // Sending a proper HTTP status code in case of an error
                });
        }else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
};


// get hospital A 
const getDonorHospitalA = async(req,res) => {
    try{
        const donorA = await Donor.find({hospital:'Hospital A'},{"__v":false})
        res.json({status:httpsStatusText.SUCCESS,data:{donorA}})
    }catch(err){
        res.json({status:httpsStatusText.ERROR,message:err.message})
    }
};

// get hospital B
const getDonorHospitalB = async(req,res) => {
    try{
        const donorB = await Donor.find({hospital:'Hospital B'},{"__v":false})
        res.json({status:httpsStatusText.SUCCESS,data:{donorB}})
    }catch(err){
        res.json({status:httpsStatusText.ERROR,message:err.message})
    }
};

// get hospital C
const getDonorHospitalC = async(req,res) => {
    try{
        const donorC = await Donor.find({hospital:'Hospital C'},{"__v":false})
        res.json({status:httpsStatusText.SUCCESS,data:{donorC}})
    }catch(err){
        res.json({status:httpsStatusText.ERROR,message:err.message})
    }
};



// update information Hospital A
const updateDonorHospitalA = async(req,res) => {
    if(req.body.hospital === 'Hospital A'){
        try{
            const _id = req.params.id
            const updateDonor = await Donor.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })
            if(!updateDonor){
                return res.status(400).json({
                    message:httpsStatusText.FAIL,data:{message:"Donor not found"}
                })
            } res.json({success:httpsStatusText.SUCCESS,data:{updateDonor}})
        }catch(e){
            res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
        }
   }
    else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
};

// update information Hospital B
const updateDonorHospitalB = async(req,res) => {
    if(req.body.hospital === 'Hospital B'){
        try{
            const _id = req.params.id
            const updateDonor = await Donor.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })
            if(!updateDonor){
                return res.status(400).json({
                    message:httpsStatusText.FAIL,data:{message:"Donor not found"}
                })
            } res.json({success:httpsStatusText.SUCCESS,data:{updateDonor}})
        }catch(e){
            res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
        }
   }
};

// update information Hospital C
const updateDonorHospitalC = async(req,res) => {
    if(req.body.hospital === 'Hospital C'){
        try{
            const _id = req.params.id
            const updateDonor = await Donor.findByIdAndUpdate(_id,req.body,{
                new:true,
                runValidators:true,
            })
            if(!updateDonor){
                return res.status(400).json({
                    message:httpsStatusText.FAIL,data:{message:"Donor not found"}
                })
            } res.json({success:httpsStatusText.SUCCESS,data:{updateDonor}})
        }catch(e){
            res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
        }
   }
};




// delete info donor hospital A
const deleteDonorHospitalA = async(req,res) => {
    
        try{
            const _id = req.params.id
            const deleteDonor = await Donor.findByIdAndDelete(_id)
            if(!deleteDonor){
                return res.status(400).json({
                    message:httpsStatusText.FAIL,data:{message:"Donor not found"}
                })
            } res.json({success:httpsStatusText.SUCCESS,data:{deleteDonor}})
        }catch(e){
            res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
        }
};


// delete info donor hospital B
const deleteDonorHospitalB = async(req,res) => {
   
    try{
        const _id = req.params.id
        const deleteDonor = await Donor.findByIdAndDelete(_id)
        if(!deleteDonor){
            return res.status(400).json({
                message:httpsStatusText.FAIL,data:{message:"Donor not found"}
            })
        } res.json({success:httpsStatusText.SUCCESS,data:{deleteDonor}})
    }catch(e){
        res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
    }
};


// delete info donor hospital C
const deleteDonorHospitalC = async(req,res) => {

    try{
        const _id = req.params.id
        const deleteDonor = await Donor.findByIdAndDelete(_id)
        if(!deleteDonor){
            return res.status(400).json({
                message:httpsStatusText.FAIL,data:{message:"Donor not found"}
            })
        } res.json({success:httpsStatusText.SUCCESS,data:{deleteDonor}})
    }catch(e){
        res.status(401).json({success:httpsStatusText.ERROR,data:null,message:e.message,code:401})
    }
};




module.exports = {
    addAllDonors,
    getDonorHospitalA,
    getDonorHospitalB,
    getDonorHospitalC,
    updateDonorHospitalA,
    updateDonorHospitalB,
    updateDonorHospitalC,
    deleteDonorHospitalA,
    deleteDonorHospitalB,
    deleteDonorHospitalC,
}