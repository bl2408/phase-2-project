const epBackend = {
    base:           `http://localhost:3000`,
    profiles:       function(){
        return `${this.base}/profiles`;
    },

}

const epApi = {
    base:           ()=>`http://localhost:3000/`,

}

export { epBackend, epApi };