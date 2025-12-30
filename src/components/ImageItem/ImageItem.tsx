import type { ImageItemProps } from "@/types/photo";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ImageItem = ({
  id,
  url,
  author,
  isFeatured,
  onDelete
}: ImageItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id});

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} className={`${isFeatured ? "col-span-2 row-span-3" : ""} ${isDragging ? "cursor-grabbing col-span-1 row-span-1" : "cursor-grab"}`}>
      <CardContent>
        <figure {...listeners} >
          <img src={url} alt={author} />
        </figure>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="w-full flex justify-around items-center">
          {author}
          <Trash2
            className="cursor-pointer size-7 text-[#ff1a1a] stroke-[2.25px]"
            onClick={() => onDelete(id)}
          />
        </p>
      </CardFooter>
    </Card>
  );
};

export default ImageItem;