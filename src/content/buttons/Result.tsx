import './Result.css';
import { formatTime } from '../../utils/formatTime';

interface ResultProps {
    totalSeconds?: number;
    error?: string;
    label?: string;
}

function Result({ totalSeconds, error, label = 'Общее время:' }: ResultProps) {
    if (error) {
        return (
            <div className="button-result">
                <span className='error-message'>{error}</span>
            </div>
        );
    }

    if (totalSeconds === undefined) return null;

    return (
        <div className="button-result">
            <span>{label}</span>
            <span className='result'>
                {formatTime(totalSeconds)}
            </span>
        </div>
    );
}

export default Result;