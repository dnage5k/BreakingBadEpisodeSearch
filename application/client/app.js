
const BreakingBad = new Vue({
    el: '#episode',
    data: {
        appName: 'Breaking Bad Episode App',
        episodes: [],
        episodeDetails: ['default'],
        newEntry: "",
        selectedEpisode: "",
        selected: true,
        choice2: false
    },
    computed: {
        episode: async function () {
            const episode = await axios.get(`http://localhost:8888/api/episodes`)
            this.episodes = episode.body
        }
    },
    methods: {
        episodeSearch: async function(){
            const titles = await axios.get(`http://localhost:8888/api/episodes?searchTitle=${this.newEntry}`)
            this.episodeTitles = []
            titles.data.forEach(ele=>{
                this.episodeTitles.push(ele)
            })
            
            this.episodes = titles.data
        },
        episodeSelected: async function(any){
            this.choice2= true
            this.selected = false
            const episodes = await axios.get(`http://localhost:8888/api/episodeSpecifics?searchSpecifics=${any}`)
            this.episodeDetails = []
            episodes.data.forEach(ele =>{
                this.episodeDetails.push(ele)
            })
            console.log(this.episodeDetails)
            
        },
        searchAgain: async function(){
            this.selected = true
            this.choice2 = false
            this.newEntry = ""
            this.selectedEpisode =""
            this.episodes = []
            this.episodeDetails = []

        }
    }
});
