import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Fichas } from './pages/fichas'
import { Ficha } from './pages/ficha'
import { Campanhas } from './pages/campanhas'
import { Campanha } from './pages/campanha'
import { Fichas_Favoritas } from './pages/fichas.favoritas'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/> {/*retorna a página inical*/}

      <Route path='/personagem' element={<Fichas/>}/> {/*retorna todas as fichas*/}
      <Route path='/personagem/:id' element={<Ficha/>}/> {/*retorna uma ficha com um nome único*/}

      <Route path='/campanhas' element={<Campanhas/>}/> {/*retorna todas as campanhas*/}
      <Route path='/campanhas/:id' element={<Campanha/>}/> {/*retorna uma campanha específica com um nome específico*/}
      
      <Route path='/favoritos' element={<Fichas_Favoritas/>}/> {/*retorna as fichas favoritas*/}
    </Routes>
  )
}

export default App
