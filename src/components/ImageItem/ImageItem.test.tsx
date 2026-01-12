import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ImageItem from './ImageItem';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('ImageItem component', () => {
  it('renders correctly', () => {
    render(
      <ImageItem
        id="1"
        url="test.jpg"
        author="Test Author"
        isFeatured={false}
        isSelected={false}
        onDelete={vi.fn()}
        onToggleSelect={vi.fn()}
      />
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders image with correct src and alt attributes', () => {
    render(
      <ImageItem
        id="1"
        url="photo-test.jpg"
        author="Test Author"
        isFeatured={false}
        isSelected={false}
        onDelete={vi.fn()}
        onToggleSelect={vi.fn()}
      />
    );

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'photo-test.jpg');
    expect(image).toHaveAttribute('alt', 'Test Author');
  });

  it('applies featured styles when isFeatured is true', () => {
    render(
      <ImageItem
        id="1"
        url="test.jpg"
        author="Test Author"
        isFeatured={true}
        isSelected={false}
        onDelete={vi.fn()}
        onToggleSelect={vi.fn()}
      />
    );

    const card = screen.getByTestId('image-item-card');

    expect(card).toHaveClass('col-span-2');
    expect(card).toHaveClass('row-span-2');
  });

  it('applies selected styles when isSelected is true', () => {
    render(
      <ImageItem
        id="1"
        url="test.jpg"
        author="Test Author"
        isFeatured={false}
        isSelected={true}
        onDelete={vi.fn()}
        onToggleSelect={vi.fn()}
      />
    );

    const card = screen.getByTestId('image-item-card');

    expect(card).toHaveClass('border-3');
  });
});

describe('ImageItem component - interactivity', () => {

  it('calls onDelete when trash icon is clicked', async () => {
    // ---------- Arrange ----------
    const onDelete = vi.fn();
    const onToggleSelect = vi.fn();

    render(
      <ImageItem
        id="1"
        url="test.jpg"
        author="John Doe"
        isFeatured={false}
        isSelected={false}
        onDelete={onDelete}
        onToggleSelect={onToggleSelect}
      />
    );

    const trashButton = screen.getByRole('button', { name: /delete image/i });

    // ---------- Act ----------
    await userEvent.click(trashButton);
    
    // ---------- Assert ----------
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith('1');
  });

    it('calls onToggleSelect when card is clicked', async () => {
        const onToggleSelect = vi.fn();

        render(
            <ImageItem
            id="1"
            url="test.jpg"
            author="Author"
            isFeatured={false}
            isSelected={false}
            onDelete={vi.fn()}
            onToggleSelect={onToggleSelect}
            />
        );

        const image = screen.getByRole('img');

        // Act
        await userEvent.click(image);

        // Assert
        expect(onToggleSelect).toHaveBeenCalledTimes(1);
        expect(onToggleSelect).toHaveBeenCalledWith('1');
    });

    it('does not trigger selection when trash icon is clicked', async () => {
    // ---------- Arrange ----------
    const onDelete = vi.fn();
    const onToggleSelect = vi.fn();

    render(
      <ImageItem
        id="1"
        url="test.jpg"
        author="John Doe"
        isFeatured={false}
        isSelected={false}
        onDelete={onDelete}
        onToggleSelect={onToggleSelect}
      />
    );

    const trashButton = screen.getByRole('button', { name: /delete image/i });
    

    // ---------- Act ----------
    await userEvent.click(trashButton);
    
    // ---------- Assert ----------
    expect(onDelete).toHaveBeenCalled();
    expect(onToggleSelect).not.toHaveBeenCalled();
;
  });
});

describe('ImageItem component – edge cases', () => {
  it('does not break or trigger unexpected behavior when id is invalid', async () => {
    // ---------- Arrange ----------
    const onDelete = vi.fn();
    const onToggleSelect = vi.fn();

    render(
      <ImageItem
        id="" // invalid id edge case
        url="test.jpg"
        author="John Doe"
        isFeatured={false}
        isSelected={false}
        onDelete={onDelete}
        onToggleSelect={onToggleSelect}
      />
    );

    const image = screen.getByRole('img');

    // ---------- Act ----------
    await userEvent.click(image);

    // ---------- Assert ----------
    expect(onToggleSelect).toHaveBeenCalledTimes(1);
    expect(onToggleSelect).toHaveBeenCalledWith('');
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('handles multiple rapid clicks correctly', async () => {
        const onToggleSelect = vi.fn();

        render(
            <ImageItem
            id="1"
            url="test.jpg"
            author="Author"
            isFeatured={false}
            isSelected={false}
            onDelete={vi.fn()}
            onToggleSelect={onToggleSelect}
            />
        );

        const image = screen.getByRole('img');

        // Act
        await userEvent.click(image);
        await userEvent.click(image);
        await userEvent.click(image);

        // Assert
        expect(onToggleSelect).toHaveBeenCalledTimes(3);
    });
});