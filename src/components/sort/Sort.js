import React from "react";
import { useFilterContext } from "../../context/filter_context";
import { BsFillGridFill, BsList } from "react-icons/bs";
import "./sort.css";

const Sort = () => {
  /***use the context***/
  const { grid_view, setGridView, setListView, filtered_products, updateSort } =
    useFilterContext();

  // {/** add button gridview and listview,
  //        *   use the imported icon above
  //        */
  // }

  return (
    <div className="section-sort">
      <div className="btn-container">
        <button
          name="button"
          className={`${grid_view ? "active" : ""}`}
          onClick={() => setGridView()}
          type="button"
        >
          <span>
            <BsFillGridFill />
          </span>
        </button>

        <button
          className={`${!grid_view ? "active" : ""}`}
          onClick={setListView}
          type="button"
        >
          <span>
            <BsList />
          </span>
        </button>
      </div>
      <p>{filtered_products.length} Product Founds</p>
      <hr />
      <form>
        <label for="product" className="text-lg">
          Sort By
        </label>
        <select
          name="product"
          id="product"
          className="text-lg"
          onChange={updateSort}
        >
          <option value="price-lowest">Price (Lowest)</option>
          <option value="price-highest">Price (Highest)</option>
          <option value="name-a">Name (A - Z)</option>
          <option value="name-z">Name (Z - A)</option>
        </select>
        {/** add the label and dropdown select
         *   use this value :
         *   - price-lowest
         *   - price-highest
         *   - name-a
         *   - name-z
         */}
      </form>
    </div>
  );
};

export default Sort;
