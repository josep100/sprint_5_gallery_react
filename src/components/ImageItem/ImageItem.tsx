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
  isSelected,
  hasSelection,
  onDelete,
  onToggleSelect
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
    <Card 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        className={
            `${isFeatured ? "col-span-2 row-span-3" : ""} 
            ${isDragging ? "col-span-1 row-span-1" : ""}
             ${isSelected? "border-15px border-black" : ""}`} 
        onClick={() => onToggleSelect(id)}
      >
      <CardContent>
        <figure className={`cursor-grab ${isDragging ? "cursor-grabbing col-span-1 row-span-1" : ""}}`} {...listeners} >
          <img src={url} alt={author} />
        </figure>
      </CardContent>
      <CardFooter className=" cursor-pointer flex-col gap-2">
        <p className="w-full flex justify-around items-center">
          {author}
          <Trash2
            className={`transition-all duration-300 ease-in-out ${hasSelection ? "opacity-0": "cursor-pointer size-7 text-[#ff1a1a] stroke-[2.25px] opacity-100"}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id)
            }}
          />
        </p>
      </CardFooter>
    </Card>
  );
};

export default ImageItem;