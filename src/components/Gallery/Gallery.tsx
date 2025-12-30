import { useState } from "react";
import { DndContext, closestCenter,  } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import photos from "@/data/dataPhoto";
import ImageItem from "../ImageItem/ImageItem";


const Gallery = () => {
  const [gallery, setGallery] = useState(photos);
  
  const handleDelete = (id: string) => {
    if (window.confirm("¿Eliminar esta imagen?")) {
      setGallery(prev => prev.filter(img => img.id !== id));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
      const {active, over} = event;
      if (active.id !== over?.id) {
          setGallery((copy = [...gallery]) => {
            const oldIndex = copy.findIndex(item => item.id === active.id);
            const newIndex = copy.findIndex(item => item.id === over?.id);
            
            return arrayMove(copy, oldIndex, newIndex);
          });
      }
  };

  return (
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={gallery.map(photo => photo.id)}>
              <section className="container mx-auto mt-7 min-h-212.5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {gallery.map((photo, index) => (
                    <ImageItem
                      key={photo.id}
                      id={photo.id}
                      url={photo.download_url}
                      author={photo.author}
                      isFeatured={index === 0}
                      onDelete={handleDelete}
                    />
                ))}
              </section>
          </SortableContext>
      </DndContext>
  );
};

export default Gallery;