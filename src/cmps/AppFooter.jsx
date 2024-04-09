export function AppFooter({ location }) {
  return (
    <div className={`app-footer full ${location === '/' ? '' : 'bottom-footer'}`}>
      <p>© 2024 Airbnb, Inc</p>
      <p>Terms</p>
      <p>Sitemap</p>
      <p>Privacy</p>
      <p>Your Privacy Choices</p>
      <div>
        <p>Authors:</p>
        {/* <h1>Airbnb Footer</h1> */}
      </div>
    </div>
  )
}