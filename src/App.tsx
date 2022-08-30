import React, {ChangeEvent, useState} from 'react'
import {Input, Button, Typography} from 'antd'
import './App.css'
import {postAPI} from './services/PostService'
import PostItemFilm from './components/PostItemFilm'


const {Title} = Typography

function App() {

   const [searchTitle, setSearchTitle] = useState('Dune')

   // кеш примерно хранится 1 минуту - тоесть если делаем 5 запросов
   // и потом минуту ничего не делаем то они удаляются
   // через pollingInterval: 0 делается отписка
   // и остается только кеш по тому слову что сейчас в инпуте

   let {data: films} = postAPI.useFetchFilmsQuery(searchTitle, {
      // через подсказку можно посмотреть все параметры что тут доступны
      // скип - по условию что то пропускает
      skip: searchTitle.length < 3
      // типо когда убрал фокус c браузера и потом вернулся оно перезапрашивает
      // работает в паре с установленным setupListeners(store.dispatch)
      //refetchOnFocus: true
   })

   // этим хуком делаем принудительно получение нового запроса
   const [fetchFilms] = postAPI.useLazyFetchFilmsQuery()

   // в него как то что то передаешь и он загружать данные при наведении на карточку
   // фильма и потом когда пользователь клацнет в фильм - карточка очень быстро откроется
   //const prefetch = postAPI.usePrefetch()

   // хук по добавлению чего либо
   //const [addMovie] = postAPI.useAddMovieMutation();

   //films = films?.slice(0, 3)


   const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTitle(event.target.value)
   }
   const onClick = () => {
      fetchFilms(searchTitle)
      //addMovie();
   }


   return (
      <div>

         <div className='title'>
            <Title>Film finder</Title>
            <Button type='primary' onClick={onClick}>
               Refetch films
            </Button>
         </div>

         <div className='search'>
            <Input
               placeholder='What are you looking for? For example "Blade"'
               size='large'
               onChange={onChange}
            />
         </div>

         <div className='grid'>
            {films?.map(post => (
               <PostItemFilm key={post.imdbID} post={post} />

            ))}
         </div>

         <div className='created-by'>
            Film finder ©2022 Created by

            <a
               href={`https://maxim-saharov.com.ua`}
               target='_blank' rel='noopener noreferrer'
               className='pad-left-10px'
            >
               Maxim Saharov
            </a>

            <span className='pad-left-10px'>|</span>

            <a
               href={`https://github.com/maxim-saharov/FilmFinder`}
               target='_blank' rel='noopener noreferrer'
               className='pad-left-10px'
            >
               GitHub
            </a>

         </div>

      </div>
   )
}

export default App
