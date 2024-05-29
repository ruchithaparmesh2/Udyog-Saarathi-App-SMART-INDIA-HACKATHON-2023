import React, { createContext, useState } from 'react'
export const topicContext=createContext();
const TopicContextProvider = ({children}) => {
     let [topic,setTopic]=useState([])
  return (
    <topicContext.Provider value={[topic,setTopic]}>
        {children}
    </topicContext.Provider>
  )
}

export default TopicContextProvider