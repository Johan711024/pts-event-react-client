import { useState, useEffect } from 'react'
import useInput from '../hooks/use-input' // custom hook for input validation
import { GetApiData, PostApiData } from '../fetchApi/awaitFetch'

const isNotEmpty = value => value.trim() !== '' // function that is passed in as an argument to useInput
const isEmail = value => value.includes('@') // function that is passed in as an argument to useInput

const EventForm = ({onSubmitting, eventId}) => {

    const [isAttendingOnSite, setIsAttendingOnSite] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    

    //destructuring a custom hook for the input validations
    const { 
        value: enteredName, 
        isValid: enteredNameIsValid,
        hasError: nameInputHasError, 
        valueChangeHandler: nameChangeHandler, 
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput 
      } = useInput(isNotEmpty) // function is passed in as an argument to useInput
    const {
        value: enteredCompany,
        isValid: enteredCompanyIsValid,
        hasError: companyInputHasError,
        valueChangeHandler: companyChangeHandler,
        inputBlurHandler: companyBlurHandler,
        reset: resetCompanyInput
      } = useInput(isNotEmpty)
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
      } = useInput(isEmail)
    
    let formIsValid = false

    if (enteredNameIsValid && enteredCompanyIsValid && enteredEmailIsValid) {
        formIsValid = true
    }

    const formSubmissionHandler = event => {
        event.preventDefault()
        if (!formIsValid) {
            return
        }

        setIsLoading(true)
        setError(null)

        const data ={            
            "name": enteredName,
            "company": enteredCompany,
            "cellPhoneNumber": "0709393338",
            "emailAddress": enteredEmail,
            "attendRemote": !isAttendingOnSite,
            "ptsEventId": eventId            
        }       

        onSubmitting('Participant', data)

        //const response = GetApiData('http://swapi.dev/api/films')
        
        //console.log(response)

        console.log('Submitted!')
        console.log(enteredName, enteredCompany, enteredEmail)
        console.log('Attending on site: ', isAttendingOnSite ? 'Yes' : 'No')
        
        resetNameInput()
        resetCompanyInput()        
        resetEmailInput()

        setIsLoading(false)
    }

    const checkHandler = () => setIsAttendingOnSite(!isAttendingOnSite)
    
    const nameInputClasses = nameInputHasError
    ? 'form-control invalid'
    : 'form-control'
    const companyInputClasses = companyInputHasError
    ? 'form-control invalid'
    : 'form-control'
    const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control'


    
    return (
      <form onSubmit={formSubmissionHandler}>
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}

        
        <div className='control-group'>

            <div className={nameInputClasses}>
                <label htmlFor='name'>Namn</label>
                <input 
                    id='name'
                    value={enteredName}            
                    type='text'
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                />
                {nameInputHasError && <p style={{color: 'red'}}>Fyll i namn!</p>}
          
            </div>
            <div className={companyInputClasses}>
                <label htmlFor='company'>Företag</label>
                <input 
                    id='company' 
                    value={enteredCompany}            
                    type='text'
                    onChange={companyChangeHandler}
                    onBlur={companyBlurHandler}
                />
                {companyInputHasError && <p style={{color: 'red'}}>Fyll i företag!</p>}
            </div>        
            <div className={emailInputClasses}>
                <label htmlFor='email'>Epost</label>
                <input 
                    id='email'
                    value={enteredEmail}
                    type='text'
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                />
                {emailInputHasError && <p style={{color: 'red'}}>Fyll i epost!</p>}
            </div>
        </div>
        <input 
            type='checkbox' 
            id='onsite' 
            checked={isAttendingOnSite} 
            onChange={checkHandler}
        />
        <label htmlFor='onsite'>Deltar på plats</label>
         
       
        <div className='form-actions'>
            <button disabled={!formIsValid}>Submit</button>
        </div>
      </form>
    )
  }
  
  export default EventForm
  