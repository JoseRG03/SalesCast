import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type CustomTableRowProps = {
  columns: number;
  children: ReactNode | ReactNode[];
  className?: string;
};

export type OrderItem = {
  product_id: number;
  product_name: string;
  items_per_unit: number;
  quantity: number;
  unit_price: number;
};

export type CalendarListDateCardProps = {
  client: string;
  cost: number;
  orderId: number;
};