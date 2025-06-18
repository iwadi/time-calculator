import './Slider.css';

type Tab = 'ComputationTime' | 'SubtractionOfTime' | 'ReadingTime';

interface SliderProps {
    setActiveTab: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string }[] = [
    { id: 'ComputationTime', label: 'Время вычисления' },
    { id: 'SubtractionOfTime', label: 'Вычитание времени' },
    { id: 'ReadingTime', label: 'Считывание времени' },
];

function Slider({ setActiveTab }: SliderProps) {
    return (
        <div className="content-section_1">
            {tabs.map((tab) => (
                <h3 
                    key={tab.id}
                    className='page-title' 
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </h3>
            ))}
        </div>
    );
}

export default Slider;