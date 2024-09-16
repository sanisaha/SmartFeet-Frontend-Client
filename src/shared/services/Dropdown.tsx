import { CategoryName, SubCategoryName } from "../../models/enums/AllEnum";

type DropdownProps = {
  category: CategoryName;
  subcategories: SubCategoryName[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navigateToAllShoes: (
    category: CategoryName,
    subcategory?: SubCategoryName
  ) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  category,
  subcategories,
  isOpen,
  setIsOpen,
  navigateToAllShoes,
}) => {
  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => navigateToAllShoes(category)}
        className="text-blue-600 hover:text-red-600"
      >
        {category.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md z-20">
          <ul className="py-2">
            <li>
              <button
                type="button"
                onClick={() => navigateToAllShoes(category)}
                className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
              >
                All {category.toLowerCase()}'s shoes
              </button>
            </li>
            {subcategories.map((subcat) => (
              <li key={subcat}>
                <button
                  type="button"
                  onClick={() => navigateToAllShoes(category, subcat)}
                  className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
                >
                  {subcat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
