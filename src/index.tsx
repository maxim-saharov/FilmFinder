import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
// без этой строчки не будет работать antd !!!!!!!!!!!!!!
// а без файла declaration.d.ts - не будут модуля css реакта работать
import './index.css'
import App from './App'
import {Provider} from 'react-redux'
import {setupStore} from './store/store'
//import {setupListeners} from '@reduxjs/toolkit/dist/query/react'

const store = setupStore()

// A utility used to enable refetchOnFocus and refetchOnReconnect behaviors
// типо когда убрал фокус c браузера и потом вернулся оно перезапрашивает
// работает в паре с установленным refetchOnFocus: true в хуке useFetchFilmsQuery
//setupListeners(store.dispatch)


ReactDOM.render(
   <Provider store={store}>

      <div className='layout'>
         <App />
      </div>

   </Provider>,
   document.getElementById('root')
)


//console.log(store)

// @ts-ignore
//window.store55 = store

//store55.getState()



