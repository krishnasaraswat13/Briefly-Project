import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'primary',
  size = 'md',
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scal-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 whitespace: flex-nowrap';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 hover:from-secondary hover:to-primary hover:shadow-xl',
    secondary: 'bg-light/20 hover:bg-light/30 border border-primary/30 text-light',
    outline: 'hover:bg-primary/10 border border-primary/50 text-primary',
  };

  const sizeStyles = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-5 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[baseStyles, variantStyles[variant], sizeStyles[size], className].join(' ')}
    >
      {children}
    </button>
  );
};

export default Button;
