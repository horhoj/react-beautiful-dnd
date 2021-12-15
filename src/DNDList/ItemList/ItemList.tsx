import { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Item, ItemsData } from '../types';
import styles from './ItemList.module.scss';

interface ItemListProps {
  // itemList: Item[];
  itemsData: ItemsData;
  itemIdList: number[];
  columnId: number;
}

export const ItemList: FC<ItemListProps> = ({
  itemIdList,
  itemsData,
  columnId,
}) => {
  return (
    <div>
      <Droppable droppableId={columnId.toString()}>
        {(itemDroppableProvided, itemDroppableSnapshot) => (
          <ul
            {...itemDroppableProvided.droppableProps}
            ref={itemDroppableProvided.innerRef}
            className={styles.itemList}
          >
            {itemIdList.map((itemId, index) => (
              <Draggable
                key={itemId}
                draggableId={itemId.toString()}
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
                    {itemsData[itemId].content}
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
