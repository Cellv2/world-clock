import React from 'react'
import Select from 'react-select'

type Props = {

}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

const Dropdown = (props: Props) => {
    return (
        <Select options={options} />
    )
}

export default Dropdown
