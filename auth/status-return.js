const router = require('express').Router();

router.get('/', (req, res) => { 
    if(res){
        res.status(200).json({message:'server is running'});
    }else{
        res.status(500).json({message:'server not running'})
    }
})

module.exports = router; 