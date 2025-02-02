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
  itemId: number;
  itemName: string;
  quantity: number;
};

export type CalendarListDateCardProps = {
  client: string;
  cost: number;
  orderId: number;
};