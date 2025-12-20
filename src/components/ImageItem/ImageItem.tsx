import type { ImageItemProps } from "../../types/photo";


const ImageItem = ({url, author, isHighlighted}: ImageItemProps) => {
        
    return (
        <li>
            <figure>
                <img src={url} alt={author} />
            </figure>
        </li>
    );

}

export default ImageItem;