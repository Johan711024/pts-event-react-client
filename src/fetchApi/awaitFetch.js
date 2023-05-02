import { useCallback } from "react"



export const GetApiData = async (url, options) => {
  try{
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!')
  }
  const data = await response.json()
  
  const transformedData = data.results.map((item) => {
    return {
      title: item.title,
      episode_id: item.episode_id,
      opening_crawl: item.opening_crawl,
      director: item.director,
      producer: item.producer,
      release_date: item.release_date,
      characters: item.characters,
      planets: item.planets,
      starships: item.starships,
      vehicles: item.vehicles,
      species: item.species,
      created: item.created,
    }  
  })
  return transformedData
  } catch (error) {
    console.log(error)
    return error
  }

}


export const PostApiData = async (url, postData) => {
  try{
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }

    })
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!')
    }
    const data = await response.json()
    //console.log(data)
    return data
  } 
  catch (error) {
    console.log(error)
    return error
  }
}