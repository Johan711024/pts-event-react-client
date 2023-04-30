import useInput from '../hooks/use-input' // custom hook for input validation

const EventForm = (props) => {

    //destructuring a custom hook for the input validations
    const { 
        value: enteredName, 
        isValid: enteredNameIsValid,
        hasError: nameInputHasError, 
        valueChangeHandler: nameChangeHandler, 
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput 
      } = useInput(value => value.trim() !== '') // function that is passed in as an argument to useInput
    const {
        value: enteredCompany,
        isValid: enteredCompanyIsValid,
        hasError: companyInputHasError,
        valueChangeHandler: companyChangeHandler,
        inputBlurHandler: companyBlurHandler,
        reset: resetCompanyInput
      } = useInput(value => value.trim() !== '')
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
      } = useInput(value => value.includes('@'))
    
    let formIsValid = false

    if (enteredNameIsValid && enteredCompanyIsValid && enteredEmailIsValid) {
        formIsValid = true
    }

    const formSubmissionHandler = event => {
        event.preventDefault()
        if(!enteredNameIsValid) {
            return
        }
        console.log(enteredName)
        resetNameInput()        
        if(!enteredCompanyIsValid) {
            return
        }
        console.log(enteredCompany)
        resetCompanyInput()
        
        if(!enteredEmailIsValid) {
            return
        }
        console.log(enteredEmail)
        resetEmailInput()
    }
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
        <input type='checkbox' id='onsite' /><label htmlFor='onsite'>Deltar på plats</label>
         
       
        <div className='form-actions'>
            <button disabled={!formIsValid}>Submit</button>
        </div>
      </form>
    )
  }
  
  export default EventForm
  