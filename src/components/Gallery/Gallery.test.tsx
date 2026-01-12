import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Gallery from './Gallery';
import userEvent from '@testing-library/user-event';
import dataPhotos from '../../data/dataPhoto.ts';
import '@testing-library/jest-dom';

describe("Gallery Rendering", () => {
        it("Render the correct number of ImageItems", () => {
             render(<Gallery />);

             const images = screen.getAllByRole('img');

             expect(images).toHaveLength(dataPhotos.length);
        });

        it("Pass the inputs correctly to the children", () => {
            render(<Gallery />);

            
            const images = screen.getAllByRole('img');

            expect(images[0]).toHaveAttribute('src', dataPhotos[0].download_url);
            expect(images[0]).toHaveAttribute('alt', dataPhotos[0].author);
            
             const firstCard = images[0].closest('[class]');
             expect(firstCard).toHaveClass('cursor-grab');
             expect(firstCard).toHaveClass('cursor-grab');
        });

        it("Mark the first image as featured", () => {
                render(<Gallery />);

                const cards = screen.getAllByTestId('image-item-card');
                
                expect(cards[0]).toHaveClass("col-span-2", "row-span-2");

        });
});

describe("Gallery Removal", () => {
    it("individual works", async () => {
        // ---------- Arrange ----------
        const user = userEvent.setup();

        // Mock del confirm para que siempre devuelva true
        vi.spyOn(window, 'confirm').mockReturnValue(true);

        render(<Gallery />);

        // Cogemos la primera papelera
        const deleteButtons = screen.getAllByRole('button', {
            name: /delete image/i,
        });

        // ---------- Act ----------
        await user.click(deleteButtons[0]);

        // ---------- Assert ----------
        const imagesAfterDelete = screen.getAllByRole('img');
        
        expect(imagesAfterDelete).toHaveLength(dataPhotos.length - 1);

        // Limpieza del mock
        vi.restoreAllMocks();
    });

    it("removes multiple images when deleting them one by one", async () => {
                    
            vi.spyOn(window, 'confirm').mockReturnValue(true);

            render(<Gallery />);

            const cards = screen.getAllByTestId("image-item-card");
            await userEvent.click(cards[0]);
            await userEvent.click(cards[1]);

            const deleteButton = await screen.findByRole("button", {
                name: /delete selected images/i,
            });

            await userEvent.click(deleteButton);

            const remainingImages = screen.getAllByRole("img");
            expect(remainingImages).toHaveLength(dataPhotos.length - 2);
            vi.restoreAllMocks();
    });

    it("Request confirmation (cancel)", async() => {
            // ---------- Arrange ----------
        const user = userEvent.setup();

        // Mock del confirm para que siempre devuelva true
        const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

        render(<Gallery />);

        // Cogemos la primera papelera
        const deleteButtons = screen.getAllByRole('button', {
            name: /delete image/i,
        });

        // ---------- Act ----------
        await user.click(deleteButtons[0]);
        
        expect(confirmSpy).toHaveBeenCalled();

        // ---------- Assert ----------
        const imagesAfterDelete = screen.getAllByRole('img');
        
        expect(imagesAfterDelete).toHaveLength(dataPhotos.length);

        // Limpieza del mock
        vi.restoreAllMocks();
    });
});
