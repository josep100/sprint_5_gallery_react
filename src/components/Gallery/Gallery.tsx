import { useState } from "react";
import photos from "@/data/dataPhoto";
import ImageItem from "../ImageItem/ImageItem";

const Gallery = () => {
    const [gallery, setGallery] = useState(photos);

    const handleDelete = (id: string) => {
        if (window.confirm('¿Eliminar esta imagen?')) {
            setGallery(gallery.filter(img => img.id !== id));
        }
    };

    return (
        <section className="container mx-auto mt-7 min-h-212.5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-0">
            {gallery.map((photo, indice) => (
                <ImageItem url = {photo.download_url} author = {photo.author} isFeatured = {indice === 0}  key = {photo.id} onDelete = {handleDelete} id = {photo.id } /> 
            ))}
            
        </section>
    );
};

export default Gallery;