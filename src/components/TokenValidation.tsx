import React, { useState, useEffect } from 'react';

type TokenValidationProps = {
  validTokens: string[];
  children: React.ReactNode; // Accept children (protected content)
};

const TokenValidation: React.FC<TokenValidationProps> = ({ validTokens, children }) => {
  const [inputToken, setInputToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = new URL(window.location.href).searchParams.get('token');
    setIsAuthorized(!!token && validTokens.includes(token || ''));
  }, [validTokens]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validTokens.includes(inputToken)) {
      setError(null);
      // Update the URL with the valid token
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('token', inputToken);
      window.location.href = currentUrl.toString();
    } else {
      setError('Invalid token. Please try again.');
    }
  };

  if (!isAuthorized) {
    return (
      <div style={overlayStyles}>
        <div style={modalStyles}>
          {/* <h1>Access Restricted</h1> */}
          <h6>
            This page requires an agreement to sign a Non Disclosure Agreement (NDA). Please enter a token and your
            typed-in signature to agree to our NDA.
          </h6>
          <form onSubmit={handleTokenSubmit}>
            <input
              type="text"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              placeholder="Enter token"
              style={inputStyles}
              required
            />
            <button type="submit" style={submitButtonStyles}>
              Submit
            </button>
          </form>
          {error && <p style={errorStyles}>{error}</p>}
        </div>
      </div>
    );
  }

  // Render protected content when authorized
  return <>{children}</>;
};

// Styles for modal and overlay
const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modalStyles: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  textAlign: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputStyles: React.CSSProperties = {
  padding: '10px',
  fontSize: '16px',
  width: '100%',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const submitButtonStyles: React.CSSProperties = {
  padding: '10px',
  fontSize: '16px',
  marginLeft: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const errorStyles: React.CSSProperties = {
  color: 'red',
  marginTop: '10px',
};

export default TokenValidation;
