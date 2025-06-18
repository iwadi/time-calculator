import { useState, useEffect, useCallback } from 'react';
import Result from '../buttons/Result';

interface TimeInputGroup {
    id: number;
    hours: string;
    minutes: string;
    seconds: string;
}

const INITIAL_GROUPS_COUNT = 5;
const ADDITIONAL_GROUPS_COUNT = 5;

function ReadingTime() {
    const [inputGroups, setInputGroups] = useState<TimeInputGroup[]>(() => 
        Array.from({ length: INITIAL_GROUPS_COUNT }, (_, i) => ({
            id: i + 1,
            hours: '',
            minutes: '',
            seconds: ''
        }))
    );
    const [totalSeconds, setTotalSeconds] = useState<number>(0);

    const calculateTotal = useCallback((groups: TimeInputGroup[]) => {
        return groups.reduce((sum, group) => {
            const hours = group.hours ? parseInt(group.hours) : 0;
            const minutes = group.minutes ? parseInt(group.minutes) : 0;
            const seconds = group.seconds ? parseInt(group.seconds) : 0;
            return sum + (hours * 3600 + minutes * 60 + seconds);
        }, 0);
    }, []);

    useEffect(() => {
        setTotalSeconds(calculateTotal(inputGroups));
    }, [inputGroups, calculateTotal]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number,
        type: 'hours' | 'minutes' | 'seconds'
    ) => {
        const value = e.target.value;

        if (value && !/^\d*$/.test(value)) {
            return;
        }

        setInputGroups(prevGroups =>
            prevGroups.map(group => {
                if (group.id !== id) return group;

                const newValue = value === ''
                    ? ''
                    : type === 'hours'
                        ? Math.min(parseInt(value), 24).toString()
                        : Math.min(parseInt(value), 59).toString();

                return { ...group, [type]: newValue };
            })
        );
    };


    const addTimeInputGroup = useCallback(() => {
        const maxId = Math.max(...inputGroups.map(g => g.id), 0);
        const newGroups = Array.from({ length: ADDITIONAL_GROUPS_COUNT }, (_, i) => ({
            id: maxId + i + 1,
            hours: '',
            minutes: '',
            seconds: ''
        }));
        setInputGroups(prev => [...prev, ...newGroups]);
    }, [inputGroups]);

    const removeTimeInputGroup = useCallback((id: number) => {
        if (inputGroups.length <= 1) return;
        setInputGroups(prev => prev.filter(group => group.id !== id));
    }, [inputGroups.length]);

    return (
        <div className="content-section_2">
            {inputGroups.map((group) => (
                <div key={group.id} className="time-input-group">
                    <label>
                        <input 
                            className='input'
                            type="text" 
                            value={group.hours}
                            onChange={(e) => handleInputChange(e, group.id, 'hours')}
                            min="0"
                            max="24"
                            placeholder="Час"
                            inputMode="numeric"
                        />
                        :
                        <input 
                            className='input'
                            type="text" 
                            value={group.minutes}
                            onChange={(e) => handleInputChange(e, group.id, 'minutes')}
                            min="0"
                            max="59"
                            placeholder="Мин"
                            inputMode="numeric"
                        />
                        :
                        <input 
                            className='input'
                            type="text" 
                            value={group.seconds}
                            onChange={(e) => handleInputChange(e, group.id, 'seconds')}
                            min="0"
                            max="59"
                            placeholder="Сек"
                            inputMode="numeric"
                        />
                    </label>
                    {inputGroups.length > 1 && (
                        <button 
                            onClick={() => removeTimeInputGroup(group.id)}
                            className="remove-time-group"
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}
            <button 
                onClick={addTimeInputGroup} 
                className="add-time-group"
            >
                + Добавить время
            </button>
            
            <Result 
                totalSeconds={totalSeconds} 
            />
        </div>
    );
}

export default ReadingTime;