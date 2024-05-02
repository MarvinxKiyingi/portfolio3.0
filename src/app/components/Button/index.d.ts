type IButton = {
  to?: string | undefined;
  as?: 'link' | 'button';
  text: string;
  variant?: 'default' | 'outlinedWithTint';
  className?: string;
  id?: string;
  onClick?: () => void;
  icon?: 'cross' | 'minus';
  isIconRotated?: boolean;
  style?: object;
  iconStyles?: object;
};
