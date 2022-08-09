import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Admin } from './pages/Admin/Admin';
import { EditMovie } from './pages/EditMovie/EditMovie';
import { Genre } from './pages/Genre/Genre';
import { Genres } from './pages/Genres/Genres';
import { Home } from './pages/Home/Home';
import { Movie } from './pages/Movie/Movie';
import { Movies } from './pages/Movies/Movies';

function App() {
  return (
    <Router>
      <div className='container'>
        <div className='row'>
          <h1 className='mt-3'>Go Watch a Movie!</h1>
          <hr className='mb-3' />
        </div>

        <div className='row'>
          <div className='col-md-2'>
            <nav>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <Link to='/'>Home</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/movies'>Movies</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/genres'>Genres</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/admin/movie/0'>Add Movie</Link>
                </li>
                <li className='list-group-item'>
                  <Link to='/admin'>Manage Catalogue</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className='col-md-10'>
            <Routes>
              <Route path='/movies/:id' element={<Movie />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/genres/:id' element={<Genre />} />
              <Route path='/genres' element={<Genres />} />
              <Route path='/admin/movie/:id' element={<EditMovie />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
