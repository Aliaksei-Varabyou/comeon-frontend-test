import type { Category } from "../types"

interface CategoryInterface {
  category: Category,
  active: boolean,
  onClick: () => void
}

function CategoryItem({ category, active, onClick }: CategoryInterface) {
  return (
    <div
      className={`item ${active ? 'active' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="content">
        <div className="header">{category.name}</div>
      </div>
    </div>
  );
}

export default CategoryItem
