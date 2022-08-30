//
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import saharovData from '../saharovData'


export interface IFilm {
   Title: string;
   Year: string;
   imdbID: string;
   Type: string;
   Poster: string;
}

export interface Response {
   Search: IFilm[];
   totalResults: string;
   Response: string;
}


export const postAPI = createApi({

   reducerPath: 'postAPI',

   baseQuery: fetchBaseQuery({baseUrl: 'https://www.omdbapi.com/'}),

   // если клацнуть например на tagTypes - то проваливаемся во внутрь как бы документации
   tagTypes: ['Movie'],

   endpoints: (build) => ({

      fetchFilms: build.query<IFilm[], string>({

         query: (title) => ({
            url: '/',
            params: {
               s: title,
               apikey: saharovData.OMDbApiKey
            }
         }),
         providesTags: ['Movie'],
         // тут переделали ответ и вернули сразу массив
         transformResponse: (response: Response) => response.Search

         // transformResponse: (response: Response, meta) => {
         //    console.log(meta)
         //    // это все данные что в консоле можем увидеть
         //    // типо код ответа и т.д.
         //    return response.Search
         // }

      }),

      // через это может добавлять фильм и потом через теги
      // обновится и получение данных по тем данным что были в инпуте
      // это мок (mock) функция для примера
      addMovie: build.mutation<void, void>({
         // в TS типы void и undefined — это почти одно и то же.
         // то есть void - это типо ничего - то есть тут ничего не передаем и ничего не возвращаем
         // Возвращаемый тип void может быть заменён на другие типы, что позволяет
         // реализовывать продвинутые паттерны работы с коллбэками.
         // https://habr.com/ru/company/ruvds/blog/468229/
         query: () => ({
            url: '/add-movie'
         }),
         invalidatesTags: ['Movie']

         // и так можно делать
         // ид передаем через параметр как обычно и в таком случии
         // обновится не все запросы Movie а только с конкретным ид
         // result тут данные о запросе а в гет запросе
         // так же делаем и берем данные об ответе
         //invalidatesTags: result => [{type: 'Movie', id: '123'}]
      })

   })

})


// paste json as types in webstorm -
// установил плагин json2ts и в контекстном меню есть оно теперь






