import photos from "../../data/dataPhoto";
import ImageItem from "../ImageItem/ImageItem";

const Gallery = () => {
    
    return (
        <section>
            <h2>Galería</h2>
            <ul>
                {photos.map((photo, indice) => (
                    <ImageItem url = {photo.download_url} author = {photo.author} isHighlighted = {indice === 0}  key= {photo.id} /> 
                ))}
            </ul>
        </section>
    );
};

export default Gallery;