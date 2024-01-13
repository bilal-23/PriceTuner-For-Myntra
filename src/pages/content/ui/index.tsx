import App from '@pages/content/ui/app';
import { createRoot } from 'react-dom/client';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './injected.css?inline';

refreshOnUpdate('pages/content');

function createReactRoot() {
  const root = document.createElement('div');
  root.id = 'price-filter';

  const style = document.createElement('style');
  style.innerHTML = injectedStyle;
  document.head.appendChild(style);

  const reactApp = createRoot(root);
  reactApp.render(<App />);
  return root;
}

function renderReactApp() {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const filtersHeaderDiv = document.querySelectorAll('.vertical-filters-header') as NodeListOf<HTMLDivElement>;

        const priceFilterDiv = Array.from(filtersHeaderDiv).find(
          div => div.innerText.toLowerCase() === 'price',
        ) as HTMLDivElement;

        if (priceFilterDiv) {
          const root = createReactRoot();
          priceFilterDiv.nextSibling?.before(root);
          observer.disconnect(); // Stop observing once the component is injected
          break;
        }
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

renderReactApp();
