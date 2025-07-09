export interface ListItem {
  id: number;
  text: string;
}

export interface ListItemProps {
  item: ListItem;
  onPress: (item: ListItem, layout: { x: number; y: number }) => void;
}

export interface ListContainerProps {
  onItemPress: (item: ListItem, layout: { x: number; y: number }) => void;
}
