const express = require("express")

const Patiant = require("../models/patiant.modelHosptialC");
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

router.post('/patiantC', (req, res) => {
    console.log(req.body);

    if (req.body.hospital === "Hospital C") {
        const patiantC = new Patiant(req.body);
        patiantC.save()
            .then((patiantC) => {
                res.send(patiantC);
            })
            .catch((e) => {
                res.status(500).send(e); // Sending a proper HTTP status code in case of an error
            });
    } else {
        res.status(403).send("Invalid hospital"); // Sending a proper HTTP status code for forbidden access
    }
});

router.get("/patiantC",asyncwrapper( async(req, res, next)=>{
    const query = req.query
    console.log("query: " ,query)
    const limit = query.limit || 100  
    const page  = query.page || 1
    const skip = (page -1 ) * limit

    const patiant = await Patiant.find({},{"__v":false}).limit(limit).skip(skip)
    res.json({stauts: httpsStatusText.SUCCESS , data:{patiant}})
    console.log(patiant)
})
)

router.patch('/DonerC/:id',async(req,res)=>{
    if (req.body.hospital === "Hospital C"){

        try{
            const _id = req.params.id
            
            const new_patiant = await Patiant.findByIdAndUpdate(_id, req.body ,{
                new:true,
                runValidators :true
            })
    
            if(!new_patiant){
               return res.status(404).send("id not find")
            }
            res.status(200).send(new_patiant)
    
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


router.delete('/DonerC/:id',async(req,res)=>{
    try{
        const _id = req.params.id

        const new_patiant = await Patiant.findByIdAndDelete(_id)

        if(!new_patiant){
            res.status(404).send('can not find id')
        }
        res.status(200).send('successful to delete data',new_patiant)
    }
    catch(e){
        res.status(403).send(e)
    }
})





module.exports=router