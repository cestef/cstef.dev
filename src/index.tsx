import './index.css';

import App from './App';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';

ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals(sendToVercelAnalytics);
