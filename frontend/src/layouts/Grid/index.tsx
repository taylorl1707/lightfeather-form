import classNames from 'classnames';
import './style.scss';

type GridProps = {
  children: React.ReactElement | React.ReactElement[];
};

const Grid = ({ children }: GridProps) => {
  return <div className={classNames('grid-layout')}>{children}</div>;
};

export default Grid;
