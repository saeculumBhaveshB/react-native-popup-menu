export interface ListItem {
  id: string;
  text: string;
}

export interface ListContainerProps {
  items: ListItem[];
  onItemPress: (
    item: ListItem,
    layout: { x: number; y: number; width: number; height: number },
  ) => void;
}

export interface ListItemProps {
  item: ListItem;
  onPress: (
    item: ListItem,
    layout: { x: number; y: number; width: number; height: number },
  ) => void;
}
