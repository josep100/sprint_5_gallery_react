import photos from "../../data/dataPhoto";
import ImageItem from "../ImageItem/ImageItem";

const Gallery = () => {
    
    return (
        <>
        
        <section className="container mx-auto mt-7 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-0">
            
            
                {photos.map((photo, indice) => (
                    <ImageItem url = {photo.download_url} author = {photo.author} isHighlighted = {indice === 0}  key= {photo.id} /> 
                ))}
            
        </section>
        </>
    );
};

export default Gallery;