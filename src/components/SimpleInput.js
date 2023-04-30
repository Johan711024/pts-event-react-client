import useInput from '../hooks/use-input' 

const SimpleInput = (props) => { 

  const { 
    value: enteredName, 
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChangeHandler, 
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput 
  } = useInput(value => value.trim() !== '') // function that is passed in as an argument to useInput
  
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.includes('@'))

  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }
  

  const formSubmissionHandler = event => {
    event.preventDefault()

    if(!enteredNameIsValid) {      
      return
    }
    console.log(enteredName)
    resetNameInput() 
    resetEmailInput()
    
    if(!enteredEmailIsValid) {      
      return
    }
    console.log(enteredEmail)
    resetEmailInput()
  }
    
    const nameInputClasses = nameInputHasError
    ? 'form-control invalid' 
    : 'form-control'

    const emailInputClasses = emailInputHasError
    ? 'form-control invalid' 
    : 'form-control'
    
    return (
      <form onSubmit={formSubmissionHandler}>
        <div className={nameInputClasses}>
          <label htmlFor='name'>Namn</label>
          <input 
            value={enteredName}            
            type='text' 
            id='name' 
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler} 
          />
          {nameInputHasError && <p style={{color: 'red'}}>Fyll i namn!</p>}
          </div>
          <div className={emailInputClasses}>
          <label htmlFor='name'>Epostadress</label>
          <input
            value={enteredEmail}
            type='text'
            id='email'
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && <p style={{color: 'red'}}>Skriv korrekt epostadress!</p>}


        </div>
        <div className="form-actions">
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </form>
    );
  };
  
  export default SimpleInput
  