import { useState } from 'react';
import EventForm from './components/EventForm';


function App() {
  const [isSubmitting, setIsSubmitting] = useState(true)
  const [didSubmit, setDidSubmit] = useState(false)

  const [submitSeed, setSubmitSeed] = useState(true)
  const [eventIdSeed, setEventIdSeed] = useState(0)
  
  const url = 'https://ptseventsapp.azurewebsites.net/api'
  
  //Seed data
  const seedData = {
    "name": "5G mayhem",
    "isComplete": false,      
  }
  
  const submitHandler = async (apiController, submitData) => {
    setSubmitSeed(false)
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
    setDidSubmit(true)
    const data = await response.json()
    setEventIdSeed(data.id)
    console.log(data)
  }

  submitSeed && submitHandler('PtsEvent', seedData)

  return (
    <>
    {isSubmitting && <p>Sending request...</p>}
    <div className="app">
      <EventForm onSubmitting={submitHandler} eventId={eventIdSeed} />
    </div>
    </>
  )
}

export default App;