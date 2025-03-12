import React, { useState } from 'react'
import '../Styles.css'

export default function InputText({ addMessage }) {
    const [message, setMessage] = useState("")
    const sendMessage = ()=>{
        addMessage({message})
        setMessage("")
        
    }
    return (
        <>
            <div className="input-text-container">
                <textarea name="message"
                    placeholder="Message" id="message"
                    onChange={(e) => { setMessage(e.target.value) }}

                    rows='6'></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>

        </>
    )
}
