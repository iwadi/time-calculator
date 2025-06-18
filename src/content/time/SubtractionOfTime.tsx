import { useState } from 'react';
import Result from '../buttons/Result';

interface Time {
    hours: string;
    minutes: string;
    seconds: string;
}

function SubtractionOfTime() {
    const [time1, setTime1] = useState<Time>({ hours: '0', minutes: '0', seconds: '0' });
    const [time2, setTime2] = useState<Time>({ hours: '', minutes: '', seconds: '' });
    const [error, setError] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);

    const handleTimeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        timeType: 'time1' | 'time2',
        field: keyof Time
    ) => {
        const value = e.target.value;

        if (value && !/^\d*$/.test(value)) return;

        // const numValue = value === '' ? '' : parseInt(value).toString();

        let limitedValue = value;

        if (value !== '') {
            const parsed = parseInt(value);
            if (field === 'hours') {
                limitedValue = Math.min(parsed, 24).toString();
            } else if (field === 'minutes' || field === 'seconds') {
                limitedValue = Math.min(parsed, 59).toString();
            }
        }

        if (timeType === 'time1') {
            setTime1(prev => ({ ...prev, [field]: limitedValue }));
        } else {
            setTime2(prev => ({ ...prev, [field]: limitedValue }));
        }
    };

    const handleFocus = (timeType: 'time1' | 'time2', field: keyof Time) => {
        const time = timeType === 'time1' ? time1 : time2;
        if (time[field] === '0') {
            if (timeType === 'time1') {
                setTime1(prev => ({ ...prev, [field]: '' }));
            } else {
                setTime2(prev => ({ ...prev, [field]: '' }));
            }
        }
    };

    const calculateTimeDifference = () => {
        setError('');
        const parseTime = (time: Time) => {
            const hours = parseInt(time.hours) || 0;
            const minutes = parseInt(time.minutes) || 0;
            const seconds = parseInt(time.seconds) || 0;
            return hours * 3600 + minutes * 60 + seconds;
        };

        const totalSeconds1 = parseTime(time1);
        const totalSeconds2 = parseTime(time2);
        const difference = totalSeconds1 - totalSeconds2;

        if (difference < 0) {
            setError("Второе время не может быть больше первого");
            setResult(null);
            return;
        }

        setResult(difference);
    };

    const renderTimeInputs = (timeType: 'time1' | 'time2', label: string) => {
        const time = timeType === 'time1' ? time1 : time2;
        
        return (
            <label className='label'>
                <span className='text'>{label}</span>
                <div className='inputs-line'>
                    <input 
                        type="number" 
                        min="0"
                        max="24"
                        value={time.hours}
                        onChange={(e) => handleTimeChange(e, timeType, 'hours')}
                        onFocus={() => handleFocus(timeType, 'hours')}
                        placeholder="Час"
                    />
                    <input 
                        type="number" 
                        min="0" 
                        max="59"
                        value={time.minutes}
                        onChange={(e) => handleTimeChange(e, timeType, 'minutes')}
                        onFocus={() => handleFocus(timeType, 'minutes')}
                        placeholder="Мин"
                    />
                    <input 
                        type="number" 
                        min="0" 
                        max="59"
                        value={time.seconds}
                        onChange={(e) => handleTimeChange(e, timeType, 'seconds')}
                        onFocus={() => handleFocus(timeType, 'seconds')}
                        placeholder="Сек"
                    />
                </div>
            </label>
        );
    };

    return (
        <div className="content-section_2">
            {renderTimeInputs('time1', 'Первое время:')}
            {renderTimeInputs('time2', 'Второе время:')}
            <button className='add-time-group' onClick={calculateTimeDifference}>
                Рассчитать разницу
            </button>
            
            {error ? (
                <Result error={error} />
            ) : result !== null ? (
                <Result totalSeconds={result} />
            ) : null}
        </div>
    );
}

export default SubtractionOfTime;