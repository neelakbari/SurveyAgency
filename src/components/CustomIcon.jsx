import React from 'react'
import * as AllIcons from '@ant-design/icons';

const CustomIcon = (type) => {
    const AntdIcon= AllIcons[type];
  return (
    <AntdIcon className="list_item_icon"/>
    )
}

export default CustomIcon