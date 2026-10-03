import { useEffect, useState } from 'react'

import './App.css'

const API_URL = "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"

function App() {
  const [data, setData] = useState([])

  const [search, setSearch] = useState("")


// Fetch all countries once; the API has no search endpoint
useEffect(()=>{
  apiCall()
},[])


function handleSearch(event){
  setSearch(event.target.value)
}

  async function apiCall(){
    try {
    let call = await fetch(API_URL)
    let response = await call.json()
     setData(response)

    } catch (error) {
      console.error("Error fetching data:", error)
      setData([])
    }

  }

  const filteredData = data.filter((item) =>
    item.common.toLowerCase().includes(search.trim().toLowerCase())
  )

  return (
    <>
 <input className="search" type="text" placeholder='Search for countries...' value={search} onChange={handleSearch} />

   <main className='main'>

{filteredData.map((item)=>(
  <div className='countryCard' key={item.common}>
<img src={item.png} alt={item.common} />
<h3> {item.common}</h3>
</div>
))}
   </main>

    </>
  )
}

export default App
