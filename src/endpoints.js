const epBackend = {
    base:           `http://localhost:3000`,
    profiles:       function(){
                        return `${this.base}/profiles`;
                    },

}

const epApi = {
    base:           `https://pokeapi.co/api/v2`,
    list:           function(){
                        return `${this.base}/pokemon`
                    }

}

export { epBackend, epApi };