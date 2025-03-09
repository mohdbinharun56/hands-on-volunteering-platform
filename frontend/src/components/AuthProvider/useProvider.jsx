
import { useContext } from 'react';
import { CreateAuth } from './AuthProvider';

const useProvider = () => {
    const result = useContext(CreateAuth);
    if (!result) {
        throw new Error("")
    }
    return result;
};

export default useProvider;