import { useState } from 'react'
import useInput from '../hooks/use-input' // custom hook for input validation

const isNotEmpty = value => value.trim() !== '' // function that is passed in as an argument to useInput
const isCellPhone = value => value.match(/^-?\d+$/) // function that is passed in as an argument to useInput
const isEmail = value => value.includes('@') // function that is passed in as an argument to useInput

const EventForm = ({onSubmitting, isSubmitting, eventId}) => {

    const [isPosted, setIsPosted] = useState(false)
    const [isAttendingOnSite, setIsAttendingOnSite] = useState(false)
    
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
        value: enteredCellPhone,
        isValid: enteredCellPhoneIsValid,
        hasError: cellPhoneInputHasError,
        valueChangeHandler: cellPhoneChangeHandler,
        inputBlurHandler: cellPhoneBlurHandler,
        reset: resetCellPhoneInput
      } = useInput(isCellPhone)
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
      } = useInput(isEmail)
    
    let formIsValid = false

    if (enteredNameIsValid && enteredCompanyIsValid && enteredCellPhoneIsValid &&  enteredEmailIsValid) {
        formIsValid = true
    }

    const formSubmissionHandler = event => {
        event.preventDefault()
        if (!formIsValid) {
            return
        }

        const data ={            
            "name": enteredName,
            "company": enteredCompany,
            "cellPhoneNumber": enteredCellPhone,
            "emailAddress": enteredEmail,
            "attendRemote": !isAttendingOnSite,
            "ptsEventId": eventId            
        }       

        onSubmitting('Participant', data)
        setIsPosted(true)
        

        console.log('Submitted!')
        console.log(enteredName, enteredCompany, enteredCellPhone, enteredEmail)
        console.log('Attending on site: ', isAttendingOnSite ? 'Yes' : 'No')
        
        resetNameInput()
        resetCompanyInput()   
        resetCellPhoneInput()     
        resetEmailInput()
        
        
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
    const cellPhoneInputClasses = cellPhoneInputHasError
    ? 'form-control invalid'
    : 'form-control'


    
    return (
      <form onSubmit={formSubmissionHandler}>
        {isSubmitting && <p>Loading...</p>}  

        {isPosted && <p style={{color: 'green'}}>Tack för din anmälan!</p>}

        {!isPosted && <>

        
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
            <div className={cellPhoneInputClasses}>
                <label htmlFor='email'>Mobilnummer</label>
                <input 
                    id='email'
                    value={enteredCellPhone}
                    type='text'
                    onChange={cellPhoneChangeHandler}
                    onBlur={cellPhoneBlurHandler}
                />
                {cellPhoneInputHasError && <p style={{color: 'red'}}>Fyll i mobilnummer. Endast siffror.</p>}
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
            <button disabled={!formIsValid} className="btn btn-primary">Submit</button>
        </div>
        </>}
      </form>
    )
  }
  
  export default EventForm
  