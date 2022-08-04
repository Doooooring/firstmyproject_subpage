import './page2.css'
import { useState, useRef } from 'react'
import axios from 'axios'

export default function Page2({ handleCurrentPage }) {
  const [firstKeyWord, handleFirstKeyWord] = useState('')
  const [secondKeyWord, handleSecondKeyWord] = useState('')
  const [thirdKeyWord, handleThirdKeyWord] = useState('')
  const [fourthKeyWord, handleFourthKeyWord] = useState('')
  const [fifthKeyWord, handleFifthKeyWord] = useState('')
  handleCurrentPage('page2')
  
  async function submit(e) {
    e.preventDefault()
    if (
      firstKeyWord === '' ||
      secondKeyWord == '' ||
      thirdKeyWord === '' ||
      fourthKeyWord === '' ||
      fifthKeyWord === ''
    ) {
      alert('아직 다 안 채웠잖아 ㅅ ㅂ')
    } else {
      let dataToSend = [
        { keyword: firstKeyWord, index: 1 },
        { keyword: secondKeyWord, index: 2 },
        { keyword: thirdKeyWord, index: 3 },
        { keyword: fourthKeyWord, index: 4 },
        { keyword: fifthKeyWord, index: 5 },
      ]
      await axios
        .post('http://localhost:3000/hotkeywordpost', dataToSend, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          if (response.data == 'goood') {
            alert('잘갔다')
            handleFirstKeyWord('')
            handleSecondKeyWord('')
            handleThirdKeyWord('')
            handleFourthKeyWord('')
            handleFifthKeyWord('')
          }
        })
    }
  }

  return (
    <form
      onSubmit={(e) => {
        submit(e)
      }}
      className="form-container"
    >
      <input
        placeholder="1번"
        value={firstKeyWord}
        onChange={(e) => {
          handleFirstKeyWord(e.target.value)
        }}
        className="inputBox"
      ></input>
      <br></br>
      <input
        placeholder="2번"
        value={secondKeyWord}
        onChange={(e) => {
          handleSecondKeyWord(e.target.value)
        }}
        className="inputBox"
      ></input>
      <br></br>
      <input
        placeholder="3번"
        value={thirdKeyWord}
        onChange={(e) => {
          handleThirdKeyWord(e.target.value)
        }}
        className="inputBox"
      ></input>
      <br></br>
      <input
        placeholder="4번"
        value={fourthKeyWord}
        onChange={(e) => {
          handleFourthKeyWord(e.target.value)
        }}
        className="inputBox"
      ></input>
      <br></br>
      <input
        placeholder="5번"
        value={fifthKeyWord}
        onChange={(e) => {
          handleFifthKeyWord(e.target.value)
        }}
        className="inputBox"
      ></input>
      <br></br>
      <button type="submit"> 보내깅 </button>
    </form>
  )
}
