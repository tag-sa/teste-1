import React, { useState, useEffect } from "react";
import axios from "axios";
import CardList, { ProductData } from "../components/CardList";
import Input from "../components/Input";
import Pagination from "../components/Pagination";

// scss
import "../components/scss/produtos.scss";

const ProdutosPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredCardData, setFilteredCardData] = useState<ProductData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const fetchFilteredData = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const options = {
        method: "GET",
        url: "http://localhost:3001/products/",
        headers: { authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios(options);
        const filteredData = response.data.data.filter((item: ProductData) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredCardData(filteredData);
        setTotalPages(Math.ceil(filteredData.length / limit));
        setCurrentPage(1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilteredData();
  }, [inputValue, limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredCardData.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();

  return (
    <div>
      <div className="container-titulo-vaga">
        <h4>Produtos disponiveis no nosso estoque</h4>
      </div>

      <Input
        placeholder="Buscar vagas"
        value={inputValue}
        onChange={setInputValue}
        visibleOnVagasPage={true}
      />
      <CardList data={paginatedData} showApplyButton={true} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        limitOptions={[10, 20, 30, 40, 50]}
        limit={limit}
        onChangeLimit={handleLimitChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default ProdutosPage;
