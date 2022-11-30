import { 
    ALUMINI_REGISTER,
    ALUMINI_DETAILS
} from '../utils/constants';
import { 
    register, 
    schools
} from '../utils/thunkFunc';
// import { useDispatch } from 'react-redux'


const payload = {
    endpoint: '',
    values: {
        token:'',
    }
}

// const dispatch = useDispatch();

export const getAlumini = (token) => {
    payload.endpoint = ALUMINI_DETAILS;
    payload.values.token = token
    dispatch(schools(payload))
}