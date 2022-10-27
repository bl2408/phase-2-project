const epBackend = {
    base:           `http://localhost:3000`,
    profiles:       function(id=""){
                        return `${this.base}/profiles/${id}`;
                    },
    items:          function(id){
                        return `${this.base}/items/${id}`;
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