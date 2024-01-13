import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';

const Popup = () => {
  return (
    <div className="popup">
      <div className="header">
        <h1>PriceTuner for Myntra</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_2_22)">
            <path
              d="M18.6728 10.8728L10.7272 2.92724C10.3896 2.58967 9.93181 2.40003 9.45443 2.40002H1.8C0.805875 2.40002 0 3.2059 0 4.20002V11.8544C2.49629e-06 12.3318 0.189646 12.7897 0.527213 13.1272L8.47279 21.0728C9.17569 21.7758 10.3154 21.7758 11.0184 21.0728L18.6728 13.4184C19.3757 12.7154 19.3757 11.5757 18.6728 10.8728ZM4.2 8.40002C3.20588 8.40002 2.4 7.59415 2.4 6.60002C2.4 5.6059 3.20588 4.80002 4.2 4.80002C5.19413 4.80002 6 5.6059 6 6.60002C6 7.59415 5.19413 8.40002 4.2 8.40002ZM23.4728 13.4184L15.8184 21.0728C15.1154 21.7758 13.9757 21.7758 13.2728 21.0728L13.2593 21.0593L19.7865 14.5321C20.424 13.8946 20.775 13.0471 20.775 12.1456C20.775 11.2441 20.4239 10.3966 19.7865 9.7591L12.4274 2.40002H14.2544C14.7318 2.40003 15.1896 2.58967 15.5272 2.92724L23.4728 10.8728C24.1757 11.5757 24.1757 12.7154 23.4728 13.4184Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_2_22">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="content">
        <p className="developer-text">Developed by Bilal Mansuri</p>
        <p className="instruction-text">
          Tailor your search to fit not just your style but also your budget 💰
          <br />
          Set your price range and view only the products that fit your budget 🙌
        </p>
        <div className="linkedin-button">
          <a href="https://www.linkedin.com/in/bilalmansuri/" target="_blank" className="button-text" rel="noreferrer">
            Connect with me on LinkedIn
          </a>
        </div>
        <p className="shopping-message">Happy Shopping! 🛒</p>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
