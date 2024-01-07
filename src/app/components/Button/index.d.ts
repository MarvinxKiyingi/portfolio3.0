type IButton = {
  to?: string | undefined;
  as?: 'link' | 'button';
  text: string;
  variant?: 'default' | 'outlinedWithTint';
  className?: string;
  onClick?: () => void;
  icon?: 'cross' | 'minus';
  style?: object;
};
