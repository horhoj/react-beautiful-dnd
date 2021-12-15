import { ItemIdListsData } from './types';

interface MovingElementsParams {
  sourceColumnId: number;
  sourceItemIndex: number;
  destinationColumnId: number;
  destinationItemIndex: number;
  itemIdListsData: ItemIdListsData;
}

export const movingElements = ({
  itemIdListsData,
  sourceItemIndex,
  sourceColumnId,
  destinationItemIndex,
  destinationColumnId,
}: MovingElementsParams): ItemIdListsData => {
  // получаем список ид элементов столбца источника
  const sourceItemIdList: number[] = [...itemIdListsData[sourceColumnId]];
  // получаем перетаскиваемый элемент
  const movedId = sourceItemIdList.splice(sourceItemIndex, 1);
  // получаем данные по спискам элементов, для столбцов, с исключенным перемещаемым элементом
  const itemIdListDataWithoutMovedItem: ItemIdListsData = {
    ...itemIdListsData,
    [sourceColumnId]: sourceItemIdList,
  };
  // получаем список ид элементов столбца назначения
  const destinationItemIdList: number[] = [
    ...itemIdListDataWithoutMovedItem[destinationColumnId],
  ];
  // вставляем элемент в столбец назначения
  destinationItemIdList.splice(destinationItemIndex, 0, ...movedId);
  // возвращаем новые данные по спискам элементов, для столбцов
  return {
    ...itemIdListDataWithoutMovedItem,
    [destinationColumnId]: destinationItemIdList,
  };
};

interface MovingColumnsParams {
  sourceColumnId: number;
  destinationColumnId: number;
  columnIdList: number[];
}

export const movingColumns = ({
  columnIdList,
  destinationColumnId,
  sourceColumnId,
}: MovingColumnsParams): number[] => {
  // получаем копию массива с ид столбцов (что бы не подвергнуть исходный массив мутации,
  // так как это противоречит требованиям к имутабельности состояния в реакте)
  const tempColumnIdList = [...columnIdList];
  // извлекаем из копии массива перемещаемый ид
  const movedId = tempColumnIdList.splice(sourceColumnId, 1);
  // добавляем перемещаемый ид на новое место
  tempColumnIdList.splice(destinationColumnId, 0, ...movedId);
  return tempColumnIdList;
};
