import './Header.css';
import watch from '../images/elements/watch.png';

function Header() {
    return (
        <>
            <header className='header'>
                    <img className='watch' src={watch} alt="watch" />
                    <h2 className='header-title'>калькулятор времени</h2>
            </header>
        </>
    )
}

export default Header;