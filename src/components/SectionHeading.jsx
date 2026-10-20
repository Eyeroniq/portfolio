import Reveal from './Reveal.jsx'
import './SectionHeading.css'

export default function SectionHeading({ index, label, title, id, children }) {
  return (
    <Reveal className="section-heading">
      <p className="section-heading__label mono">
        <span className="section-heading__index">{index}</span>
        <span className="section-heading__rule" aria-hidden="true" />
        {label}
      </p>
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
      {children && <p className="section-heading__lead">{children}</p>}
    </Reveal>
  )
}
