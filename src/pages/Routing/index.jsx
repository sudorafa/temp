
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Home from '../Home';
import List from '../List';

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          Component={Home}
        />
        <Route
          exact
          path='/list/new'
          element={<List mode='create' />}
        />
        <Route
          exact
          path='/list/edit/:id'
          element={<List mode='edit' />}
        />
      </Routes>

    </BrowserRouter>
  )
}