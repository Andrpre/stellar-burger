import { useSelector} from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // const isAuthChecked = useSelector(isAuthCheckedSelector);
    // const user = useSelector(userDataSelector);

    return children ;
}