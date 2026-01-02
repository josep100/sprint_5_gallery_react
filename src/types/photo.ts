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
  url: string;
  author: string;
  isFeatured?: boolean;
  isSelected?: boolean;
  hasSelection?: boolean;
  onDelete: (id: string) => void;
  onToggleSelect: (id: string) => void;
};

