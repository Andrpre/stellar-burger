import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { clearInfo, getOrder, selectInfo } from '../../slices/order';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '../../slices/ingredients';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const orderData = useSelector(selectInfo);
  const ingredientsData = useSelector(selectIngredients);
  const orderIdString = useParams();

  const orderId = Number(orderIdString.number);

  useEffect(() => {
    dispatch(getOrder(orderId));

    return () => {
      dispatch(clearInfo());
    };
  }, []);

  const ingredients = ingredientsData.filter((item) =>
    orderData?.ingredients.some((item2) => item2 === item._id)
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
