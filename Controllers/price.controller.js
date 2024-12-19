import priceModel from "../Models/priceModel.js";


// get all service price data
export const getPrice = async(req,res) => {
    try {
        let price = await priceModel.find();
        res.status(200).json({message:'price data fetched successfully' , price})
    } catch (error) {
        res.status(400).json({message:'price data fetching failed' , error})

    }
}

// post all service price data
export const setPrice =  async(req,res) => {
    const {generalServicePrice , repairServicePrice , washServicePrice} = req.body
    try {
        let setPrice = new priceModel({
            generalServicePrice,
            repairServicePrice,
            washServicePrice
        })

        setPrice.save()
        .then(response => res.status(200).json({message:'price allotment successful' , response}))
        .catch(err => res.status(400).json({message:'price allotment failed' , err}))
    } catch (error) {
        res.status(500).json({message:'internal server problem' , error})
    }
}


// update price
export const updatePrice = async(req,res) => {
    try {
       
        let update = await priceModel.updateOne({_id:req.params.id} , req.body )
        res.status(200).json({message:'price list updated' , update})
        
    } catch (error) {
        res.status(400).json({message:'update failed' , error})
    }
}


