import type { ImageItemProps } from "../../types/photo";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

const ImageItem = ({url, author, isHighlighted}: ImageItemProps) => {
        
    return (
        
            <Card className={isHighlighted ? "col-span-2 row-span-3" : ""}>
                <CardContent>
                        <figure>
                            <img src={url} alt={author} />
                        </figure> 
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    {author}
                </CardFooter>
            </Card>
       
    );

}

export default ImageItem;
