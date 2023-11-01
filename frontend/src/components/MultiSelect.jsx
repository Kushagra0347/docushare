/* eslint-disable no-use-before-define */
import { useState } from 'react'
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
// import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { Autocomplete, TextField, Checkbox } from '@mui/material'
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material'

const MultiSelect = ({
  items,
  label,
  placeholder,
  noOptionsText,
  limitTags,
  onChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleToggleOption = (selectedOptions) =>
    setSelectedOptions(selectedOptions)
  const handleClearOptions = () => setSelectedOptions([])

  const getOptionLabel = (option) => `${option.email}`

  const handleChange = (_, selectedOptions, reason) => {
    if (reason === 'selectOption' || reason === 'removeOption') {
      handleToggleOption && handleToggleOption(selectedOptions)
      return onChange(selectedOptions)
    } else if (reason === 'clear') {
      handleClearOptions && handleClearOptions()
    }
  }

  const optionRenderer = (props, option, { selected }) => {
    // eslint-disable-next-line no-unused-vars
    const { className, ...mainProps } = props
    return (
      <div className="px-3" key={props.key}>
        <Checkbox
          color="secondary"
          icon={<CheckBoxOutlineBlank fontSize="small" />}
          checkedIcon={<CheckBox fontSize="small" />}
          // style={{ marginRight: 2 }}
          checked={selected}
          {...mainProps}
        />
        {getOptionLabel(option)}
      </div>
    )
  }
  const inputRenderer = (params) => (
    <TextField {...params} label={label} placeholder={placeholder} />
  )

  return (
    <Autocomplete
      multiple
      size="small"
      limitTags={limitTags}
      options={items && items}
      value={selectedOptions}
      onChange={handleChange}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      noOptionsText={noOptionsText}
      renderOption={optionRenderer}
      renderInput={inputRenderer}
    />
  )
}

MultiSelect.defaultProps = {
  limitTags: 3,
}

export default MultiSelect
