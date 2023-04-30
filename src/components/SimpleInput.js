import { useState } from 'react'


const SimpleInput = (props) => {  
  const [enteredName, setEnteredName] = useState('')
  const [enteredNameTouched, setEnteredNameTouched] = useState(false)
  
  const enteredNameIsValid = enteredName.trim() !== ''
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched

  

  let formIsValid = false
  if (enteredNameIsValid ) {
    formIsValid = true
  }
  
  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value)
  }

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true)
    
  }

  const formSubmissionHandler = event => {
    event.preventDefault()

    setEnteredNameTouched(true)

    if(!enteredNameIsValid) {      
      return
    }

    

    console.log(enteredName)

    //(github co-pilot): useState instead of useRef to reset the input field because it's not manipulating the DOM directly when clearing the input field
    setEnteredName('') // clear the input field
    setEnteredNameTouched(false) // reset the touched state
    
    
  }
    
    const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control'
    
    return (
      <form onSubmit={formSubmissionHandler}>
        <div className={nameInputClasses}>
          <label htmlFor='name'>Namn</label>
          <input 
            value={enteredName}            
            type='text' 
            id='name' 
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler} 
          />
          {nameInputIsInvalid && <p style={{color: 'red'}}>Skriv ditt namn!</p>}
        </div>
        <div className="form-actions">
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </form>
    );
  };
  
  export default SimpleInput
  