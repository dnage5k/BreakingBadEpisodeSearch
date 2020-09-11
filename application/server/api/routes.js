// use the express router to create endpoints in our server
const express = require('express');
const router = express.Router();

// require in the custom node module previously built
const epispdefinder = require('../../../BreakingBadMod');

//localhost:8888/api/episodes
router.get('/episodes', async(req, res)=>{
    //for now lets just get jobs as a teacher
    try{
        const episodesTitles = await epispdefinder.episodeTitle(req.query.searchTitle);
        res.json(episodesTitles)
    }catch(err){
        res.json({err})
    }
});

router.get('/episodeSpecifics', async(req, res)=>{
    try{
        const episodeDetails = await epispdefinder.episodeSpecifics(req.query.searchSpecifics);
        res.json(episodeDetails)
    }catch(err){
        res.json({err})
        
    }
});


module.exports = router;
