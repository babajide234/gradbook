import { useEffect } from "react";
import {RouterProvider} from "react-router-dom";
import routes from './route/Mainroute';
import { useDispatch } from "react-redux";
import { updateToken } from "./store/reducers/AuthSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateToken());
  }, [])

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
