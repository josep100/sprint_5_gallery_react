export interface Photo {
        id: string,
        author: string,
        width: number,
        height: number,
        url: string,
        download_url: string
}

export interface ImageItemProps {
  id: string;
  index: number;
  url: string;
  author: string;
  isFeatured?: boolean;
  onDelete: (id: string) => void;
  handleOnDragStart: (index: number) => void;
  handleOnDragOver: (e: React.DragEvent, index: number) => void;
  handleOnDrop: () => void;
};

