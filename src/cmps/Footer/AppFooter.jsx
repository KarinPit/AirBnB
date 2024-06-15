import React from "react";

export function AppFooter() {
  return (
      <div className="app-footer">
        <div className="footer-left">
          <p>© 2024 Airbnb, Inc.</p>
          <a href="/terms">Terms</a>
          <span> · </span>
          <a href="/sitemap">Sitemap</a>
          <span> · </span>
          <a href="/privacy">Privacy</a>
          <span> · </span>
          <a href="/privacy-choices">Your Privacy Choices</a>
        </div>
        <div className="footer-right">
          <a href="/language">
            <span role="img" aria-label="globe">🌐</span> English (US)
          </a>
          <span> · </span>
          <a href="/currency">ILS</a>
          <span> · </span>
          <a href="/support">Support & resources <span>▼</span></a>
        </div>
      </div>
  );
}
