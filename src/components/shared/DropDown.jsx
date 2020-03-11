// import React from 'react'
// import { Dropdown } from 'semantic-ui-react'

// const sortOptions = [
//     {
//         key: 'File Name',
//         text: 'File Name',
//         value: 'File Name'
//     },
//     {
//         key: 'Sequence Number',
//         text: 'Sequence Number',
//         value: 'Sequence Number'
//     },
//     {
//         key: 'Selection',
//         text: 'Selection',
//         value: 'Selection'
//     }
// ]
// const DropDownMenu = () => (
//     <Dropdown placeholder='Sort By' fluid selection options={sortOptions} />
// )


// export default DropDownMenu;

import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const friendOptions = [
  {
    key: 'Jenny Hess',
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Elliot Fu',
    text: 'Elliot Fu',
    value: 'Elliot Fu',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'Stevie Feliciano',
    text: 'Stevie Feliciano',
    value: 'Stevie Feliciano',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/stevie.jpg' },
  },
  {
    key: 'Christian',
    text: 'Christian',
    value: 'Christian',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/christian.jpg' },
  },
  {
    key: 'Matt',
    text: 'Matt',
    value: 'Matt',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg' },
  },
  {
    key: 'Justen Kitsune',
    text: 'Justen Kitsune',
    value: 'Justen Kitsune',
    image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/justen.jpg' },
  },
]

const DropdownExampleSelection = () => (
  <Dropdown
    placeholder='Select Fiend'
    
    selection
    options={friendOptions}
  />
)

export default DropdownExampleSelection