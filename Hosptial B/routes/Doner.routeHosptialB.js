const express = require("express")

const Doner = require("../models/Doner.modelHosptialB");
const asyncwrapper = require('../middlewares/asyncwrapper')
const httpsStatusText = require('../utils/httpsStatusText')
const appError = require('../utils/appError')

const router = express.Router();


// router.post('/Doners',(req,res)=>{
//     console.log(req.body)

//     if(Doner.hosptial === "Hospital A"){
//         const doner = new Doner(req.body)
//         doner.save()
//         .then((doner)=>{res.send(doner)})
        

//     }else{
//         catch((e)=>{res.send(e)})
//     }

  
// })

router.post('/DonerB', (req, res) => {
    console.log(req.body);

    if (req.body.hospital === "Hospital B") {
        const doner = new Doner(req.body);
        doner.save()
            .then((doner) => {
                res.send(doner);
            })
            .catch((e) => {
                res.status(500).send(e); // Sending a proper HTTP status code in case of an error
            });
    } else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
});


router.get("/DonerB",asyncwrapper( async(req, res, next)=>{
        const query = req.query
        console.log("query: " ,query)
        const limit = query.limit || 100  
        const page  = query.page || 1
        const skip = (page -1 ) * limit
    
        const doners = await Doner.find({},{"__v":false}).limit(limit).skip(skip)
        res.json({stauts: httpsStatusText.SUCCESS , data:{doners}})
        console.log(doners)
    })
)

router.patch('/DonerB/:id',async(req,res)=>{
    if (req.body.hospital === "Hospital B"){

        try{
            const _id = req.params.id
            
            const new_doner = await Doner.findByIdAndUpdate(_id, req.body ,{
                new:true,
                runValidators :true
            })
    
            if(!new_doner){
               return res.status(404).send("id not find")
            }
            res.status(200).send(new_doner)
    
        }
        catch(e){
            res.status(400).send(e)
        }


    }
    else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
  
}
)

router.delete('/DonerB/:id',async(req,res)=>{
    try{
        const _id = req.params.id

        const new_doner = await Doner.findByIdAndDelete(_id)

        if(!new_doner){
            res.status(404).send('can not find id')
        }
        res.status(200).send('successful to delete data',new_doner)
    }
    catch(e){
        res.status(403).send(e)
    }
})




module.exports=router





