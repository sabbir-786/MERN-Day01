import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const App = () => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);


  return (
    <div style={{ margin: "30px", backgroundColor: "#000" }}>
      <p>{message}</p>
    </div>
  )
}

export default App


