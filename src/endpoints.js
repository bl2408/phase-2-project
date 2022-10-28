const epBackend = {
    base:           `http://localhost:3000`,
    profiles:       function(id=""){
                        return `${this.base}/profiles/${id}`;
                    },
    likes:          function(){
                        return `${this.base}/likes`;
                    },
    likesId:        function(id){
                        return `${this.base}/likes/${id}`;
                    },
    commentsId:     function(id){
                        return `${this.base}/comments/${id}`;
                    },
    comments:     function(){
                        return `${this.base}/comments`;
                    },


}

const epApi = {
    base:           `https://pokeapi.co/api/v2`,
    list:           function({limit = 20, offset=20}){
                        return `${this.base}/pokemon?limit=${limit}&offset=${offset}`
                    },
    details:        function(id=""){
                        return `${this.base}/pokemon/${id}`
                    }

}

export { epBackend, epApi };