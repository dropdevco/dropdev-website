/*
 * "/data-deletion" route. Content lives in data/legal.js and is shared with
 * section 4 of the Privacy Policy.
 *
 * This exists as its own URL because Meta's app review wants the deletion
 * instructions at a dedicated, directly reachable address rather than an
 * anchor inside a longer document.
 */
import LegalPage from '../components/LegalPage';
import { dataDeletion } from '../data/legal';

export default function DataDeletion() {
    return <LegalPage doc={dataDeletion} />;
}
