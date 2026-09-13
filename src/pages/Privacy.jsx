/* "/privacy" route. Content lives in data/legal.js. */
import LegalPage from '../components/LegalPage';
import { privacyPolicy } from '../data/legal';

export default function Privacy() {
    return <LegalPage doc={privacyPolicy} />;
}
