import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userDataNameSelector } from '../../slices/user';

export const AppHeader: FC = () => {
  const userName = useSelector(userDataNameSelector);
  return <AppHeaderUI userName={userName} />;
};
