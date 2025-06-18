import { useState } from 'react';
import Result from '../buttons/Result';

function ComputationTime() {
    const [operations, setOperations] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [showResult, setShowResult] = useState<boolean>(false);

    const calculateTime = () => {
        setError('');
        setShowResult(false);
        
        if (operations <= 0 || speed <= 0) {
            setError('Введите положительные значения');
            return;
        }

        setShowResult(true);
    };

    const renderInput = (
        label: string,
        value: number,
        onChange: (value: number) => void,
        min: number,
        step?: number
    ) => (
        <div className="input-group">
            <label className='label'>
                <span className='text'>{label}</span>
                <input 
                    type="number" 
                    value={value || ''}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                            onChange(0);
                        } else {
                            const numVal = Number(val);
                            if (!isNaN(numVal) && numVal >= min) {
                                onChange(numVal);
                            }
                        }
                    }}
                    min={min}
                    step={step}
                />
            </label>
        </div>
    );

    return (
        <div className="content-section_2">
            <div className="input-groups">
                {renderInput('Количество операций:', operations, setOperations, 1)}
                {renderInput('Скорость (опер/сек):', speed, setSpeed, 0.01, 0.01)}
            </div>
            <button onClick={calculateTime} className="add-time-group">
                Рассчитать
            </button>
            
            {error && <Result error={error} />}
            {showResult && !error && <Result totalSeconds={operations / speed} />}
        </div>
    );
}

export default ComputationTime;