// Export a method for API search
// Export a method for API fetch
// This are most likely 2 different URLs (one for searching and the other to fetch by a unique identifier)

// If you API has Authentication - you would handle it here too.

const superagent = require('superagent');
const config = require('./config.json');

const episodeSpecifics = async episodeTitle =>{
    try{
        
        const allEpisodes = await superagent.get(`${config.url}`)
        let episodeID = 0

         allEpisodes.body.forEach(ele => {
             
            if(ele.title.toLowerCase() === episodeTitle.toLowerCase()){
                episodeID = ele.episode_id
            }
         })
         
        const episodeDetails = await superagent.get(`${config.url}/${episodeID}`);
        const details = []
        episodeDetails.body.forEach(ele =>{
            const episodeObj = {}

            episodeObj.airDate = ele.air_date
            episodeObj.title = ele.title
            episodeObj.season = ele.season
            episodeObj.episode = ele.episode
            episodeObj.characters = ele.characters
            details.push(episodeObj)
        })
        return details
    }catch(error){
        return error;
    }
}

const episodeTitle = async searchParameter => {
    try{
        const allEpisodes = await superagent.get(`${config.url}`)
        const episodeList = []
        allEpisodes.body.forEach(ele =>{
            const newTitle = ele.title.toLowerCase()
            if(ele.series === 'Breaking Bad' && newTitle.includes(searchParameter.toLowerCase())){
                const episodeObj = {}
                episodeObj.title = ele.title
                episodeList.push(episodeObj)
            }
        })
        return episodeList
    }catch(error){
        return error;
    }
}


module.exports ={
    episodeSpecifics,
    episodeTitle
}
