export default function Input({
  required,
  label,
  type,
  placeholder,
  value,
  handleChange,
  state,
}) {
  return (
    <label className="block">
      <span
        className={`block text-sm font-bold text-slate-700 ${
          required ? `after:ml-0.5 after:text-red-500 after:content-['*']` : ''
        }`}
      >
        {label}
      </span>
      <input
        type={type}
        className={`my-2 block w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:outline-none ${
          state.validationErrs[type] === ''
            ? 'border-slate-300 placeholder-slate-400 focus:border-gray-400'
            : 'border-red-500 text-red-600 placeholder-red-400 focus:border-red-500'
        }`}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={handleChange}
      />
      <p
        className={`${
          state.validationErrs[type] === '' ? 'invisible' : ''
        } my-2 text-sm text-red-600`}
      >
        {state.validationErrs[type]}
      </p>
    </label>
  )
}
