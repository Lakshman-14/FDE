interface HeaderProps {
  apiOnline: boolean | null
}

function Header({ apiOnline }: HeaderProps) {
  const statusLabel = apiOnline === null ? 'Checking API' : apiOnline ? 'API connected' : 'API unavailable'

  return (
    <header className="app-header">
      <a className="brand" href="/" aria-label="Care Queue home">
        <span className="brand-mark" aria-hidden="true">+</span>
        <span>
          <strong>CareQueue</strong>
          <small>Diabetes readmission intervention</small>
        </span>
      </a>
      <div className={`connection-status ${apiOnline === false ? 'connection-status--offline' : ''}`}>
        <span className="connection-dot" />
        {statusLabel}
      </div>
    </header>
  )
}

export default Header
