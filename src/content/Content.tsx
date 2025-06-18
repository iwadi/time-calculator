import './Content.css';
import './time/Time.css';
import './time/TimeMedia.css';
import Slider from './slider/Slider';
import { useState } from 'react';
import ComputationTime from './time/ComputationTime';
import SubtractionOfTime from './time/SubtractionOfTime';
import ReadingTime from './time/ReadingTime';

type Tab = 'ComputationTime' | 'SubtractionOfTime' | 'ReadingTime';

function Content() {
    const [activeTab, setActiveTab] = useState<Tab>('ComputationTime');

    const renderContent = () => {
        const components: Record<Tab, React.ReactNode> = {
            ComputationTime: <ComputationTime />,
            SubtractionOfTime: <SubtractionOfTime />,
            ReadingTime: <ReadingTime />,
        };

        return components[activeTab] || <ComputationTime />;
    };

    return (
        <div className="content">
            <Slider setActiveTab={setActiveTab} />
            {renderContent()}
        </div>
    );
}

export default Content;