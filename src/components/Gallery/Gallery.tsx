import { useState, useRef } from "react";
import photos from "@/data/dataPhoto";
import ImageItem from "../ImageItem/ImageItem";

const Gallery = () => {
    const [gallery, setGallery] = useState(photos);

    const drag = useRef<number>(0);
    const drop = useRef<number>(0);

    const handleDelete = (id: string) => {
        if (window.confirm('¿Eliminar esta imagen?')) {
            setGallery(gallery.filter(img => img.id !== id));
        }
    };

    const handleOnDragStart = (index: number) => drag.current = index;

    const handleOnDragOver = (e: React.DragEvent, index: number) => {
          e.preventDefault();
          drop.current = index;
    };

    const handleOnDrop = () => {
          const copyGallery = [...gallery];
          const temp = copyGallery[drop.current];
          copyGallery[drop.current] = copyGallery[drag.current];
          copyGallery[drag.current] = temp;
          setGallery(copyGallery);
          drag.current = 0;
          drop.current = 0;
    };

    return (
        <section className="container mx-auto mt-7 min-h-212.5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-0">
            {gallery.map((photo, index) => (
                <ImageItem 
                    index = {index}
                    id = {photo.id } 
                    url = {photo.download_url} 
                    author = {photo.author} 
                    isFeatured = {index === 0}  
                    key = {photo.id} 
                    onDelete = {handleDelete} 
                    handleOnDragStart = {handleOnDragStart} 
                    handleOnDragOver = {handleOnDragOver} 
                    handleOnDrop = {handleOnDrop}   
                /> 
            ))}
            
        </section>
    );
};

export default Gallery;