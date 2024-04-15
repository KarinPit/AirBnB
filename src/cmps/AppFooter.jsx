export function AppFooter({ location }) {
  return (
    <div className={`app-footer full ${location === '/' ? '' : 'bottom-footer'}`}>
      <p>© 2024 Airbnb, Inc</p>
    </div>
  )
}