import { useState, useRef } from 'react'

export default function Linklist({ linkList, handleLinkList }) {
  return (
    <div>
      {linkList.map((list) => (
        <li>
          <input
            placeholder="기사 제목"
            value={list[0]}
            className="inputBox"
            id={'before' + list[2]}
            onChange={(e) => {
              let curnum = e.target.id.slice(-1)
              let curLinkList = [...linkList]
              curLinkList[curnum][0] = e.target.value
              handleLinkList(curLinkList)
            }}
          ></input>
          <input
            placeholder="기사 링크"
            value={list[1]}
            className="inputBox"
            id={'after' + list[2]}
            onChange={(e) => {
              let curnum = e.target.id.slice(-1)
              let curLinkList = [...linkList]
              curLinkList[curnum][1] = e.target.value
              handleLinkList(curLinkList)
            }}
          ></input>
        </li>
      ))}
    </div>
  )
}
