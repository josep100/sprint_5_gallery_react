import type { ImageItemProps } from "@/types/photo";
import { Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

const ImageItem = ({index, id, url, author, isFeatured, onDelete, handleOnDragStart, handleOnDragOver, handleOnDrop }: ImageItemProps) => { 
        
    return (
            <Card 
                draggable 
                onDragStart = {() => handleOnDragStart(index)} 
                onDragOver = {e => handleOnDragOver(e, index)} 
                onDrop = {() => handleOnDrop()} 
                className={isFeatured ? "col-span-2 row-span-3" : ""}
            >
                <CardContent>
                        <figure>
                            <img src={url} alt={author} />
                        </figure> 
                </CardContent>
                <CardFooter className="flex-col gap-2">
                   <p className="w-full flex justify-around items-center">
                        {author}
                         <Trash2 className="cursor-pointer size-7 text-[#ff1a1a] stroke-[2.25px]" onClick = {() => {
                             onDelete(id);
                         }} /> 
                    </p>
                </CardFooter>
            </Card>
    );

}

export default ImageItem;
