import { useState } from "react";
import { DndContext, closestCenter,  } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Trash2 } from "lucide-react";
import photos from "@/data/dataPhoto";
import ImageItem from "../ImageItem/ImageItem";


const Gallery = () => {
  const [gallery, setGallery] = useState(photos);
  const [selectedIds, setselectedIds] = useState<Set<string>>(new Set());
  
  const handleDelete = (id: string) => {
    if (window.confirm("¿Eliminar esta imagen?")) {
      setGallery(prev => prev.filter(img => img.id !== id));
    }
  };

  const onToggleSelect = (id: string) => {
      setselectedIds(prev => {
        const next = new Set(prev);

        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }

        return next;
      });
  };

  const handleDeleteSelected = () => {
      if (
        window.confirm(
          `¿Eliminar ${selectedIds.size} imágenes seleccionadas?`
        )
      ) {
        setGallery(prev =>
          prev.filter(img => !selectedIds.has(img.id))
        );
        setselectedIds(new Set());
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
  const hasSelection = selectedIds.size > 0;

  return (
      <>
          <header
              className={`
                fixed top-0 left-0 right-0
                flex
                justify-end
                items-center
                gap-4
                p-3
                bg-black/30
                overflow-hidden
                text-white
                z-0
                transition-all duration-300 ease-in-out
                ${hasSelection
                  ? "max-h-20 opacity-100 pointer-coarse:"
                  : "max-h-0 opacity-0"}
              `}
          >
              <p>Seleccionados {selectedIds.size}</p>
              <Trash2 onClick={() => handleDeleteSelected()} className="rounded-full bg-black text-white p-1.5 size-9 cursor-pointer" />
          </header>
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
                          isSelected={selectedIds.has(photo.id)}
                          hasSelection={hasSelection}
                          onDelete={handleDelete}
                          onToggleSelect={onToggleSelect}
                        />
                    ))}
                  </section>
              </SortableContext>
          </DndContext>
      </>
  );
};

export default Gallery;