import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds, getStatusRequest, selectOrders } from '../../slices/feed';
import { RequestStatus } from '@utils-types';

export const Feed: FC = () => {
  const orders = useSelector(selectOrders);
  const statusRequest = useSelector(getStatusRequest);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (!orders.length || statusRequest === RequestStatus.Loading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
