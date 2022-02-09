const express = require("express");
const router = express.Router()
const Alien = require('../models/alien')

router.get('/',async(req,res)=>{
    try {
        const aliens = await Alien.find()
        res.json(aliens)
    } catch (error) {
        res.send('Error '+error )
    }
})

router.get("/:id", async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    res.json(alien);
  } catch (error) {
    res.send("Error " + error);
  }
});


router.post('/',async(req,res)=>{
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try {
      const a1 =  await alien.save()
      res.json(a1)
    } catch (error) {

        res.send('Error')
        
    }

})

router.patch('/:id',async(req,res)=>{
    try {
        const alien = await Alien.findById(req.params.id)
        if(req.body.name) alien.name = req.body.name;
        if (req.body.tech) alien.tech = req.body.tech;
        if (req.body.sub) alien.sub = req.body.sub;
    
        const a1 = await alien.save()
        res.json(a1)
    } catch (error) {
        res.send('Error' + error)
        
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const alien = await Alien.findById(req.params.id);
        await alien.remove()
        res.send('Deleted')
    } catch (error) {
        res.send('Error'+ error)
    }
})

module.exports = router
