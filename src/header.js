import './header.css'
import { useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

export default function Header({ currentPage, handleCurrentPage }) {
  if (currentPage === 'page1') {
    return (
      <header className="headtag head1">
        <Link to="/page2">
          <div className="navlink">hot 키워드 수정</div>
        </Link>
        <Link to="/page4">
          <div className="navlink">데이터 수정 하기</div>
        </Link>
        <Link to="/page3">
          <div className="navlink">현재 데이터 보기</div>
        </Link>
      </header>
    )
  } else if (currentPage === 'page2') {
    return (
      <header className="headtag head2">
        <Link to="/">
          <div className="navlink">{'뒤로가기'}</div>
        </Link>
      </header>
    )
  } else if (currentPage === 'page3') {
    return (
      <header className="headtag head3">
        <Link to="/">
          <div className="navlink">{'뒤로가기'}</div>
        </Link>
      </header>
    )
  } else if (currentPage === 'page4') {
    return (
      <header className="headtag head4">
        <Link to="/">
          <div className="navlink">{'뒤로가기'}</div>
        </Link>
      </header>
    )
  }
}
