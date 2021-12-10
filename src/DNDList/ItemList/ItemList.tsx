import { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Item } from '../types';
import styles from './ItemList.module.scss';

interface ItemListProps {
  itemList: Item[];
  columnId: number;
}

export const ItemList: FC<ItemListProps> = ({ itemList, columnId }) => {
  return (
    <div>
      <Droppable droppableId={columnId.toString()}>
        {(itemDroppableProvided, itemDroppableSnapshot) => (
          <ul
            {...itemDroppableProvided.droppableProps}
            ref={itemDroppableProvided.innerRef}
            className={styles.itemList}
          >
            {itemList.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id.toString()}
                index={index}
              >
                {(itemDraggableProvided, itemDraggableSnapshot) => (
                  <li
                    ref={itemDraggableProvided.innerRef}
                    {...itemDraggableProvided.draggableProps}
                    {...itemDraggableProvided.dragHandleProps}
                    className={`${styles.item} ${
                      itemDraggableSnapshot.isDragging ? styles.itemIsDrag : ''
                    }`}
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {itemDroppableProvided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};
