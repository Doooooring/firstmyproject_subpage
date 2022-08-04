import { useState, useRef } from 'react'
import axios from 'axios'
import LinkList from './linklist.js'

export default function Page1({ handleCurrentPage }) {
  const [newsTitle, handleNewsTitle] = useState('')
  const [newsSubTitle, handleSubTitle] = useState('')
  const [newsTerm, handleTerm] = useState('')
  const [newsState, handleState] = useState('')
  const [newsKeyWord, handleNewsKeyWord] = useState('')
  const [newsSummary, handleNewsSummary] = useState('')
  const [aComment, handleAComment] = useState('')
  const [bComment, handleBComment] = useState('')
  const [linkList, handleLinkList] = useState([['', '', 0]])
  const [userName, handleUserName] = useState('')
  const nextid = useRef(1)
  handleCurrentPage('page1')
  function addNewsLink() {
    handleLinkList([...linkList, ['', '', nextid.current]])
    nextid.current += 1
  }
  function deleteNewsLink() {
    if (nextid.current == 1) {
      alert('뭘 또 없애 시발')
    } else {
      handleLinkList([...linkList.slice(0, linkList.length - 1)])
      nextid.current -= 1
    }
  }
  function checklistList() {
    let state = false
    linkList.forEach((list) => {
      if (list[0] === '' || list[1] === '') {
        state = true
      }
    })
    return state
  }
  async function submit(e) {
    e.preventDefault()
    if (
      newsTitle === '' ||
      newsSubTitle === '' ||
      newsTerm === '' ||
      newsState === '' ||
      newsKeyWord === '' ||
      newsSummary === '' ||
      aComment === '' ||
      bComment === '' ||
      checklistList()
    ) {
      alert('씨발 다 안 채웠잖아')
    } else {
      const keysToSend = newsKeyWord.trim().replaceAll(' ', '')
      const JsonToSend = {
        title: `${newsTitle}`,
        subtitle: `${newsSubTitle}`,
        term: `${newsTerm}`,
        state: `${newsState}`,
        key: `${keysToSend}`,
        summary: `${newsSummary}`,
        aComment: `${aComment}`,
        bComment: `${bComment}`,
        linkList: linkList,
        userName: userName,
      }
      await axios
        .post('http://localhost:3000/datachanger', JSON.stringify(JsonToSend), {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          if (response.data == 'good') {
            alert('잘 보내짐')
            handleNewsKeyWord('')
            handleNewsTitle('')
            handleSubTitle('')
            handleTerm('')
            handleState('')
            handleNewsSummary('')
            handleAComment('')
            handleBComment('')
            handleLinkList([['', '', 0]])
          } else if (response.data == 'passworderror') {
            alert('김민재 아니잖아')
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
      제목 :{' '}
      <input
        placeholder="제목"
        value={newsTitle}
        className="inputBox"
        onChange={(e) => {
          handleNewsTitle(e.target.value)
        }}
      ></input>
      <br></br>
      부제 :{' '}
      <input
        placeholder="ex) 이재명 vs 기준식"
        value={newsSubTitle}
        className="inputBox"
        onChange={(e) => {
          handleSubTitle(e.target.value)
        }}
      ></input>
      <br></br>
      기간 :{' '}
      <input
        placeholder="ex) 2022-01-01~ or 2022-01-01~2022-02-02"
        value={newsTerm}
        className="inputBox"
        onChange={(e) => {
          handleTerm(e.target.value)
        }}
      ></input>
      <br></br>
      상태 :{' '}
      <input
        placeholder="상태"
        value={newsState}
        className="inputBox"
        onChange={(e) => {
          handleState(e.target.value)
        }}
      ></input>{' '}
      # 진행 중인 상태 -> "진행 중" , 끝난건지 아닌지 모르겠음 -> "흐지부지..",
      끝남 -> 자유롭게 적으셈 # 형식 안맞추면 에러나니 조심하셈
      <br></br>
      <input
        placeholder="관련 키워드"
        value={newsKeyWord}
        className="inputBox"
        onChange={(e) => {
          handleNewsKeyWord(e.target.value)
        }}
      ></input>{' '}
      # 키워드 간에 , or 띄워쓰기 꼭 하셈 {'&'} 하나 이상 키워드 필수임
      <br></br>
      기사 요약<br></br>
      <textarea
        placeholder="요약해주겠다"
        cols="500"
        rows="100"
        value={newsSummary}
        className="inputBox summary"
        onChange={(e) => {
          handleNewsSummary(e.target.value)
        }}
      ></textarea>
      <br></br>
      <input
        placeholder="a 말풍선"
        value={aComment}
        className="inputBox acomment"
        onChange={(e) => {
          handleAComment(e.target.value)
        }}
      ></input>
      <input
        placeholder="b 말풍선"
        value={bComment}
        className="inputBox"
        onChange={(e) => {
          handleBComment(e.target.value)
        }}
      ></input>
      <br></br>
      관련 기사 목록
      <button type="button" onClick={addNewsLink} className="addbutton">
        기사 추가
      </button>
      <button type="button" onClick={deleteNewsLink} className="deletebutton">
        기사 제거
      </button>
      <LinkList linkList={linkList} handleLinkList={handleLinkList} />
      <button type="submit" style={{ marginRight: '30px' }}>
        {' '}
        보내깅{' '}
      </button>
      <input
        placeholder="누구냐"
        value={userName}
        className="inputBox"
        onChange={(e) => {
          handleUserName(e.target.value)
        }}
      ></input>
    </form>
  )
}
