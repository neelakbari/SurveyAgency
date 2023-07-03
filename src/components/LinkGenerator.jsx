import React from 'react'
import { Button } from 'antd'
import "../scss/View.scss"
import { useParams } from 'react-router-dom'

const LinkGenerator = () => {
    const {createId} = useParams();
    const handleCopy =()=>{
        const link = `${window.location.origin}/survey/${createId}`;
        navigator.clipboard.writeText(link);
        alert("link copied successfully")
    }
  return (
    <div className="link">
    <div className="link_wrapper">
        <span className="link_text">{window.location.origin}/survey/</span>
        <Button onClick={() => handleCopy()} >Copy</Button>
    </div>
</div>
  )
}

export default LinkGenerator