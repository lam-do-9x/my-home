import { useReducer, useEffect } from 'react'

function validateOnSubmit(state) {
  const { input } = state
  let validationErrs = {}
  if (!input.email) validationErrs.email = 'The email field is required'
  else if (!/\S+@\S+\.\S+/.test(input.email))
    validationErrs.email = 'The format of email not corrected'
  if (!input.password)
    validationErrs.password = 'The password field is required'
  else if (input.password.length < 10)
    validationErrs.password =
      'The password field must be at least 10 characters'
  return validationErrs
}

function validateOnTouch(state, action) {
  let validationErr = {}
  for (let keyName in action.payload) {
    if (state.input[keyName].length > 0 && action.payload[keyName].length === 0)
      validationErr[keyName] = 'This field is required'
    if (state.input[keyName].length === 0 && action.payload[keyName].length > 0)
      validationErr[keyName] = ''
  }
  return validationErr
}

const useLoginForm = (callback) => {
  const initState = {
    input: {
      email: '',
      password: '',
    },
    validationErrs: {
      email: '',
      password: '',
    },
    isSubmit: false,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        return {
          ...state,
          input: {
            ...state.input,
            ...action.payload,
          },
          validationErrs: {
            ...initState.validationErrs,
            ...validateOnTouch(state, action),
          },
        }
      case 'SUBMIT':
        return {
          ...state,
          validationErrs: {
            ...initState.validationErrs,
            ...validateOnSubmit(state),
            ...action.payload,
          },
          isSubmit: true,
        }
      case 'STOP_SUBMIT':
        return {
          ...state,
          isSubmit: false,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initState)

  const handleChange = (e) => {
    dispatch({
      type: 'INPUT_CHANGE',
      payload: { [e.target.type]: e.target.value },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // const { ok, error } = await signIn('credentials', {
    //   email: state.input.email,
    //   password: state.input.password,
    //   redirect: false,
    // })

    // if (!ok) {
    //   const field = getContentByField(error, 'field=', '&')
    //   const message = getContentByField(error, 'message=')
    //   dispatch({ type: 'SUBMIT', payload: { [field]: message } })
    // }
  }

  useEffect(() => {
    if (
      Object.values(state.validationErrs).find((err) => err.length) &&
      state.isSubmit
    )
      dispatch({ type: 'STOP_SUBMIT' })
    if (
      !Object.values(state.validationErrs).find((err) => err.length) &&
      state.isSubmit
    )
      callback(state.input)
  }, [state.isSubmit])

  return { state, handleChange, handleSubmit }
}

export default useLoginForm
