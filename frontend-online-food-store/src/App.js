import { Outlet } from 'react-router-dom';
import Header from './component/Header';


function App() {
  return (
    <>
     <Header />
     <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet />
     </main>
    </>
  );
}

export default App;
