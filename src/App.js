import { useState } from 'react';
import EventForm from './components/EventForm';


function App() {
  const [isSubmitting, setIsSubmitting] = useState(true)
  //const [didSubmit, setDidSubmit] = useState(false)
  const [isSubmittingSeed, setIsSubmittingSeed] = useState(true)
  const [eventIdSeed, setEventIdSeed] = useState(0)
  
  const url = 'https://ptseventsapp.azurewebsites.net/api'
  
  //Seed data for testing
  const seedData = {
    "name": "5G Conference 2024",
    "isComplete": false,      
  }
  
  const submitHandler = async (apiController, submitData) => {
    setIsSubmittingSeed(false)
    setIsSubmitting(true);
    const response = await fetch(`${url}/${apiController}`, {
      method: 'POST',
      body: JSON.stringify(
        submitData      
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    setIsSubmitting(false)
    //setDidSubmit(true)
    const data = await response.json()
    setEventIdSeed(data.id)
    console.log(data)
  }

  isSubmittingSeed && submitHandler('PtsEvent', seedData)

  return (
    <>
    {isSubmittingSeed && <p style={{backgroundColor: 'grey'}}>Starting in-memory db on Azure and seed test data from client to server...</p>}
    <div className="app">
      <EventForm onSubmitting={submitHandler} isSubmitting={isSubmitting} eventId={eventIdSeed} />
    </div>
    </>
  )
}

export default App;