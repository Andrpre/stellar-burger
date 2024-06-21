import { FC, useMemo } from 'react';
import { RequestStatus, TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectState } from '../../slices/burgerConstructor';
import {
  selectInfo,
  selectStatus,
  createOrder,
  clearInfo
} from '../../slices/order';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectState);
  const status = useSelector(selectStatus);
  const orderModalData = useSelector(selectInfo);
  const dispatch = useDispatch();

  const orderRequest = status === RequestStatus.Loading ? true : false;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIdArr = constructorItems.ingredients.map(
      (item) => item._id
    );
    ingredientsIdArr.push(constructorItems.bun._id);
    dispatch(createOrder(ingredientsIdArr));
  };
  const closeOrderModal = () => {
    dispatch(clearInfo());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
