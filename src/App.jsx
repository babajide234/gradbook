import { useEffect } from "react";
import {RouterProvider} from "react-router-dom";
import routes from './route/Mainroute';
import { useDispatch,useSelector } from "react-redux";
import { updateToken } from "./store/reducers/AuthSlice";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isLoggedin } = useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  const queryClient = new QueryClient()

  useEffect(() => {
    dispatch(updateToken());
  }, [])
 
  return (
    <>
        <QueryClientProvider client={queryClient}>
           <RouterProvider router={routes} />
        </QueryClientProvider>
    </>
  )
}

export default App
