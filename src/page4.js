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
        if (response.data === '??? ???') {
          alert('??? ????????????')
          handleCompleteness(false)
        } else {
          alert('?????? ????????????')
        }
      })
  }

  useEffect(() => {
    getDataList()
  }, [])

  if (loadingToGetDefault) {
    return <div>???????????????</div>
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
          ???????????? ?????????!
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
          placeholder={findById ? 'id??? ???????????????' : '????????? ???????????????'}
          value={valueToRevise}
          onChange={(e) => {
            handleValueToRevise(e.target.value)
          }}
        ></input>
        <button onClick={findContents} className="search-button">
          ??????
        </button>
        <form
          onSubmit={(e) => {
            submit(e)
          }}
          className="form-container-page4"
          style={{ display: completeToGetContents ? 'block' : 'none' }}
        >
          <h2>?????? ?????????</h2> <br></br>
          ?????? :{' '}
          <input
            placeholder="??????"
            value={newsTitle}
            className="inputBox"
          ></input>
          <br></br>
          ?????? :{' '}
          <input
            placeholder="ex) ????????? vs ?????????"
            value={newsSubTitle}
            className="inputBox"
          ></input>
          <br></br>
          ?????? :{' '}
          <input
            placeholder="ex) 2022-01-01~ or 2022-01-01~2022-02-02"
            value={newsTerm}
            className="inputBox"
            onChange={(e) => {
              handleTerm(e.target.value)
            }}
          ></input>
          <br></br>
          ?????? :{' '}
          <input
            placeholder="??????"
            value={newsState}
            className="inputBox"
            onChange={(e) => {
              handleState(e.target.value)
            }}
          ></input>{' '}
          # ?????? ?????? ?????? -> "?????? ???" , ???????????? ????????? ???????????? ->
          "????????????..", ?????? -> ???????????? ????????? # ?????? ???????????? ????????????
          ????????????
          <br></br>
          <input
            placeholder="?????? ?????????"
            value={newsKeyWord}
            className="inputBox"
            onChange={(e) => {
              handleNewsKeyWord(e.target.value)
            }}
          ></input>{' '}
          # ????????? ?????? , or ???????????? ??? ?????? {'&'} ?????? ?????? ????????? ?????????
          <br></br>
          <button type="submit"> ?????? ????????? </button>
        </form>
      </div>
    )
  }
}
