import { FC, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { ItemList } from './ItemList';
import { ColumnsData, ItemsData, ItemIdListsData } from './types';
import { movingColumns, movingElements } from './helpers';
import styles from './DNDList.module.scss';

const DROPPABLE_BOARD_ID = 'project-kanban-board';

export const DNDList: FC = () => {
  const [columnIdList, setColumnIdList] = useState<number[]>([0, 1, 2]);

  const [columnsData, setColumnsData] = useState<ColumnsData>({
    0: { title: 'column0' },
    1: { title: 'column1' },
    2: { title: 'column2' },
  });

  const [itemIdListsData, setItemIdListsData] = useState<ItemIdListsData>({
    // columnId --- [itemId, itemId ...]
    0: [0, 1, 2],
    1: [3, 4, 5],
    2: [6, 7, 8, 9],
  });

  const [itemsData, setItemsData] = useState<ItemsData>({
    0: { content: 'item 0' },
    1: { content: 'item 1' },
    2: { content: 'item 2' },
    3: { content: 'item 3' },
    4: { content: 'item 4' },
    5: { content: 'item 5' },
    6: { content: 'item 6' },
    7: { content: 'item 7' },
    8: { content: 'item 8' },
    9: { content: 'item 9' },
  });

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (destination) {
      // извлекаем перетаскиваемый элемент из источника
      // индекс столбца в котором находиться элемент
      if (source.droppableId === DROPPABLE_BOARD_ID) {
        // здесь обрабатываем перетаскивание столбцов
        const newColumnIdList: number[] = movingColumns({
          sourceColumnId: source.index,
          destinationColumnId: destination.index,
          columnIdList,
        });
        setColumnIdList(newColumnIdList);
      } else {
        // здесь обрабатываем перетаскивание элементов
        const newItemIdListData: ItemIdListsData = movingElements({
          sourceColumnId: Number.parseInt(source.droppableId),
          sourceItemIndex: source.index,
          destinationColumnId: Number.parseInt(destination.droppableId),
          destinationItemIndex: destination.index,
          itemIdListsData,
        });
        setItemIdListsData(newItemIdListData);
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
            {columnIdList.map((columnId, index) => (
              <Draggable
                key={columnId}
                draggableId={columnsData[columnId].title}
                index={index}
              >
                {(columnDraggableProvided, columnDraggableSnapshot) => {
                  return (
                    <div
                      className={styles.column}
                      ref={columnDraggableProvided.innerRef}
                      {...columnDraggableProvided.draggableProps}
                    >
                      {/* Здесь перетаскиваем таща за заголовок*/}
                      <div
                        {...columnDraggableProvided.dragHandleProps}
                        className={styles.columnTitle}
                      >
                        {columnsData[columnId].title}
                      </div>
                      <ItemList
                        columnId={columnId}
                        itemIdList={itemIdListsData[columnId]}
                        itemsData={itemsData}
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
