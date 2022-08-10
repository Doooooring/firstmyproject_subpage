import { useState, useEffect } from 'react'
import './page4.css'
import axios from 'axios'

export default function Page4({ handleCurrentPage }) {
  handleCurrentPage('page4')
  const [contentsId, handleContentsId] = useState('')
  const [newsTitle, handleNewsTitle] = useState('')
  const [newsSubTitle, handleSubTitle] = useState('')
  const [newsTerm, handleTerm] = useState('')
  const [newsState, handleState] = useState('')
  const [newsKeyWord, handleNewsKeyWord] = useState('')
  const [contentsToRevise, handleContentsToRevise] = useState('')
  const [completeToGetContents, handleCompleteness] = useState(false)
  const [loadingToGetContents, handleloadingToGetContents] = useState(false)
  const [findById, handleFindById] = useState(true)
  const [findByTitle, handleFindByTitle] = useState(false)
  const [valueToRevise, handleValueToRevise] = useState('')
  const [defaultIdTitleList, handleDefaultIdTitleList] = useState([])
  const [loadingToGetDefault, handleloadingToGetDefault] = useState(false)
  const [errorToGetDefault, handleErrorToGetDefault] = useState(null)

  function handleCheckBox() {
    handleFindById(!findById)
    handleFindByTitle(!findByTitle)
    handleValueToRevise('')
    handleCompleteness(false)
  }

  async function getDataList() {
    try {
      handleloadingToGetDefault(true)
      const titleKeyList = await axios.get(
        'http://localhost:3000/getidtitlelist',
      )
      handleDefaultIdTitleList(titleKeyList.data.reverse())
    } catch (e) {
      handleErrorToGetDefault(e)
    }
    handleloadingToGetDefault(false)
  }

  async function findContents() {
    let response
    try {
      handleloadingToGetContents(true)
      if (findById) {
        response = await axios.get(
          `http://localhost:3000/contentstorevise/id/${valueToRevise}`,
        )
      } else {
        response = await axios.get(
          `http://localhost:3000/contentstorevise/title/${valueToRevise}`,
        )
      }
    } catch (e) {
      console.log(e)
    }
    await handleloadingToGetContents(false)
    const { id, title, subtitle, term, state, key } = response.data
    await handleContentsId(id)
    await handleNewsTitle(title)
    await handleSubTitle(subtitle)
    await handleTerm(term)
    await handleState(state)
    await handleNewsKeyWord(key)
    await handleCompleteness(true)
  }

  async function submit(e) {
    e.preventDefault()
    const keywordToSend = newsKeyWord.trim().replaceAll(' ', '')
    const dataToRevise = {
      id: contentsId,
      title: newsTitle,
      subtitle: newsSubTitle,
      term: newsTerm,
      state: newsState,
      key: keywordToSend,
    }
    axios
      .post('http://localhost:3000/contentstorevise', dataToRevise, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        if (response.data === '잘 됨') {
          alert('잘 갔습니다')
          handleCompleteness(false)
        } else {
          alert('뭔가 이상하다')
        }
      })
  }

  useEffect(() => {
    getDataList()
  }, [])

  if (loadingToGetDefault) {
    return <div>기다려보셈</div>
  } else {
    return (
      <div className="page4body">
        <div className="title-key-list">
          {defaultIdTitleList.map((idtitle) => {
            const { id, title, state } = idtitle
            return (
              <li
                className="id-title-box"
                onClick={() => {
                  if (findById) {
                    handleValueToRevise(id)
                  } else {
                    handleValueToRevise(title)
                  }
                }}
              >
                <span className="id-title-comp">id : {id}</span>
                <span className="id-title-comp">title : {title}</span>
                <span className="id-title-comp">state : {state}</span>
              </li>
            )
          })}
        </div>
        <div className="id-title-checkbox">
          아래에서 고치자!
          <input
            type="radio"
            checked={findById}
            onClick={handleCheckBox}
            name="type"
            value="id"
            className="type-check-box"
          ></input>
          id
          <input
            type="radio"
            checked={findByTitle}
            onClick={handleCheckBox}
            name="type "
            value="title"
            className="type-check-box"
          ></input>
          title
        </div>
        <input
          type="text"
          placeholder={findById ? 'id를 입력하세요' : '제목을 입력하세요'}
          value={valueToRevise}
          onChange={(e) => {
            handleValueToRevise(e.target.value)
          }}
        ></input>
        <button onClick={findContents} className="search-button">
          찾기
        </button>
        <form
          onSubmit={(e) => {
            submit(e)
          }}
          className="form-container-page4"
          style={{ display: completeToGetContents ? 'block' : 'none' }}
        >
          <h2>현재 데이터</h2> <br></br>
          제목 :{' '}
          <input
            placeholder="제목"
            value={newsTitle}
            className="inputBox"
          ></input>
          <br></br>
          부제 :{' '}
          <input
            placeholder="ex) 이재명 vs 기준식"
            value={newsSubTitle}
            className="inputBox"
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
          # 진행 중인 상태 -> "진행 중" , 끝난건지 아닌지 모르겠음 ->
          "흐지부지..", 끝남 -> 자유롭게 적으셈 # 형식 안맞추면 에러나니
          조심하셈
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
          <button type="submit"> 보내 봅시다 </button>
        </form>
      </div>
    )
  }
}
