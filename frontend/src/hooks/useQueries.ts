import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Order, OrderStatus } from '../backend';

export function useGetProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductById(productId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!actor) throw new Error('No actor');
      return actor.getProductById(productId);
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function useGetOrderStatus(orderId: string, enabled: boolean) {
  const { actor, isFetching } = useActor();
  return useQuery<OrderStatus>({
    queryKey: ['orderStatus', orderId],
    queryFn: async () => {
      if (!actor) throw new Error('No actor');
      return actor.getOrderStatus(orderId);
    },
    enabled: !!actor && !isFetching && !!orderId && enabled,
    retry: false,
  });
}

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<Order[]>({
    queryKey: ['allOrders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}
