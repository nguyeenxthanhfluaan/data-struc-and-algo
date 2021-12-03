import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategory } from '../redux/category/category.actions';
import { fetchSubject } from '../redux/subject/subject.actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const Menu = () => {
  const dispatch = useDispatch();

  const { categories, subjects } = useSelector(({ category, subject }) => ({
    categories: category.categories,
    subjects: subject.subjects,
  }));

  const [categoryActive, setCategoryActive] = useState(0);
  const [subjectActive, setSubjectActive] = useState(0);

  // console.log({ categoryActive })

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchSubject());
  }, []);

  const handleChangeCategory = (category) => {
    if (category === categoryActive) {
      setCategoryActive(0);
    } else {
      console.log({ category });
      setCategoryActive(category);
    }
  };

  const handleChangeSubject = (category, subject) => {
    if (category === categoryActive) {
      if (subject === subjectActive) {
        setSubjectActive(0);
      } else {
        setSubjectActive(subject);
      }
    } else {
      setCategoryActive(category);
      setSubjectActive(subject);
    }
  };

  return (
    <div className="menu">
      <ul className="menu__list" style={{ maxHeight: '1000px' }}>
        {categories &&
          categories.length > 0 &&
          categories.map((category_item) => (
            <li
              key={category_item.id}
              className={`menu__list__item ${categoryActive === category_item._id ? 'active' : ''}`}
            >
              <h6
                className="menu__list__item__heading"
                onClick={() => handleChangeCategory(category_item._id)}
              >
                {category_item.name}

                {categoryActive === category_item._id ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </h6>

              <ul className="menu__list">
                {subjects
                  .filter((subject_item) => subject_item.category._id === category_item._id)
                  .map((subject_item) => (
                    <li
                      key={`${subject_item._id}`}
                      className={`menu__list__item ${
                        subjectActive === subject_item._id ? 'active' : ''
                      }`}
                    >
                      <Link
                        to={`/search?category=${category_item._id}&subject=${subject_item._id}`}
                        // to={`/${category_item._id}/${subject_item._id}`}
                      >
                        <h6
                          className="menu__list__item__heading"
                          onClick={() => handleChangeSubject(category_item._id, subject_item._id)}
                        >
                          {subject_item.name}
                        </h6>
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Menu;

{
  /* <ul className='menu__list' style={{ maxHeight: '1000px' }}>
				<li
					className={`menu__list__item ${
						categoryActive === 1 ? 'active' : ''
					}`}
				>
					<h6
						className='menu__list__item__heading'
						onClick={() => handleChangeCategory(1)}
					>
						Thuat toan va ung dung
						{categoryActive === 1 ? (
							<FontAwesomeIcon icon={faChevronDown} />
						) : (
							<FontAwesomeIcon icon={faChevronUp} />
						)}
					</h6>

					<ul className='menu__list'>
						<li
							className={`menu__list__item ${
								subjectActive === 1 ? 'active' : ''
							}`}
						>
							<h6
								className='menu__list__item__heading'
								onClick={() => handleChangeSubject(1, 1)}
							>
								Subject 1
							</h6>
							<ul className='menu__list'>
								<li className='menu__list__item'>
									<Link to=''>
										<p className='menu__list__item__name'>
											post 1
										</p>
									</Link>
								</li>
								<li className='menu__list__item'>
									<Link to=''>
										<p className='menu__list__item__name'>
											post 2
										</p>
									</Link>
								</li>
								<li className='menu__list__item'>
									<Link to=''>
										<p className='menu__list__item__name'>
											post 3
										</p>
									</Link>
								</li>
							</ul>
						</li>
						<li
							className={`menu__list__item ${
								subjectActive === 2 ? 'active' : ''
							}`}
						>
							<h6
								className='menu__list__item__heading'
								onClick={() => handleChangeSubject(1, 2)}
							>
								Sap xep cham
							</h6>
							<ul className='menu__list'>
								<li className='menu__list__item'>
									<Link to=''>
										<p className='menu__list__item__name'>
											Sap xep nhanh 1
										</p>
									</Link>
								</li>
								<li className='menu__list__item'>
									<Link to=''>
										<p className='menu__list__item__name'>
											Sap xep nhanh 2
										</p>
									</Link>
								</li>
							</ul>
						</li>
						<li
							className={`menu__list__item ${
								subjectActive === 3 ? 'active' : ''
							}`}
						>
							<h6
								className='menu__list__item__heading'
								onClick={() => handleChangeSubject(1, 3)}
							>
								Sap xep trung binh
							</h6>
						</li>
					</ul>
				</li>
				<li
					className={`menu__list__item ${
						categoryActive === 2 ? 'active' : ''
					}`}
				>
					<h6
						className='menu__list__item__heading'
						onClick={() => handleChangeCategory(2)}
					>
						Thuat toan va ung dung
					</h6>

					<ul className='menu__list'>
						<li
							className={`menu__list__item ${
								subjectActive === 1 ? 'active' : ''
							}`}
						>
							<h6
								className='menu__list__item__heading'
								onClick={() => handleChangeSubject(2, 1)}
							>
								Sap xep nhanh
							</h6>
							<ul className='menu__list'>
								<li className='menu__list__item'>
									<Link to=''>
										<p className='menu__list__item__name'>
											Sap xep nhanh 1
										</p>
									</Link>
								</li>
								<li className='menu__list__item'>
									<Link to=''>
										<p className='menu__list__item__name'>
											Sap xep nhanh 2
										</p>
									</Link>
								</li>
								<li className='menu__list__item'>
									<Link to=''>
										<p className='menu__list__item__name'>
											Sap xep nhanh 3
										</p>
									</Link>
								</li>
							</ul>
						</li>
						<li
							className={`menu__list__item ${
								subjectActive === 2 ? 'active' : ''
							}`}
						>
							<h6
								className='menu__list__item__heading'
								onClick={() => handleChangeSubject(2, 2)}
							>
								Sap xep cham
							</h6>
							<ul className='menu__list'>
								<li className='menu__list__item'>
									<Link to=''>
										<p className='menu__list__item__name'>
											Sap xep nhanh 1
										</p>
									</Link>
								</li>
								<li className='menu__list__item'>
									<Link to=''>
										<p className='menu__list__item__name'>
											Sap xep nhanh 2
										</p>
									</Link>
								</li>
							</ul>
						</li>
						<li
							className={`menu__list__item ${
								subjectActive === 3 ? 'active' : ''
							}`}
						>
							<h6
								className='menu__list__item__heading'
								onClick={() => handleChangeSubject(2, 3)}
							>
								Sap xep trung binh
							</h6>
						</li>
					</ul>
				</li>
			</ul> */
}
