import Icon from '../assets/images/logo2.png';
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <img src={Icon} alt="" className="header__logo__icon" />
          <span className="header__logo__text">Data Structure</span>
        </div>
        <div className="header__menu">
          <div className="header__menu__item header__menu__home">Home</div>
          <div className="header__menu__item header__menu__category">
            Danh Mục
            <div className="header__menu__category__notify">
              <div className="header__menu__category__notify-title">Stack</div>
              <div className="header__menu__category__notify-title">Queue</div>
              <div className="header__menu__category__notify-title">Tree</div>
              <div className="header__menu__category__notify-title">Linked List</div>
              <div className="header__menu__category__notify-title">Doubly Linked List</div>
              <div className="header__menu__category__notify-title">Binary Search</div>
              <div className="header__menu__category__notify-title">Hash Table</div>
              <div className="header__menu__category__notify-title">Sorting Techniques</div>
              <div className="header__menu__category__notify-title">Insertion Sort</div>
              <div className="header__menu__category__notify-title">Bubble Sort</div>
              <div className="header__menu__category__notify-title">Selection Sort</div>
              <div className="header__menu__category__notify-title">Merge Sort </div>
              <div className="header__menu__category__notify-title">Quick Sort</div>
              <div className="header__menu__category__notify-title">Graph</div>
            </div>
          </div>
          <div className="header__menu__item header__menu__contact">Liên Hệ</div>
        </div>
        <div className="header__search">
          <input className="header__search__input" placeholder="Nhập từ khóa" />
        </div>
      </div>
    </header>
  );
};

export default Header;
