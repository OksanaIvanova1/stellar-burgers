import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { burgerConstructorSliceSelectors } from '../../services/burgerConstructorSlice';
import { ordersSliceSelectors } from '../../services/ordersSlice';
import { userSliceSelectors } from '../../services/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  orderBurger,
  orderSliceActions,
  orderSliceSelectors
} from '../../services/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(
    burgerConstructorSliceSelectors.selectBurgerConstructorState
  );

  const orderRequest = useSelector(ordersSliceSelectors.selectIsLoading);

  const orderModalData = useSelector(orderSliceSelectors.selectOrder);
  const user = useSelector(userSliceSelectors.selectUser);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const burgerIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(burgerIngredients));
  };
  const closeOrderModal = () => dispatch(orderSliceActions.resetOrder());

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
