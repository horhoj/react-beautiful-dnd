import { FC, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import styles from './DNDList.module.scss';
import { ItemList } from './ItemList';
import { Column, Item } from './types';

const DROPPABLE_BOARD_ID = 'project-kanban-board';

export const DNDList: FC = () => {
  const [columnList, setColumnList] = useState<Column[]>([
    { id: 0, title: 'column 0' },
    { id: 1, title: 'column 1' },
    { id: 2, title: 'column 2' },
  ]);

  const [itemList, setItemList] = useState<Item[]>([
    { id: 0, columnId: 0, content: 'item 0' },
    { id: 1, columnId: 0, content: 'item 1' },
    { id: 2, columnId: 0, content: 'item 2' },
    { id: 3, columnId: 1, content: 'item 3' },
    { id: 4, columnId: 1, content: 'item 4' },
    { id: 5, columnId: 1, content: 'item 5' },
    { id: 6, columnId: 2, content: 'item 6' },
    { id: 7, columnId: 2, content: 'item 7' },
    { id: 8, columnId: 2, content: 'item 8' },
  ]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (destination) {
      //извлекаем перетаскиваемый элемент из источника
      //индекс столбца в котором находиться элемент
      // console.log(source, destination);
      if (source.droppableId === DROPPABLE_BOARD_ID) {
        //здесь обрабатываем перетаскивание столбцов
        console.log('column');
      } else {
        //здесь обрабатываем перетаскивание элементов
        console.log('element');
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        type="statusLane"
        droppableId={DROPPABLE_BOARD_ID}
        direction="horizontal"
      >
        {(columnDroppableProvided, columnDroppableSnapshot) => (
          <div
            className={styles.wrap}
            {...columnDroppableProvided.droppableProps}
            ref={columnDroppableProvided.innerRef}
          >
            {columnList.map((column, index) => (
              <Draggable
                key={column.id}
                draggableId={column.title}
                index={index}
              >
                {(columnDraggableProvided, columnDraggableSnapshot) => {
                  return (
                    <div
                      className={`${styles.column} ${
                        columnDraggableSnapshot.isDragging
                          ? styles.columnIsDrag
                          : ''
                      }`}
                      ref={columnDraggableProvided.innerRef}
                      {...columnDraggableProvided.draggableProps}
                    >
                      {/*Здесь перетаскиваем таща за заголовок*/}
                      <div
                        {...columnDraggableProvided.dragHandleProps}
                        className={styles.columnTitle}
                      >
                        {column.title}
                      </div>
                      <ItemList
                        itemList={itemList.filter(
                          (item) => item.columnId === column.id,
                        )}
                        columnId={column.id}
                      />
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {columnDroppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
