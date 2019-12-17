import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { MenuItem, HoverContext } from './main-menu';
import { menuProps } from './recursive-props';
import {
  getHrefByType, getIdByCategory, handleUnsavedChanges,
} from './helpers';
import getTargetByType from '../../helpers/get-target-by-type';

const SecondLevel = ({
  id,
  title,
  href,
  items,
  level,
  type,
  active,
  handleSetActiveIds,
}) => {
  const hoveredSecondLevelId = useContext(HoverContext).secondLevelId;
  const hasSubitems = items.length > 0;

  return (
    <li
      className={ClassNames(
        'menu-list-group-item',
        {
          'tertiary-nav-item-pf': hasSubitems,
          'is-hover': hoveredSecondLevelId === id,
          active,
        },
      )}
      id={getIdByCategory(hasSubitems, id)}
      onMouseEnter={() => (handleSetActiveIds(hasSubitems ? { secondLevelId: id } : undefined))}
      onMouseLeave={() => handleSetActiveIds({ secondLevelId: undefined })}
    >
      <a
        href={getHrefByType(type, href, id)}
        onClick={(event) => {
          if (handleUnsavedChanges(type) === false) {
            event.preventDefault();
          }
          return false;
        }}
        target={getTargetByType(type)}
      >
        <span className="list-group-item-value">{title}</span>
      </a>
      <div className="nav-pf-tertiary-nav">
        <div className="nav-item-pf-header">
          <a>
            <span>{title}</span>
          </a>
        </div>
        {hasSubitems && (
          <ul className="list-group">
            {items.map(props => <MenuItem key={props.id} level={level + 1} {...props} />)}
          </ul>
        )}
      </div>
    </li>
  );
};

SecondLevel.propTypes = {
  ...menuProps,
  items: PropTypes.arrayOf(PropTypes.shape({
    ...menuProps,
  })),
};

SecondLevel.defaultProps = {
  items: [],
};

export default SecondLevel;
