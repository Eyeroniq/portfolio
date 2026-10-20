import './Button.css'

/**
 * Pill / ghost button that renders as <a> when `href` is set.
 * `disabled` renders an inert, clearly-unavailable control with a hover hint.
 */
export default function Button({
  href,
  variant = 'ghost',
  icon: Icon,
  iconPosition = 'end',
  disabled = false,
  disabledLabel,
  children,
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant}${disabled ? ' is-disabled' : ''} ${className}`.trim()
  const content = (
    <>
      {Icon && iconPosition === 'start' && <Icon className="btn__icon" size={16} aria-hidden="true" />}
      <span className="btn__label">{children}</span>
      {Icon && iconPosition === 'end' && <Icon className="btn__icon" size={16} aria-hidden="true" />}
    </>
  )

  if (disabled) {
    return (
      <span className={classes} role="link" aria-disabled="true" tabIndex={0} {...props}>
        {content}
        {disabledLabel && (
          <span className="btn__hint" role="tooltip">
            {disabledLabel}
          </span>
        )}
      </span>
    )
  }

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
