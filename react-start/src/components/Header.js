import React from 'react'

export default function Header() {
  return (
    <header>
        <div>
            <span className='logo'>Генерация изображений</span>
            <ul className='navigation'>
                <li>Вход</li>
                <li>Регистрация</li>
            </ul>
        </div>
        <div className='presentation'></div>
    </header>
  )
}
