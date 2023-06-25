import React from "react";
import "../components/scss/card.scss";

export interface UserData {
  id: number;
  name: string;
  email: string;
  products: ProductData[];
}

export interface ProductData {
  id: number;
  name: string;
  status: string;
  created: Date;
  created_by: number;
  categories_id: number;
  categories: CategoryData;
  users: UserData;
  image?: string;
}

export interface CategoryData {
  id: number;
  name: string;
  products: ProductData[];
}

interface ProductListProps {
  data: ProductData[];
  showApplyButton: boolean;
  onApply?: (productId: number) => void;
}

const CardList: React.FC<ProductListProps> = ({
  data,
  showApplyButton,
  onApply,
}) => {
  return (
    <div className="card-list">
      {data.map((item) => {
        const {
          id,
          name,
          status,
          created,
          categories_id,
          created_by,
          categories,
          users,
          image,
        } = item;

        return (
          <div className="card" key={id}>
            <div>{image && <img src={image} alt="Imagem do produto" />} </div>
            <h3>{name}</h3>
            <p>
              <span className="span-card-list">Status:</span> {status}
            </p>
            <p>
              <span className="span-card-list">Falar com o Vendedor(a):</span>{" "}
              {users.name}
            </p>
            <p>
              <span className="span-card-list">Categoria:</span>{" "}
              {categories.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
