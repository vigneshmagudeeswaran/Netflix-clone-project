import axios from 'axios'


const fetcher = (url: string) => axios.get(url).then((res) => res.data)

//const fetcher = (url: string) => axios.get(url).then((res) => console.log(res.data))
export default fetcher;