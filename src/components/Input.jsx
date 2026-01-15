import PropTypes from 'prop-types'

import InputLabel from './InputLabel'

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="outline-brand-primary placeholder:text-brand-text-gray border-brand-border rounded-lg border border-solid px-4 py-3 placeholder:text-sm"
        {...rest}
      />

      {errorMessage && (
        <p className="mt-1 text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

Input.displayName = 'Input'
Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Input
