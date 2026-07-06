import type { Category } from "../types"

interface CategoryInterface {
  category: Category
}

function CategoryItem({category}: CategoryInterface) {

  return (
    <div className="category item">
      <div className="content">
        <div className="header">{category.name}</div>
      </div>
    </div>
  )
}

export default CategoryItem
